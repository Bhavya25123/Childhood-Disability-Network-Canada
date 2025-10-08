import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Home/RunningBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage, logError } from "@/utils/error";
import { validateCityOrConstituency } from "@/utils/validation";
import { Copy, User } from "lucide-react";

const FindMP = () => {
  const [city, setCity] = useState("");
  const [mpList, setMpList] = useState<MPContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface MPContact {
    id: string;
    name: string;
    party: string;
    constituency: string;
    province: string;
    startDate?: string;
    email?: string;
    sourceUrl?: string;
  }

  const handleCityChange = (value: string) => {
    setCity(value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationMessage = validateCityOrConstituency(city);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsLoading(true);
    setSearchPerformed(true);
    setMpList([]);
    setErrorMessage(null);

    try {
      const res = await api.get("/mps", { params: { constituency: city } });
      if (res.data.length === 0) {
        toast({
          title: "No Representatives Found",
          description: "Please check your input and try again.",
        });
      }
      setMpList(res.data);
    } catch (err) {
      const message = getErrorMessage(err, "Unable to load MP contacts. Please try again later.");
      logError("FindMP", err);
      setErrorMessage(message);
      toast({
        title: "Search Failed",
        description: message,
        variant: "destructive",
      });
      setMpList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const successStories = [
    "MP Sarah Johnson helped secure $2M for local caregiver support programs",
    "New respite care initiative launched after community advocacy",
    "Healthcare subsidies expanded for family caregivers",
    "Local MP champions caregiver recognition bill",
    "Government increases funding for caregiver mental health services",
    "New legislation passed to protect caregiver employment rights",
    "Community-led initiative receives government grant for respite care",
    "MP promotes national awareness campaign for caregiver burnout",
  ];

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
              <form
                onSubmit={handleSearch}
                className="flex gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200 transition-all mb-4"
                noValidate
              >
                <Input
                  type="text"
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  onBlur={(e) => {
                    const validation = validateCityOrConstituency(e.target.value);
                    if (validation) {
                      setErrorMessage(validation);
                    }
                  }}
                  placeholder="e.g., Toronto Centre, Calgary Skyview"
                  className="flex-1 px-4 py-3 border-none bg-transparent focus:outline-none"
                  required
                />
                <Button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </form>
              {errorMessage ? (
                <Alert variant="destructive" className="mb-4 bg-white border-purple-400 text-left">
                  <AlertTitle>There was a problem with your search</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
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
          items={successStories}
          className="bg-purple-50 text-purple-900 py-3"
          speed={5}
        />

        {/* This section is now always rendered */}
        <section className="py-16 px-4 sm:px-8">
          <div className="max-w-screen-xl mx-auto">
            {searchPerformed ? (
              isLoading ? (
                // Skeleton loading state
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <h2 className="text-3xl font-bold mb-8 text-purple-900 text-center col-span-full">Searching...</h2>
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-6">
                      <div className="h-6 w-3/4 mb-2 bg-purple-100 animate-pulse rounded" />
                      <div className="h-4 w-1/2 mb-1 bg-purple-100 animate-pulse rounded" />
                      <div className="h-4 w-full mb-1 bg-purple-100 animate-pulse rounded" />
                      <div className="h-4 w-3/4 mb-4 bg-purple-100 animate-pulse rounded" />
                      <div className="h-10 w-full mb-2 bg-purple-100 animate-pulse rounded" />
                      <div className="h-10 w-full bg-purple-100 animate-pulse rounded" />
                    </Card>
                  ))}
                </div>
              ) : mpList.length > 0 ? (
                // MP cards grid
                <>
                  <h2 className="text-3xl font-bold mb-8 text-purple-900 text-center">Your Representatives</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mpList.map((mp, index) => (
                      <Card key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <CardHeader className="border-b border-gray-100 pb-4">
                          <CardTitle className="text-xl font-semibold text-purple-900">{mp.name}</CardTitle>
                          <CardDescription className="text-sm text-gray-500">
                            {mp.party}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-2">
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-900">Constituency:</span> {mp.constituency}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-900">Province:</span> {mp.province}
                          </p>
                          <p className="text-sm text-gray-500">
                              <span className="font-medium">Email:</span> {mp.email}
                            </p>
                          {mp.startDate && (
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Serving since:</span> {mp.startDate.split(" ")[0]}
                            </p>
                            
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
                            <Button
                              type="button"
                              className="bg-purple-600 text-white hover:bg-purple-700"
                              onClick={() => window.open(`${mp.sourceUrl}`, "_blank", "noopener,noreferrer")}
                            >
                              <User/> View Profile
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-purple-200 text-purple-700 hover:bg-purple-50"
                              onClick={() => {
                                navigator.clipboard
                                  .writeText(
                                    `Name: ${mp.name}\nParty: ${mp.party}\nConstituency: ${mp.constituency}\nProvince: ${mp.province}`
                                  )
                                  .then(() =>
                                    toast({
                                      title: "Details copied",
                                      description: "Representative contact details copied to your clipboard.",
                                    })
                                  )
                                  .catch((err) => {
                                    logError("FindMP:copy", err);
                                    toast({
                                      title: "Copy failed",
                                      description: "Please copy the details manually.",
                                      variant: "destructive",
                                    });
                                  });
                              }}
                            >
                              <Copy/>Copy Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <h2 className="text-2xl font-semibold text-purple-900 mb-4">No representatives found</h2>
                  <p className="text-gray-600">
                    Try adjusting your city or constituency and search again to see who represents you.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-purple-900 mb-4">Search to get started</h2>
                <p className="text-gray-600">
                  Enter your city or constituency above to discover your local representatives and their contact information.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FindMP;
