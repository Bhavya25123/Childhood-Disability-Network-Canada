import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Support/RunningBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage, logError } from "@/utils/error";
import { validateCityOrConstituency, validateEmail, validatePostalCode } from "@/utils/validation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Copy, RotateCw, Send  } from "lucide-react";


interface MPContact {
  id: string;
  name: string;
  party: string;
  constituency: string;
  province: string;
  startDate?: string;
  email?: string;
}

const defaultLetterTemplate = `Dear [MP Name],

I am a parent and lifetime caregiver for my [child/adult child/family member] with a disability.

[Add your personal experience or story here.]

Like thousands of families across Canada, we provide essential care around the clock—care that allows our loved ones to live safely at home and participate in their communities. Yet, despite saving governments billions, we receive little financial or structural support. Families like ours are living in disability poverty. Many are forced to give up paid work, live on one income, and spend thousands monthly on medical and accessibility costs.

We urgently need a federal Lifetime Caregiver Benefit, accessible housing fund, and tripled Child Disability Benefit so families are not punished for caring.

Will you stand with families like mine and make lifetime caregiving a national priority?

Sincerely,
[Your Name]
[City, Postal Code]
[Email]`;

const SendLetter = () => {
  const [city, setCity] = useState("");
  const [mpList, setMpList] = useState<MPContact[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedMpId, setSelectedMpId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [letterContent, setLetterContent] = useState(defaultLetterTemplate);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [letterError, setLetterError] = useState<string | null>(null);
  const [letterFieldErrors, setLetterFieldErrors] = useState({
    name: "",
    email: "",
    postalCode: "",
  });

  const clearSearchError = () => {
    if (searchError) {
      setSearchError(null);
    }
  };

  const clearLetterError = () => {
    if (letterError) {
      setLetterError(null);
    }
  };

  const selectedRepresentative = useMemo(
    () => mpList.find((mp) => mp.id === selectedMpId),
    [mpList, selectedMpId]
  );

  const validateLetterFields = () => {
    const nextErrors = {
      name: name.trim() ? "" : "Your name is required.",
      email: validateEmail(email, "Email address"),
      postalCode: validatePostalCode(postalCode, "Postal code"),
    };

    setLetterFieldErrors(nextErrors);

    return Object.values(nextErrors).every((message) => message === "");
  };

  const handleSearchRepresentatives = async (event: FormEvent) => {
    event.preventDefault();

    const cityValidationMessage = validateCityOrConstituency(city);
    if (cityValidationMessage) {
      setSearchError(cityValidationMessage);
      toast({
        title: "Update your search",
        description: cityValidationMessage,
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchPerformed(true);
    setSearchError(null);

    try {
      const res = await api.get<MPContact[]>("/mps", { params: { constituency: city } });
      if (res.data.length === 0) {
        toast({
          title: "No representatives found",
          description: "We couldn't find matches for that city or constituency. Try a nearby area or verify the spelling.",
          className: "bg-purple-600 text-white border border-purple-700"
        });
      }
      setMpList(res.data);
      setSelectedMpId(res.data[0]?.id ?? "");
      clearLetterError();
    } catch (error) {
      const message = getErrorMessage(error, "Unable to load representatives right now. Please try again soon.");
      logError("SendLetter:search", error);
      setSearchError(message);
      toast({
        title: "Search failed",
        description: message,
        variant: "destructive",
      });
      setMpList([]);
      setSelectedMpId("");
    } finally {
      setIsSearching(false);
      setLetterContent(defaultLetterTemplate);
    }
  };

  /**
   * Builds a tailored letter draft using the template pieces and the
   * representative/constituent details entered in the form. The result is
   * written directly into the editable textarea so the user can continue to
   * tweak their copy before sharing it elsewhere.
   */
  const handleGenerateLetter = (event: FormEvent) => {
    event.preventDefault();

    const representative = selectedRepresentative;

    setLetterError(null);

    if (!representative) {
      const message = "Select who you would like to address before generating your draft letter.";
      setLetterError(message);
      toast({
        title: "Select a representative",
        description: message,
        variant: "destructive",
      });
      return;
    }

    if (!validateLetterFields()) {
      toast({
        title: "Complete your details",
        description: "We need your name, a valid email, and postal code to personalize the letter.",
        variant: "destructive",
      });
      return;
    }

    const introduction = `I am writing as a resident of ${
      representative.constituency || city
    } in ${representative.province} to advocate for improved supports for unpaid caregivers.`;

    const caregiverImpact =
      "Caregivers dedicate countless hours to supporting loved ones, often while juggling work, family, and financial pressures without adequate respite or mental-health support.";

    const customSection = customMessage.trim() ? `${customMessage.trim()}\n\n` : "";

    const policyAsk = `I respectfully ask that you champion policies that expand respite care, provide direct financial relief, and invest in mental-health resources for caregivers in ${
      representative.constituency || city
    }.`;

    const signature = [
      name.trim(),
      [city.trim(), postalCode.trim().toUpperCase()].filter(Boolean).join(", "),
      email.trim() ? `Email: ${email.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const letter = `Dear ${representative.name},\n\n${introduction}\n\n${caregiverImpact}\n\n${customSection}${policyAsk}\n\nThank you for your leadership and commitment to our community.\n\n${signature}`;

    setLetterContent(letter);

    toast({
      title: "Letter draft ready",
      description: "Review the draft below. Feel free to edit it before sending through your preferred channel.",
    });
  };

  /**
   * Copies the current draft (template-generated or hand-edited) to the
   * clipboard. Users can then paste the message into email, print dialogs, or
   * any other channel they prefer to send through.
   */
  const handleCopyDraft = async () => {
    clearLetterError();

    try {
      await navigator.clipboard.writeText(letterContent);
      toast({
        title: "Draft copied",
        description: "Paste the letter into your preferred sending method.",
      });
    } catch (error) {
      logError("SendLetter:copy", error);
      toast({
        title: "Copy unavailable",
        description: "We couldn't access your clipboard. Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  /**
   * Restores the editable textarea back to the default template so the user
   * can start fresh while keeping any search results they've already loaded.
   */
  const handleResetDraft = () => {
    clearLetterError();
    setLetterContent(defaultLetterTemplate);
    toast({
      title: "Template restored",
      description: "We've reset the draft to the default template.",
    });
  };

  const handleOpenMail = () => {
    const representative = selectedRepresentative;
  const mailto = representative?.email
    ? `mailto:${representative.email}?subject=Advocacy Letter&body=${encodeURIComponent(letterContent)}`
    : `mailto:?subject=Advocacy Letter&body=${encodeURIComponent(letterContent)}`;
  window.location.href = mailto;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pt-16">
        {/* Page Header */}
        <section className="bg-purple-100 border-b border-gray-200 py-8 px-4 sm:px-8">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">
              Send a letter to your MP
            </h1>
            <p className="text-gray-600 mb-6">
              Send a letter to your member of Parliament to advocate for better support and recognition for caregivers.
            </p>
            
            {/* Compact MP Search */}
            <div className="bg-gray-50 rounded-lg p-4 max-w-2xl ">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Find Your MP</h2>
              <form onSubmit={handleSearchRepresentatives} className="flex gap-2 mb-3" noValidate>
                <Input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    clearSearchError();
                  }}
                  onBlur={(e) => {
                    const validation = validateCityOrConstituency(e.target.value);
                    if (validation) {
                      setSearchError(validation);
                    }
                  }}
                  placeholder="Enter city or constituency (e.g., Toronto Centre)"
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  disabled={isSearching}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </form>
              
              {searchError ? (
                <Alert variant="destructive" className="mb-3">
                  <AlertDescription>{searchError}</AlertDescription>
                </Alert>
              ) : null}
              
              <p className="text-sm text-gray-500 mx-1">
                Or search by postal code at{" "}
                <a
                  href="https://www.ourcommons.ca/members/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  ourcommons.ca
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* MP Results & Letter Section */}
        <section className="py-8 px-4 sm:px-8">
          <div className="max-w-screen-xl mx-auto">
            
            {/* MP Results - Compact Display */}
            {searchPerformed && (
              <div className="mb-8">
                {isSearching ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 bg-purple-200 animate-pulse rounded"></div>
                      <span className="text-gray-600">Searching for representatives...</span>
                    </div>
                  </div>
                ) : mpList.length > 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="border-b border-gray-200 px-4 py-3">
                      <h3 className="text-lg font-semibold text-gray-900">Select Your Representative</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {mpList.map((mp) => (
                        <div 
                          key={mp.id} 
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedMpId === mp.id 
                              ? 'border-purple-300 bg-purple-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedMpId(mp.id);
                            clearLetterError();
                          }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{mp.name}</h4>
                              <span className="text-sm text-gray-500">({mp.party})</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {mp.constituency}, {mp.province}
                            </p>
                            {mp.email ? (
                              <p className="text-sm text-purple-700 mt-1">
                                <span className="font-medium text-gray-900">Email:</span>{" "}
                                <a
                                  href={`mailto:${mp.email}`}
                                  className="text-purple-700 underline hover:text-purple-900"
                                >
                                  {mp.email}
                                </a>
                              </p>
                            ) : (
                              <p className="text-sm text-gray-500 mt-1">No email available</p>
                            )}
                          </div>
                          <div className="ml-4">
                            {selectedMpId === mp.id ? (
                              <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      No representatives found for that search. Try a nearby city or verify the spelling.
                    </p>
                  </div>
                )}
              </div>
            )}

            <section className="grid lg:grid-cols-2 gap-5 items-start">
              <div className="bg-white rounded-xl shadow-lg p-7">
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Craft your letter</h2>
                <form className="space-y-4" onSubmit={handleGenerateLetter} noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearLetterError();
                        setLetterFieldErrors((prev) => ({
                          ...prev,
                          name: prev.name ? (e.target.value.trim() ? "" : "Your name is required.") : "",
                        }));
                      }}
                      onBlur={(e) =>
                        setLetterFieldErrors((prev) => ({
                          ...prev,
                          name: e.target.value.trim() ? "" : "Your name is required.",
                        }))
                      }
                      required
                    />
                    {letterFieldErrors.name ? (
                      <p className="mt-1 text-sm text-red-600">{letterFieldErrors.name}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearLetterError();
                        setLetterFieldErrors((prev) => ({
                          ...prev,
                          email: prev.email ? validateEmail(e.target.value, "Email address") : "",
                        }));
                      }}
                      onBlur={(e) =>
                        setLetterFieldErrors((prev) => ({
                          ...prev,
                          email: validateEmail(e.target.value, "Email address"),
                        }))
                      }
                      required
                    />
                    {letterFieldErrors.email ? (
                      <p className="mt-1 text-sm text-red-600">{letterFieldErrors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setPostalCode(value);
                        clearLetterError();
                        setLetterFieldErrors((prev) => ({
                          ...prev,
                          postalCode: prev.postalCode ? validatePostalCode(value, "Postal code") : "",
                        }));
                      }}
                      onBlur={(e) =>
                        setLetterFieldErrors((prev) => ({
                          ...prev,
                          postalCode: validatePostalCode(e.target.value.toUpperCase(), "Postal code"),
                        }))
                      }
                      required
                      inputMode="text"
                      autoCapitalize="characters"
                    />
                    {letterFieldErrors.postalCode ? (
                      <p className="mt-1 text-sm text-red-600">{letterFieldErrors.postalCode}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-1">
                      Personal Story or Additional Context (optional)
                    </label>
                    <Textarea
                      id="customMessage"
                      value={customMessage}
                      onChange={(e) => {
                        setCustomMessage(e.target.value);
                        clearLetterError();
                      }}
                      placeholder="Share a short story or statistic that highlights why caregiver support matters to you."
                      className="min-h-[120px]"
                    />
                  </div>

                  {letterError ? (
                    <Alert variant="destructive">
                      <AlertTitle>We need a bit more info</AlertTitle>
                      <AlertDescription>{letterError}</AlertDescription>
                    </Alert>
                  ) : null}

                  <div className="flex-wrap gap-4 pt-2">
                    <Button type="submit" className="bg-purple-600 text-white">
                      <Mail /> Generate letter
                    </Button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-7">
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Editable letter draft</h2>
                <Textarea
                  value={letterContent}
                  onChange={(e) => {
                    setLetterContent(e.target.value);
                    clearLetterError();
                  }}
                  className="min-h-[400px]"
                />
                <p className="text-sm text-gray-500 mt-3">
                  When you are ready, copy the text and send it through your preferred communication channel. We do not send correspondence on your behalf and assume no responsibility for the content or delivery of messages composed here.
                </p>
                {/* Action buttons moved here */}
                <div className="flex flex-wrap justify-center gap-4 pt-3">
                  <Button type="button" variant="ghost" onClick={handleCopyDraft} className="hover:text-purple-700">
                    <Copy /> Copy draft
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleResetDraft} className="hover:text-purple-700">
                    <RotateCw /> Reset template
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          className="border hover:text-purple-700"
                          onClick={handleOpenMail}
                        >
                          <Send /> Send Email
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send email</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SendLetter;
