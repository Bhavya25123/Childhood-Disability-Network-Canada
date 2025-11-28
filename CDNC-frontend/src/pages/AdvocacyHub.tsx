import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Link } from "react-router-dom";
import { Megaphone, Handshake, FileText, Vote, Users, Mail } from "lucide-react";
import { MdPeopleAlt } from "react-icons/md";
import { ChevronDown } from "lucide-react";


// Inline accordion for "Advocacy How To's" replicating FAQ pop-down style
const howToItems = [
  {
    title: "In Your Letter",
    content: "Briefly narrate your personal experience as a concerned community member or caregiver.",
  },
  {
    title: "Request a Meeting",
    content:
      "Explicitly ask for an appointment with your MP to discuss these matters further. Remember, as a constituent, you have the right to request their attention on issues that matter to you.",
  },
  {
    title: "If You Don't Hear Back",
    content:
      "Follow up with your MP's office by calling or emailing, referencing your previous communication. Persistence is key to getting your voice heard.",
  },
  {
    title: "Remember",
    content:
      "Your story has the power to drive change. By taking action, you are advocating for a more inclusive and supportive society for caregivers and those with disabilities.",
  },
];

function HowToAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900 mb-3 text-center tracking-tight">Advocacy How To’s</h2>
      <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        Quick, practical guidance to take impactful advocacy steps.
      </p>
      <div className="space-y-3">
        {howToItems.map((item, idx) => (
          <div
            key={item.title}
            className="border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggle(idx)}
              className="flex w-full justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-2xl"
              aria-expanded={openIndex === idx}
              aria-controls={`howto-content-${idx}`}
            >
              <span className="font-semibold text-gray-800">{item.title}</span>
              <span
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 inline-block ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              >
                <ChevronDown />
              </span>
            </button>
            {openIndex === idx && (
              <div id={`howto-content-${idx}`} className="px-5 pb-5 -mt-2 text-gray-700 leading-relaxed">
                <div className="border-t border-gray-200 pt-4">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const AdvocacyHub = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-white py-16 px-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">Advocacy</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our network and advocate for better support and recognition 
              for caregivers across the country. Together, we can make a difference!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-purple hover:bg-purple-dark font-bold ">
                <Link to="https://www.ourcommons.ca/members/en"
                className="items-center justify-center gap-3
                 bg-purple-900 hover:bg-purple-800 hover:text-white text-white
                 hover:shadow-xl hover:scale-105">
                  <i className="ti ti-search text-xl" />
                  <MdPeopleAlt className="mr-2" />
                  <span>Find Your MP</span>
                  <i className="ti ti-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-700 text-purple-900 hover:bg-purple-dark font-bold">
                <Link to="/send-letter">
                  <Mail className="mr-2" />
                  Send Advocacy Letter
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Advocacy How To's */}
        <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
          <div className="max-w-screen-xl mx-auto">
            <HowToAccordion />
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900 tracking-tight">About Us</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Childhood Disability Network Canada (CDNC) is a family-led group connecting parents, caregivers, and professionals to share resources and advocate for change.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <Users className="h-6 w-6 text-purple-800" />
                  <h3 className="text-lg font-semibold text-purple-900">What is CDNC?</h3>
                </div>
                <p className="text-gray-700">We connect families and professionals who support children and youth with disabilities, sharing information, resources, and advocacy to help families thrive.</p>
              </div>

              <div className="group bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <Handshake className="h-6 w-6 text-purple-800" />
                  <h3 className="text-lg font-semibold text-purple-900">“Lifetime caregiver”</h3>
                </div>
                <p className="text-gray-700">Care is lifelong. CDNC supports families at every stage — from early childhood through adulthood.</p>
              </div>

              <div className="group bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <Megaphone className="h-6 w-6 text-purple-800" />
                  <h3 className="text-lg font-semibold text-purple-900">Get involved</h3>
                </div>
                <p className="text-gray-700">Join our mailing list, attend events, share your story, or participate in advocacy projects. Visit <a href="http://ChildhoodDisabilityNetwork.ca" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">ChildhoodDisabilityNetwork.ca</a> to sign up.</p>
              </div>

              <div className="group bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <Vote className="h-6 w-6 text-purple-800" />
                  <h3 className="text-lg font-semibold text-purple-900">Our advocacy</h3>
                </div>
                <p className="text-gray-700">We speak up for fair access to supports, inclusive schools, accessible housing, and direct funding — helping children stay at home, not in institutions.</p>
              </div>

              <div className="group bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="h-6 w-6 text-purple-800" />
                  <h3 className="text-lg font-semibold text-purple-900">Our partners</h3>
                </div>
                <p className="text-gray-700">We partner with families, community groups, and government leaders to create positive change.</p>
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
