import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient relative overflow-hidden">
      {/* Overlay circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-10 w-64 h-64 bg-white rounded-full opacity-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-white rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Support and Make a Difference?</h2>
            <p className="text-white text-lg opacity-90 mb-8">
              Join our community today to connect with other caregivers, access valuable resources, and advocate for change. Together, we can create a more supportive environment for all caregivers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/join-community" className="btn bg-white text-primary-main hover:bg-opacity-90 transition-all duration-300">
                Join Our Community
              </Link>
              <Link to="/about" className="btn border border-white text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                }}
                className="floating-image"
              >
                <img 
                  src="https://images.unsplash.com/photo-1593100126453-19b562a800c1?w=600&auto=format&fit=crop&q=60" 
                  alt="Caregiving" 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent-main text-accent-contrast text-sm font-bold rounded-lg py-2 px-4 shadow-lg">
                  Join 5,000+ caregivers
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear"
                }}
                className="absolute -top-6 -left-6 w-12 h-12 border-4 border-accent-main rounded-full"
              ></motion.div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-black opacity-20 blur-xl rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 