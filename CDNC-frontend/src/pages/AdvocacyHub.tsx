import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Link } from "react-router-dom";
import { Megaphone, Handshake, FileText, Vote, Users, Mail } from "lucide-react";

const AdvocacyHub = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Advocacy Hub</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our movement to advocate for better support and recognition for caregivers across the country.
              Together, we can make a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-purple hover:bg-purple-dark font-bold">
                <Link to="/find-mp">
                  <Vote className="mr-2" />
                  Find Your MP
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple text-purple-900 hover:bg-purple-dark font-bold">
                <Link to="/send-letter">
                  <Mail className="mr-2" />
                  Send Advocacy Letter
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Current Campaigns */}
        <section className="py-16 px-4">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Current Campaigns</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <Megaphone className="text-purple-900 h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Caregiver Recognition Act</h3>
                <p className="text-gray-600 mb-4">
                  Support legislation to formally recognize the essential role of family caregivers in our healthcare system.
                </p>
                <Button asChild variant="outline" className="w-full mt-2 border-purple text-purple-900 hover:bg-purple-light">
                  <Link to="/send-letter">Learn More</Link>
                </Button>
              </Card>
              
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <FileText className="text-purple-900 h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tax Credit Expansion</h3>
                <p className="text-gray-600 mb-4">
                  Advocate for expanded tax credits to help offset the financial burden faced by family caregivers.
                </p>
                <Button asChild variant="outline" className="w-full mt-2 border-purple text-purple-900 hover:bg-purple-light">
                  <Link to="/send-letter">Learn More</Link>
                </Button>
              </Card>
              
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <Handshake className="text-purple-900 h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Respite Care Initiative</h3>
                <p className="text-gray-600 mb-4">
                  Support funding for expanded respite care services to provide caregivers with necessary breaks.
                </p>
                <Button asChild variant="outline" className="w-full mt-2 border-purple text-purple-900 hover:bg-purple-light">
                  <Link to="/send-letter">Learn More</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Ways to Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Vote className="text-purple-900 mr-2" />
                  Contact Your Representatives
                </h3>
                <p className="text-gray-600 mb-4">
                  Reach out to your local representatives to express your support for caregiver-friendly policies.
                  Your voice matters in shaping legislation that affects caregivers.
                </p>
                <Button asChild className="bg-purple hover:bg-purple-dark w-full mt-2">
                  <Link to="/find-mp">Find Your MP</Link>
                </Button>
              </Card>
              
              <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="text-purple-900 mr-2" />
                  Join Our Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with other caregivers and advocates who are passionate about improving support for caregivers.
                  Share your story and learn from others.
                </p>
                <Button asChild className="bg-purple hover:bg-purple-dark w-full mt-2">
                  <Link to="/join-community">Join Now</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories - This section is replaced with the one from SendLetter.tsx */}
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Success Stories</h2>
            <p className="text-lg mb-12 text-gray-600">
              See how advocacy has made a difference for caregivers nationwide
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-purple/5">
                <div className="text-purple-900 font-bold mb-2">Tax Relief</div>
                <h3 className="text-xl font-semibold mb-3">Caregiver Tax Credit</h3>
                <p className="text-gray-600">5,000+ letters helped secure a new tax credit for family caregivers in 2022.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-purple/5">
                <div className="text-purple-900 font-bold mb-2">Healthcare Access</div>
                <h3 className="text-xl font-semibold mb-3">Caregiver Health Program</h3>
                <p className="text-gray-600">Advocacy secured $10M in funding for caregiver health screening programs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-purple/5">
                <div className="text-purple-900 font-bold mb-2">Respite Care</div>
                <h3 className="text-xl font-semibold mb-3">Community Support</h3>
                <p className="text-gray-600">Local advocacy expanded respite care services in 15 counties nationwide.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdvocacyHub;
