import { Link } from "react-router-dom";
import { RunningBanner } from "../Support/RunningBanner";
import { TiUser, TiMail, TiHeart } from "react-icons/ti";
import { Header } from "@/components/Layout/Header";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070",
      title: "Supporting Families",
      description: "Together we can make a difference"
    },
    {
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070",
      title: "Building Communities",
      description: "Creating lasting connections"
    },
    {
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070",
      title: "Empowering Caregivers",
      description: "Your journey matters"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const runningBannerItems = [
    "Join a Local Support Group Today",
    "Financial Resources for Caregivers",
    "Download Our Free Caregiving Guide",
    "Emergency Respite Care Services",
    "Caregiver Wellness Workshops",
  ];

  return (
    <main className="relative min-h-screen">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="decorative-circle decorative-circle-1"></div>
        <div className="decorative-circle decorative-circle-2"></div>
        <div className="decorative-circle decorative-circle-3"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent-light rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary-light rounded-full opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section with Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover opacity-20"
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 mx-auto w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center"
          >
            <img 
              src="/images/logo_heart.png"
              alt="Caregiving Icon" 
              className="w-14 h-14" 
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
          >
            Supporting Caregivers Together
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-12 text-text-secondary max-w-2xl mx-auto"
          >
            Join our community of caregivers, find resources, and make your voice
            heard through advocacy.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <Link
              to="/join-community"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <TiUser className="text-xl" />
              <span>Join Community</span>
            </Link>
            <Link
              to="/send-letter"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <TiMail className="text-xl" />
              <span>Send Letter</span>
            </Link>
            <Link
              to="/find-support"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <TiHeart className="text-xl" />
              <span>Find Support</span>
            </Link>
          </motion.div>
        </div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-6' : 'bg-primary-light'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section>
        <RunningBanner
          items={runningBannerItems}
          className="bg-primary-light text-white font-semibold py-3 text-lg"
        />
      </section>
    </main>
  );
};
