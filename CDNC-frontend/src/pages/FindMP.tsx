import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Home/RunningBanner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const FindMP = () => {
  const [postalCode, setPostalCode] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const mpList = [
    {
      name: "Sarah Johnson",
      party: "Progressive Party",
      constituency: "Central District",
      email: "sarah.johnson@parliament.gov",
      phone: "(555) 123-4567",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      name: "Michael Chen",
      party: "Unity Alliance",
      constituency: "Eastern District",
      email: "michael.chen@parliament.gov",
      phone: "(555) 234-5678",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      name: "Emma Wilson",
      party: "Democratic Coalition",
      constituency: "Western District",
      email: "emma.wilson@parliament.gov",
      phone: "(555) 345-6789",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    toast({
      title: "Search Complete",
      description: "Found representatives for your area.",
    });
  };

  const successStories = [
    "MP Sarah Johnson helped secure $2M for local caregiver support programs",
    "New respite care initiative launched after community advocacy",
    "Healthcare subsidies expanded for family caregivers",
    "Local MP champions caregiver recognition bill"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Find Your MP</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connect with your local Member of Parliament to advocate for caregiver support
            </p>

            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter your postal code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                  required
                />
                <Button type="submit" className="btn btn-secondary">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </section>

        <RunningBanner 
          items={successStories}
          className="bg-purple/10 text-purple-900 py-3"
          speed={20}
        />

        {searchPerformed && (
          <section className="py-16 px-8">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-purple-900">Your Representatives</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {mpList.map((mp, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-purple/10">
                    <img
                      src={mp.image}
                      alt={mp.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-purple-900">{mp.name}</h3>
                    <p className="text-gray-600 mb-1">{mp.party}</p>
                    <p className="text-gray-600 mb-3">{mp.constituency}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <i className="ti ti-mail mr-2" />
                        {mp.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <i className="ti ti-phone mr-2" />
                        {mp.phone}
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button variant="outline" className="w-full border-purple text-purple-900 hover:bg-purple hover:text-white">
                        Contact MP
                      </Button>
                      <Button variant="outline" className="w-full border-purple text-purple-900 hover:bg-purple hover:text-white">
                        Schedule Meeting
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FindMP;
