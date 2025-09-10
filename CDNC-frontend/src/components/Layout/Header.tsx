import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const name = localStorage.getItem("fullName");
    if (name) {
      setUserInitial(name.charAt(0).toUpperCase());
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    setUserInitial(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

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

        {userInitial ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="bg-purple-600 text-white text-base font-semibold w-10 h-10 rounded-full hover:bg-purple-900 transition-colors flex items-center justify-center"
            >
              {userInitial}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="bg-purple-600 text-white text-base font-semibold px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
