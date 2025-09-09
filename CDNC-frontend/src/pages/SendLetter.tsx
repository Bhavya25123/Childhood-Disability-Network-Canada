import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Support/RunningBanner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const SendLetter = () => {
  const [recipient, setRecipient] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  
  const successMessages = [
    "Your letter is making a difference for caregivers across the country!",
    "Thank you for being a voice for caregivers in your community.",
    "Advocacy letters like yours have helped secure new resources for caregivers.",
    "Together, our voices are creating positive change for caregivers."
  ];
  
  const representatives = [
    { name: "Emma Wilson", district: "Northern District", party: "Progressive Party" },
    { name: "Michael Chen", district: "Central District", party: "Unity Party" },
    { name: "Sarah Johnson", district: "Eastern District", party: "Democratic Alliance" },
    { name: "James Williams", district: "Western District", party: "People's Coalition" },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Letter Sent Successfully",
      description: "Thank you for advocating for caregivers. Your representative will receive your message.",
    });
    setRecipient("");
    setName("");
    setEmail("");
    setPostalCode("");
    setCustomMessage("");
  };
  
  return (
    <>
      <Header />
      
      <main className="pt-16">
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Make Your Voice Heard</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Send a letter to your representative advocating for better support and recognition for caregivers.
            </p>
            <RunningBanner 
              items={successMessages}
              className="bg-purple/20 text-purple-900 rounded-lg py-2 mt-8"
              speed={15}
            />
          </div>
        </section>
        
        <section className="py-16 px-8 bg-white">
          <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-900">Why Your Letter Matters</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-chart-bar text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.6 Million Caregivers</h3>
                    <p className="text-gray-600">There are over 2.6 million people providing unpaid care to a family member or friend in the country.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-clock text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">26+ Hours Weekly</h3>
                    <p className="text-gray-600">The average caregiver provides more than 26 hours of care per week, equivalent to a part-time job.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-wallet text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Financial Impact</h3>
                    <p className="text-gray-600">Caregivers spend an average of $7,000 per year on out-of-pocket care-related expenses.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg h-fit">
                    <i className="ti ti-heart text-purple-900 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Health Concerns</h3>
                    <p className="text-gray-600">60% of caregivers report declining physical and mental health due to caregiving responsibilities.</p>
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
              <h2 className="text-2xl font-bold mb-6 text-purple-900">Send Your Letter</h2>
              <p className="text-gray-600 mb-6">
                Customize your message or use our template to send a letter to your representative.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="representative" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Your Representative
                  </label>
                  <select
                    id="representative"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  >
                    <option value="">Select a representative</option>
                    {representatives.map((rep, index) => (
                      <option key={index} value={rep.name}>
                        {rep.name} - {rep.district} ({rep.party})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
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
                    Your Email
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    placeholder="Add your personal experience as a caregiver or why this issue matters to you..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-purple/20 mt-4">
                  <h4 className="font-medium text-purple-900 mb-2">Our Letter Template</h4>
                  <p className="text-sm text-gray-600">
                    Dear [Representative Name],<br /><br />
                    I'm writing to urge you to support policies that help unpaid family caregivers. Caregivers provide essential services that save our healthcare system billions annually, often at great personal cost.<br /><br />
                    We need: expanded tax credits for caregiving expenses, paid family leave, and increased funding for respite care programs.<br /><br />
                    [Your personal message will be added here]<br /><br />
                    Thank you for your consideration,<br />
                    [Your Name]
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-purple hover:bg-purple-dark text-white"
                  >
                    Send Letter
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  By sending this letter, you agree to our Terms of Service and Privacy Policy. We'll send you occasional updates about advocacy initiatives.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SendLetter;
