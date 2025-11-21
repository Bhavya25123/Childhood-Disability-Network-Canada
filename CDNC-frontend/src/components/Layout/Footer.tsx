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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-4 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col h-full"
          >
            <h3 className="text-xl font-bold mb-4 text-white">Childhood Disability Network Canada</h3>
            <p className="mb-4 text-sm opacity-80 text-white">
              Supporting caregivers and their children with disabilities through advocacy and resources.
            </p>
            <div className="flex gap-4 mt-auto">
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
            className="flex flex-col h-full"
          >
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 flex-1">
              <li>
                <Link
                  to="/"
                  onClick={() => window.location.reload()}
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                  aria-label="Reload page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Government Funding and Support
                </Link>
              </li>
              <li>
                <Link 
                  to="/join-community" 
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                >
                  Join Our Network
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
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
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <div className="flex-1 flex flex-col justify-start">
              <p className="mb-2 text-white">
                <button
                  type="button"
                  onClick={async () => {
                    const email = "childhooddisabilitynetwork@gmail.com";
                    try {
                      await navigator.clipboard.writeText(email);
                    } catch {
                      // Fallback for older browsers
                      const el = document.createElement("textarea");
                      el.value = email;
                      el.setAttribute("readonly", "");
                      el.style.position = "absolute";
                      el.style.left = "-9999px";
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand("copy");
                      document.body.removeChild(el);
                    }
                  }}
                  className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  tabIndex={0}
                  aria-label="Copy email address to clipboard"
                >
                  childhooddisabilitynetwork@gmail.com
                </button>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white border-opacity-20 py-6 px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 text-white">
            &copy; {currentYear} Childhood Disability Network Canada. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-2 text-sm">
            Made  with  ❤️  by  
            <a
              href="https://www.linkedin.com/in/sid-lamba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              tabIndex={0}
              aria-label="Siddharth Lamba LinkedIn (opens in new tab)"
            >
              Siddharth Lamba
            </a>
            | <a
              href="https://www.linkedin.com/in/bhavyashah2503/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              tabIndex={0}
              aria-label="Bhavya Shah LinkedIn (opens in new tab)"
            >
              Bhavya Shah
            </a>|
             <a
              href="https://www.linkedin.com/in/patel-mohamedsaif-45ba69260/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-main transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              tabIndex={0}
              aria-label="Md. Saif Patel LinkedIn (opens in new tab)"
            >
              Md. Saif Patel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
