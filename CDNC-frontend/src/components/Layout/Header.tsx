import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-md" onKeyDown={handleKeyDown}>
      <div className="max-w-screen-xl h-16 flex items-center justify-between mx-auto px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-purple-900 font-bold"
          aria-label="Childhood Disability Network Canada - Homepage"
          tabIndex={0}
        >
          <img src="/images/logo_heart.png" alt="CDNC Logo" className="h-8 md:h-9 w-auto" />
          <span className="hidden md:inline text-xl">Childhood Disability Network Canada</span>
          <span className="md:hidden text-sm leading-tight">
            Childhood Disability<br />Network Canada
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6" aria-label="Main navigation" role="navigation">
          <Link
            to="/"
            className={`text-gray-900 text-base font-semibold hover:text-purple transition-colors px-3 py-1 rounded-md ${location.pathname === '/' ? 'text-purple-900' : ''}`}
            aria-label="Home"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            tabIndex={0}
          >
            Home
          </Link>
          <Link
            to="/advocacy"
            className={`text-gray-900 text-base font-semibold hover:text-purple transition-colors px-3 py-1 rounded-md ${location.pathname === '/advocacy' ? 'text-purple-900' : ''}`}
            aria-label="Advocacy"
            aria-current={location.pathname === '/advocacy' ? 'page' : undefined}
            tabIndex={0}
          >
            Advocacy
          </Link>
          <Link
            to="/resources"
            className={`text-gray-900 text-base font-semibold hover:text-purple transition-colors px-3 py-1 rounded-md ${location.pathname === '/resources' ? 'text-purple-900' : ''}`}
            aria-label="Resources"
            aria-current={location.pathname === '/resources' ? 'page' : undefined}
            tabIndex={0}
          >
            Resources
          </Link>
          <Link
            to="/join-community"
            className={`text-gray-900 text-base font-semibold hover:text-purple transition-colors px-3 py-1 rounded-md ${location.pathname === '/join-community' ? 'text-purple-900' : ''}`}
            aria-label="Join Community"
            aria-current={location.pathname === '/join-community' ? 'page' : undefined}
            tabIndex={0}
          >
            Join Our Network
          </Link>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-purple-900 text-2xl p-2 hover:bg-purple-50 rounded-md transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          tabIndex={0}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* {userInitial ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDropdownOpen((prev) => !prev);
                }
              }}
              className="bg-purple-600 text-white text-base font-semibold w-10 h-10 rounded-full hover:bg-purple-900 transition-colors flex items-center justify-center"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              tabIndex={0}
            >
              {userInitial}
            </button>
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg" 
                role="menu" 
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <button
                  onClick={handleSignOut}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSignOut();
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={0}
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
            aria-label="Sign In"
            tabIndex={0}
          >
            Sign In
          </Link>
        )} */}
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-4 space-y-2" aria-label="Mobile navigation">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-gray-900 text-base font-semibold hover:text-purple hover:bg-purple-50 transition-colors px-4 py-3 rounded-md ${location.pathname === '/' ? 'text-purple-900 bg-purple-50' : ''}`}
                aria-label="Home"
                aria-current={location.pathname === '/' ? 'page' : undefined}
                tabIndex={0}
              >
                Home
              </Link>
              <Link
                to="/advocacy"
                onClick={() => setIsMenuOpen(false)}
                className={`text-gray-900 text-base font-semibold hover:text-purple hover:bg-purple-50 transition-colors px-4 py-3 rounded-md ${location.pathname === '/advocacy' ? 'text-purple-900 bg-purple-50' : ''}`}
                aria-label="Advocacy"
                aria-current={location.pathname === '/advocacy' ? 'page' : undefined}
                tabIndex={0}
              >
                Advocacy
              </Link>
              <Link
                to="/resources"
                onClick={() => setIsMenuOpen(false)}
                className={`text-gray-900 text-base font-semibold hover:text-purple hover:bg-purple-50 transition-colors px-4 py-3 rounded-md ${location.pathname === '/resources' ? 'text-purple-900 bg-purple-50' : ''}`}
                aria-label="Resources"
                aria-current={location.pathname === '/resources' ? 'page' : undefined}
                tabIndex={0}
              >
                Resources
              </Link>
              <Link
                to="/join-community"
                onClick={() => setIsMenuOpen(false)}
                className={`text-gray-900 text-base font-semibold hover:text-purple hover:bg-purple-50 transition-colors px-4 py-3 rounded-md ${location.pathname === '/join-community' ? 'text-purple-900 bg-purple-50' : ''}`}
                aria-label="Join Community"
                aria-current={location.pathname === '/join-community' ? 'page' : undefined}
                tabIndex={0}
              >
                Join Our Network
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
