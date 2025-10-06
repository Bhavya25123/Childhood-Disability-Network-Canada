import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Support/RunningBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

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

  const handleSearchRepresentatives = async (event: FormEvent) => {
    event.preventDefault();

    if (!city.trim()) {
      toast({
        title: "Enter a city or constituency",
        description: "Please provide the area you live in so we can look up your representative.",
      });
      return;
    }

    setIsSearching(true);
    setSearchPerformed(true);

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
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Unable to load representatives right now. Please try again soon.",
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

    if (!representative) {
      toast({
        title: "Select a representative",
        description: "Choose who you would like to address before generating your draft letter.",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Add your name",
        description: "Including your name helps personalize the letter.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Add an email address",
        description: "Sharing your contact information helps the representative respond to you.",
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
      [city.trim(), postalCode.trim()].filter(Boolean).join(", "),
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
  const handleCopyLetter = async () => {
    if (!letterContent.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Generate or edit your letter before copying it to the clipboard.",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(letterContent);
      toast({
        title: "Draft copied",
        description: "Your advocacy letter draft is ready to paste into an email or document.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "We couldn't copy the letter automatically. Please select the text and copy it manually.",
        variant: "destructive",
      });
    }
  };

  /**
   * Restores the original template text so the user can start over without
   * refreshing the page or manually deleting their draft.
   */
  const handleResetTemplate = () => {
    setLetterContent(defaultLetterTemplate);
    toast({
      title: "Template restored",
      description: "The original template has been reloaded. You can customize it again at any time.",
    });
  };

  return (
    <>
      <Header />

      <main className="pt-16">
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">
              Create Your Advocacy Letter
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Draft a personalized letter to your representative advocating for better support and recognition for caregivers.
            </p>
            <RunningBanner
              items={successMessages}
              className="bg-purple/20 text-purple-900 rounded-lg py-2 mt-8"
              speed={15}
            />
            </div>
          </section>

        <section className="py-16 px-8 bg-white">
          <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-900">Why Your Letter Matters</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-chart-bar text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.6 Million Caregivers</h3>
                    <p className="text-gray-600">
                      There are over 2.6 million people providing unpaid care to a family member or friend in the country.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-clock text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">26+ Hours Weekly</h3>
                    <p className="text-gray-600">
                      The average caregiver provides more than 26 hours of care per week, equivalent to a part-time job.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-wallet text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Financial Impact</h3>
                    <p className="text-gray-600">
                      Caregivers spend an average of $7,000 per year on out-of-pocket care-related expenses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-heart text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Health Concerns</h3>
                    <p className="text-gray-600">
                      60% of caregivers report declining physical and mental health due to caregiving responsibilities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-purple/5 rounded-lg border border-purple/10">
                <h3 className="text-xl font-semibold mb-4 text-purple-900">Current Policy Issues</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Paid family leave for caregivers</li>
                  <li>Tax credits for caregiving expenses</li>
                  <li>Expanded respite care programs</li>
                  <li>Healthcare subsidies for caregivers</li>
                  <li>Workplace flexibility requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple/5 p-8 rounded-lg shadow-sm border border-purple/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-900">Build Your Letter</h2>
              <p className="text-gray-600 mb-6">
                Look up your representative, customize the template, and copy your draft to send through email or print.
              </p>

              <div className="space-y-5">
                <div className="space-y-3 rounded-md border border-purple/10 bg-white/80 p-4">
                  <h3 className="text-lg font-semibold text-purple-900">Find Your Representative</h3>
                  <form onSubmit={handleSearchRepresentatives} className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="Enter your city or constituency"
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSearching} className="bg-purple text-white hover:bg-purple-dark">
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </form>
                  {searchPerformed && mpList.length === 0 && !isSearching ? (
                    <p className="text-sm text-gray-600">
                      No representatives were found for that area. Try a different spelling or nearby city.
                    </p>
                  ) : null}
                  {mpList.length > 0 ? (
                    <div className="space-y-2">
                      <label htmlFor="representative" className="block text-sm font-medium text-gray-700">
                        Select a representative
                      </label>
                      <select
                        id="representative"
                        value={selectedMpId}
                        onChange={(event) => setSelectedMpId(event.target.value)}
                        className="w-full rounded-md border border-purple/20 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        required
                      >
                        <option value="" disabled>
                          Choose a representative
                        </option>
                        {mpList.map((mp) => (
                          <option key={mp.id} value={mp.id}>
                            {mp.name} — {mp.constituency} ({mp.party})
                          </option>
                        ))}
                      </select>
                      {selectedRepresentative ? (
                        <div className="rounded-md border border-purple/10 bg-purple/10 p-3 text-sm text-purple-900">
                          Drafting for <span className="font-semibold">{selectedRepresentative.name}</span> • {selectedRepresentative.constituency}
                          {selectedRepresentative.province ? `, ${selectedRepresentative.province}` : ""}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <form onSubmit={handleGenerateLetter} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="e.g., Alex Morgan"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code (optional)
                    </label>
                    <Input
                      type="text"
                      id="postalCode"
                      value={postalCode}
                      onChange={(event) => setPostalCode(event.target.value)}
                      placeholder="e.g., M5H 2N2"
                    />
                  </div>
                  <div>
                    <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-1">
                      Personal message (optional)
                    </label>
                    <Textarea
                      id="customMessage"
                      value={customMessage}
                      onChange={(event) => setCustomMessage(event.target.value)}
                      placeholder="Share your caregiving story, local challenges, or specific requests."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="letterContent" className="block text-sm font-medium text-gray-700">
                    Letter draft (editable)
                  </label>
                  <Textarea
                    id="letterContent"
                    value={letterContent}
                    onChange={(event) => setLetterContent(event.target.value)}
                    rows={12}
                    className="bg-white"
                  />
                  <p className="text-xs text-gray-500">
                    Edit the draft as needed. When you're ready, copy it into an email, print it, or paste it into your preferred messaging tool.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" className="flex-1 bg-purple text-white hover:bg-purple-dark">
                    Generate letter from template
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 border-purple text-purple-900 hover:bg-purple/10" onClick={handleCopyLetter}>
                    Copy draft
                  </Button>
                  <Button type="button" variant="ghost" className="flex-1 text-purple-900 hover:bg-purple/10" onClick={handleResetTemplate}>
                    Reset template
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  We don't send letters on your behalf. Use the draft above to reach your representative through email, social media, or mail.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
};

export default SendLetter;
