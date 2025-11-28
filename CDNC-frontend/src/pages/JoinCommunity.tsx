import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { RunningBanner } from "@/components/Support/RunningBanner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { createMember } from "@/lib/members";

const JoinCommunity = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const testimonials = [
    "Joining this community was the best decision I made as a caregiver. The support is incredible. - Maria T.",
    "I've learned so much from other caregivers in this community. - James L.",
    "The resources and guidance from peers have been invaluable. - Sarah K.",
    "Finally found people who understand what I'm going through. - Robert J."
  ];
  
  const validate = () => {
    const nextErrors: Record<string, string> = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      nextErrors.name = "Please tell us your name.";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!role) {
      nextErrors.role = "Choose the option that best describes you.";
    }

    if (!agreeToTerms) {
      nextErrors.agreeToTerms = "Please agree to the terms to continue.";
    }

    return nextErrors;
  };

  useEffect(() => {
    // If there's a hash, attempt to scroll to that element; otherwise, scroll to top
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await createMember({
        name: name.trim(),
        email: email.trim(),
        role,
        agreeToTerms,
      });

      toast({
        title: "You're in!",
        description: "Thank you for joining our community. Check your inbox for confirmation.",
      });

      setEmail("");
      setName("");
      setRole("");
      setAgreeToTerms(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Enrollment request failed", err);

        if (!err.response || err.code === "ERR_NETWORK") {
          toast({
            title: "Enrollment service unreachable",
            description: "We couldn't connect to the enrollment service. Please check your connection and try again.",
            variant: "destructive",
          });
        } else {
          const status = err.response.status;
          const data = err.response.data as { error?: string; errors?: Record<string, string> } | undefined;

          if (status === 400 && data?.errors) {
            setErrors(data.errors);
          } else if (status === 409) {
            const duplicateMessage = data?.error || "This email is already enrolled.";
            setErrors({ email: duplicateMessage });
            toast({
              title: "Already enrolled",
              description: duplicateMessage,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Enrollment unavailable",
              description: data?.error || "Something went wrong, please try again later.",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Enrollment unavailable",
          description: "Something went wrong, please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      
      <Header />
      
      <main className="pt-16">
        <section className="bg-purple-light/30 py-16 px-8"  id="top-content">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Join Our Caregiver Community</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connect with others who understand your journey, share experiences, and access exclusive resources.
            </p>
            <RunningBanner 
              items={testimonials}
              className="bg-purple/20 text-purple-900 rounded-lg py-2 mt-8"
              
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
              
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple"
                    }`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
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
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple"
                    }`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Caregiving Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.role ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple"
                    }`}
                    aria-invalid={Boolean(errors.role)}
                    aria-describedby={errors.role ? "role-error" : undefined}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="family">Family Caregiver</option>
                    <option value="professional">Professional Caregiver</option>
                    <option value="volunteer">Volunteer Caregiver</option>
                    <option value="seeking">Seeking Caregiving Resources</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.role && (
                    <p id="role-error" className="mt-1 text-sm text-red-600">
                      {errors.role}
                    </p>
                  )}
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple"
                    aria-invalid={Boolean(errors.agreeToTerms)}
                    aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p id="terms-error" className="-mt-2 text-sm text-red-600">
                    {errors.agreeToTerms}
                  </p>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Join Community"}
                  </Button>
                </div>
                
                  <p className="text-xs text-gray-500 mt-4">
                    We'll send you occasional updates about the community. You can opt out at any time.
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

export default JoinCommunity;
