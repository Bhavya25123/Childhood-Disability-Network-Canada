import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Animated counter component
const Counter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const { ref, inView } = useInView({ triggerOnce: true });
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    if (inView) {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };
      
      animationFrame = requestAnimationFrame(step);
    }
    
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);
  
  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const Stats = () => {
  const stats = [
    {
      value: 5000,
      label: "Active Members",
      description: "Caregivers supporting each other",
      icon: "👥",
    },
    {
      value: 120,
      label: "Support Groups",
      description: "Across the country",
      icon: "🤝",
    },
    {
      value: 2500,
      label: "Resources",
      description: "Articles, guides, and tools",
      icon: "📚",
    },
    {
      value: 350,
      label: "Success Stories",
      description: "Positive impact reports",
      icon: "🌟",
    },
  ];

  return (
    <section className="py-16 bg-white relative">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient mb-6">Our Impact</h2>
          <p className="max-w-3xl mx-auto text-text-secondary">
            We've helped thousands of caregivers find support and resources.
            Here's our impact by the numbers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="stat-card"
            >
              <div className="text-5xl mb-2 text-center">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-primary-main mb-2">
                <Counter from={0} to={stat.value} />+
              </h3>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <p className="text-text-light text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="h-2 bg-primary-light rounded-full"></div>
          <div className="h-2 bg-secondary-light rounded-full"></div>
          <div className="h-2 bg-accent-light rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}; 