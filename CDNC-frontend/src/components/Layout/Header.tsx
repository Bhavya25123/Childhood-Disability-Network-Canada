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
      <div className="max-w-screen-xl h-16 flex items-center justify-between mx-auto">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-purple-900 text-xl font-bold"
          aria-label="Childhood Disability Network Canada - Homepage"
          tabIndex={0}
        >
          <img src="/images/logo_heart.png" alt="CDNC Logo" className="h-9 w-auto" />
          Childhood Disability Network Canada
        </Link>

        <nav className="flex gap-8 max-sm:hidden" aria-label="Main navigation" role="navigation">
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
            aria-label="Advocacy Hub"
            aria-current={location.pathname === '/advocacy' ? 'page' : undefined}
            tabIndex={0}
          >
            Advocacy Hub
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
            to="/find-support"
            className={`text-gray-900 text-base font-semibold hover:text-purple transition-colors px-3 py-1 rounded-md ${location.pathname === '/find-support' ? 'text-purple-900' : ''}`}
            aria-label="Find Support"
            aria-current={location.pathname === '/find-support' ? 'page' : undefined}
            tabIndex={0}
          >
            Find Support
          </Link>
          <Link
            to="/join-community"
            className={`text-gray-900 text-base font-semibold hover:text-purple transition-colors px-3 py-1 rounded-md ${location.pathname === '/join-community' ? 'text-purple-900' : ''}`}
            aria-label="Join Community"
            aria-current={location.pathname === '/join-community' ? 'page' : undefined}
            tabIndex={0}
          >
            Join Community
          </Link>
        </nav>

        {userInitial ? (
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
        )}
      </div>
    </header>
  );
};
