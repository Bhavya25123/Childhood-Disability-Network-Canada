import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Home/RunningBanner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

const FindMP = () => {
  const [province, setProvince] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  interface MPContact {
    _id: string;
    name: string;
    party: string;
    constituency: string;
    email: string;
    phone: string;
    image: string;
  }
  const [mpList, setMpList] = useState<MPContact[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.get("/mps", { params: { province } });
      setMpList(res.data);
      setSearchPerformed(true);
      toast({
        title: "Search Complete",
        description: "Found representatives for your area.",
      });
    } catch (err) {
      toast({
        title: "Search Failed",
        description: "Unable to load MP contacts.",
        variant: "destructive",
      });
    }
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
        <section className="bg-purple-50 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Find Your MP</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connect with your local Member of Parliament to advocate for caregiver support
            </p>

            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Enter your province or territory"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="bg-purple-50 text-purple-900 py-3"
          speed={20}
        />

        {searchPerformed && (
          <section className="py-16 px-8">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-purple-900">Your Representatives</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {mpList.map((mp, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
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
                      <Button variant="outline" className="w-full border-purple-600 text-purple-900 hover:bg-purple-600 hover:text-white">
                        Contact MP
                      </Button>
                      <Button variant="outline" className="w-full border-purple-600 text-purple-900 hover:bg-purple-600 hover:text-white">
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
