import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Support/RunningBanner";
import { Button } from "@/components/ui/button";
import { Heart, LifeBuoy, Phone, MapPin, Mail, HelpCircle } from "lucide-react";

const FindSupport = () => {
  const supportServices = [
    {
      title: "Ontario Special Needs Helpline",
      description: "24/7 support for families with children with disabilities",
      icon: <Phone className="h-8 w-8 text-purple-900" />,
      contactInfo: "1-888-444-4626",
    },
    {
      title: "ErinoakKids Centre (Oakville)",
      description: "Treatment and rehabilitation services for children",
      icon: <Heart className="h-8 w-8 text-purple-900" />,
      contactInfo: "905-855-2690",
    },
    {
      title: "Ron Joyce Children's Health Centre (Hamilton)",
      description: "Specialized pediatric services for developmental conditions",
      icon: <MapPin className="h-8 w-8 text-purple-900" />,
      contactInfo: "905-521-2100",
    },
    {
      title: "Ontario Disability Support Program",
      description: "Financial assistance for children with disabilities",
      icon: <LifeBuoy className="h-8 w-8 text-purple-900" />,
      contactInfo: "1-800-263-5960",
    },
    {
      title: "Burlington Accessibility Advisory Committee",
      description: "Local resources and support in Burlington",
      icon: <HelpCircle className="h-8 w-8 text-purple-900" />,
      contactInfo: "905-335-7600 ext. 7865",
    },
    {
      title: "Reach Out Centre for Kids (ROCK)",
      description: "Mental health services for children and youth",
      icon: <Mail className="h-8 w-8 text-purple-900" />,
      contactInfo: "289-266-0036",
    },
  ];

  const runningBannerItems = [
    "Ontario Special Needs Helpline: 1-888-444-4626",
    "Assistance for Children with Severe Disabilities (ACSD) Program",
    "Respite Services in Hamilton: 905-521-2100",
    "ErinoakKids Centre Oakville Services Available",
    "Ontario Autism Program Support Line: 1-888-284-8340",
    "Burlington Pediatric Therapy Options",
    "Hamilton-Wentworth District School Board Special Education: 905-527-5092",
    "Halton Region Children's Developmental Services: 905-825-6000",
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="bg-purple-light/30 py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Find Support</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              We're here to help you navigate your caregiving journey with the support and resources you need.
            </p>
            <Button className="bg-white text-purple-900 hover:bg-gray-50 border border-purple/20 font-semibold py-3 px-8 rounded-lg">
              Get Immediate Help
            </Button>
          </div>
        </section>

        {/* Running Banner */}
        <RunningBanner 
          items={runningBannerItems} 
          className="bg-purple/10 text-purple-900 font-semibold py-3 text-lg"
        />

        {/* Support Services */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">Support Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportServices.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-purple/5">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-purple-900 font-medium">{service.contactInfo}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

       

      </main>

      <Footer />
    </>
  );
};

export default FindSupport;
