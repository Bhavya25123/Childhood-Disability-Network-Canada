import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-main text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark rounded-tr-full opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-dark rounded-bl-full opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4">Caregiver Support Network</h3>
            <p className="mb-4 text-sm opacity-80 text-white">
              Supporting caregivers with community, resources, and advocacy.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-white hover:text-accent-main transition-colors"
                tabIndex={0} 
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-accent-main transition-colors" 
                tabIndex={0} 
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-accent-main transition-colors" 
                tabIndex={0} 
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-accent-main transition-colors" 
                tabIndex={0} 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/resources/health" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Health Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources/financial" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Financial Assistance
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources/support-groups" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Support Groups
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources/education" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Educational Materials
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources/advocacy" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Advocacy Tools
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 ">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2 text-white">123 Support Street</p>
              <p className="mb-2 text-white">Care City, CA 90000</p>
              <p className="mb-2 text-white">
                <a 
                  href="mailto:info@caregivernetwork.org" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  info@caregivernetwork.org
                </a>
              </p>
              <p>
                <a 
                  href="tel:+11234567890" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  (123) 456-7890
                </a>
              </p>
            </address>
          </motion.div>
        </div>

        <div className="border-t border-white border-opacity-20 py-6 px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 text-white">
            &copy; {currentYear} Caregiver Support Network. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm">
            <Link 
              to="/privacy" 
              className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              tabIndex={0}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              tabIndex={0}
            >
              Terms of Service
            </Link>
            <Link 
              to="/accessibility" 
              className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              tabIndex={0}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
