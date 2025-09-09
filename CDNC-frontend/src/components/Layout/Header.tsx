import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-md">
      <div className="max-w-screen-xl h-16 flex items-center justify-between mx-auto px-6">
        <Link to="/" className="flex items-center gap-2 text-purple-900 text-xl font-bold">
          <img src="/images/logo_heart.png" alt="CDNC Logo" className="h-9 w-auto" />
          Childhood Disability Network Canada
        </Link>

        <nav className="flex gap-8 max-sm:hidden" aria-label="Main navigation">
          <Link
            to="/"
            className="text-gray-900 text-base font-semibold hover:text-purple transition-colors"
          >
            Home
          </Link>
          <Link
            to="/advocacy"
            className="text-gray-900 text-base font-semibold hover:text-purple transition-colors"
          >
            Advocacy Hub
          </Link>
          <Link
            to="/resources"
            className="text-gray-900 text-base font-semibold hover:text-purple transition-colors"
          >
            Resources
          </Link>
          <Link
            to="/find-support"
            className="text-gray-900 text-base font-semibold hover:text-purple transition-colors"
          >
            Find Support
          </Link>
          <Link
            to="/join-community"
            className="text-gray-900 text-base font-semibold hover:text-purple transition-colors"
          >
            Join Community
          </Link>
        </nav>

        <Link
          to="/sign-in"
          className="bg-purple-600 text-white text-base font-semibold px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};
