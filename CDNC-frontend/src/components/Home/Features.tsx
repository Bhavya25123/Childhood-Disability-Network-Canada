import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaHandsHelping, FaBook } from "react-icons/fa";

export const Features = () => {
  const features = [
    {
      icon: <FaHeartbeat className="text-3xl text-primary-main" />,
      title: "Health Resources",
      description: "Access medical information, treatment options, and specialized care referrals designed for caregivers and their loved ones.",
      delay: 0.1,
      imageBg: "bg-primary-light",
    },
    {
      icon: <FaUsers className="text-3xl text-secondary-main" />,
      title: "Community Support",
      description: "Connect with other caregivers through our peer-to-peer support groups, events, and online forums.",
      delay: 0.3,
      imageBg: "bg-secondary-light",
    },
    {
      icon: <FaHandsHelping className="text-3xl text-accent-main" />,
      title: "Financial Assistance",
      description: "Find grants, subsidies, and financial planning resources to help manage the costs of caregiving.",
      delay: 0.5,
      imageBg: "bg-accent-light",
    },
    {
      icon: <FaBook className="text-3xl text-primary-main" />,
      title: "Educational Materials",
      description: "Access guides, workshops, and training materials to develop caregiving skills and knowledge.",
      delay: 0.7,
      imageBg: "bg-primary-light",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-light opacity-30"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-light opacity-30"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient mb-6">How We Support You</h2>
          <p className="max-w-3xl mx-auto">
            Our mission is to provide caregivers with the tools, information, and community they need to provide exceptional care while maintaining their own wellbeing.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="feature-card"
            >
              <div className={`rounded-full ${feature.imageBg} w-16 h-16 flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="/resources" className="btn btn-primary inline-flex items-center gap-2">
            <span>Explore All Resources</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}; 