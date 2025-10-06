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

interface MPContact {
  id: string;
  name: string;
  party: string;
  constituency: string;
  province: string;
  startDate?: string;
}

const defaultLetterTemplate = `Dear [Representative Name],

I am writing as a constituent to advocate for stronger support for unpaid caregivers in our community.

[Add your personal experience or story here.]

Caregivers provide essential care that keeps families together, yet too often do so without financial support, respite services, or mental-health resources.

Thank you for your leadership and attention to this important issue.

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

  const successMessages = [
    "Your draft can help spotlight the needs of caregivers across the country.",
    "Thank you for being a voice for caregivers in your community.",
    "Personalized advocacy letters influence policy changes for caregivers.",
    "Together, our voices are creating positive change for caregivers.",
  ];

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

  const handleOpenExternalLink = () => {
    window.open("https://www.ourcommons.ca/members/en", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section with Search Form */}
        <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 py-20 px-4 sm:px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-purple-900">
              Find Your MP
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
              Easily connect with your local Member of Parliament to advocate for caregiver support and make a difference in your community.
            </p>

            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSearchRepresentatives} className="flex gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-purple-500 transition-all mb-4" noValidate>
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
                  placeholder="e.g., Toronto Centre, Calgary Skyview"
                  className="flex-1 px-4 py-3 border-none bg-transparent focus:outline-none"
                  required
                />
                <Button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  disabled={isSearching}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </form>
              {searchError ? (
                <Alert variant="destructive" className="mb-4 text-left">
                  <AlertTitle>There was a problem with your search</AlertTitle>
                  <AlertDescription>{searchError}</AlertDescription>
                </Alert>
              ) : null}
              <p className="text-gray-600 text-sm">
                Prefer to search by your postal code?{" "}
                <a
                  href="https://www.ourcommons.ca/members/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 font-semibold underline transition-colors"
                >
                  Click here
                </a>
              </p>
            </div>
          </div>
        </section>

        <RunningBanner
          items={successMessages}
          className="bg-purple-50 text-purple-900 py-3"
          speed={5}
        />

        {/* This section is now always rendered */}
        <section className="py-16 px-4 sm:px-8">
          <div className="max-w-screen-xl mx-auto">
            {searchPerformed ? (
              isSearching ? (
                // Skeleton loading state
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <h2 className="text-3xl font-bold mb-8 text-purple-900 text-center col-span-full">Searching...</h2>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-6 bg-white rounded-xl shadow-lg">
                      <div className="h-6 w-3/4 mb-2 bg-purple-100 animate-pulse rounded" />
                      <div className="h-4 w-1/2 mb-1 bg-purple-100 animate-pulse rounded" />
                      <div className="h-4 w-full mb-1 bg-purple-100 animate-pulse rounded" />
                      <div className="h-4 w-3/4 mb-4 bg-purple-100 animate-pulse rounded" />
                      <div className="h-10 w-full mb-2 bg-purple-100 animate-pulse rounded" />
                      <div className="h-10 w-full bg-purple-100 animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              ) : mpList.length > 0 ? (
                // MP cards grid
                <>
                  <h2 className="text-3xl font-bold mb-8 text-purple-900 text-center">Your Representatives</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mpList.map((mp) => (
                      <div key={mp.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="border-b border-gray-100 pb-4 px-6 pt-6">
                          <h3 className="text-xl font-semibold text-purple-900">{mp.name}</h3>
                          <p className="text-sm text-gray-500">{mp.party}</p>
                        </div>
                        <div className="px-6 py-6 space-y-2">
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-900">Constituency:</span> {mp.constituency}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-900">Province:</span> {mp.province}
                          </p>
                          {mp.startDate ? (
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Serving since:</span> {mp.startDate}
                            </p>
                          ) : null}
                          <div className="flex flex-col gap-2 pt-4">
                            <Button
                              type="button"
                              variant={selectedMpId === mp.id ? "default" : "outline"}
                              className={selectedMpId === mp.id ? "bg-purple-600 text-white" : ""}
                              onClick={() => {
                                setSelectedMpId(mp.id);
                                clearLetterError();
                              }}
                            >
                              {selectedMpId === mp.id ? "Selected" : "Use this contact"}
                            </Button>
                            <Button type="button" variant="secondary" onClick={handleOpenExternalLink}>
                              View profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <h2 className="text-2xl font-semibold text-purple-900 mb-4">No representatives yet</h2>
                  <p className="text-gray-600">
                    Search by your city or constituency to load representatives and start drafting your letter.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-purple-900 mb-4">Search to get started</h2>
                <p className="text-gray-600">
                  Enter your city or constituency above to load representatives and build your personalized advocacy letter.
                </p>
              </div>
            )}

            <section className="mt-16 grid lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-xl shadow-lg p-8">
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

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button type="submit" className="bg-purple-600 text-white">
                      Generate letter
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCopyDraft}>
                      Copy draft
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleResetDraft}>
                      Reset template
                    </Button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
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
                  You can edit this draft directly. When you&apos;re ready, copy the text above and send it using your preferred communication channel.
                </p>
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
