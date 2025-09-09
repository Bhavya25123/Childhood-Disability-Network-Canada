import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Support/RunningBanner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const JoinCommunity = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  
  const testimonials = [
    "Joining this community was the best decision I made as a caregiver. The support is incredible. - Maria T.",
    "I've learned so much from other caregivers in this community. - James L.",
    "The resources and guidance from peers have been invaluable. - Sarah K.",
    "Finally found people who understand what I'm going through. - Robert J."
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Thank you for joining our community. We'll be in touch soon!",
    });
    setEmail("");
    setName("");
    setRole("");
  };
  
  return (
    <>
      
      <Header />
      
      <main className="pt-16">
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Join Our Caregiver Community</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connect with others who understand your journey, share experiences, and access exclusive resources.
            </p>
            <RunningBanner 
              items={testimonials}
              className="bg-purple/20 text-purple-900 rounded-lg py-2 mt-8"
              speed={21}
            />
          </div>
        </section>
        
        <section className="py-16 px-8 bg-white">
          <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-900">Why Join Our Community?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-messages text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Peer Support</h3>
                    <p className="text-gray-600">Connect with other caregivers who understand your experiences in our moderated forums and local meetups.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-book text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
                    <p className="text-gray-600">Access exclusive guides, webinars, and training materials created specifically for caregivers.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-calendar-event text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Virtual Events</h3>
                    <p className="text-gray-600">Participate in online workshops, support groups, and social gatherings with other community members.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-discount text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Member Benefits</h3>
                    <p className="text-gray-600">Enjoy discounts on caregiver products and services through our partnership network.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple/5 p-8 rounded-lg shadow-sm border border-purple/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-900">Become a Member</h2>
              <p className="text-gray-600 mb-6">
                Fill out this form to join our community. Membership is free and gives you access to all our resources.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Caregiving Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="family">Family Caregiver</option>
                    <option value="professional">Professional Caregiver</option>
                    <option value="volunteer">Volunteer Caregiver</option>
                    <option value="seeking">Seeking Caregiving Resources</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-purple hover:bg-purple-dark text-white"
                  >
                    Join Community
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  By joining, you agree to our Terms of Service and Privacy Policy. We'll send you occasional updates about the community.
                </p>
              </form>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Upcoming Community Events</h2>
            <p className="text-lg mb-12 text-gray-600">
              Join these virtual and in-person events to connect with other caregivers
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-purple/5">
                <div className="text-purple-900 font-bold mb-2">June 15, 2025</div>
                <h3 className="text-xl font-semibold mb-3">Virtual Support Group</h3>
                <p className="text-gray-600 mb-4">Share experiences and strategies for managing caregiver stress</p>
                <Button variant="outline" className="border-purple text-purple-900 hover:bg-purple hover:text-white">
                  Register
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-purple/5">
                <div className="text-purple-900 font-bold mb-2">June 22, 2025</div>
                <h3 className="text-xl font-semibold mb-3">Caregiving Workshop</h3>
                <p className="text-gray-600 mb-4">Learn practical skills for daily caregiving challenges</p>
                <Button variant="outline" className="border-purple text-purple-900 hover:bg-purple hover:text-white">
                  Register
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-purple/5">
                <div className="text-purple-900 font-bold mb-2">July 5, 2025</div>
                <h3 className="text-xl font-semibold mb-3">Self-Care Session</h3>
                <p className="text-gray-600 mb-4">Focus on wellness practices for caregivers</p>
                <Button variant="outline" className="border-purple text-purple-900 hover:bg-purple hover:text-white">
                  Register
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default JoinCommunity;
