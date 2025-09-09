import { motion } from "framer-motion";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote:
        "The support I've received from this community has been life-changing. I finally feel seen and understood in my caregiving journey.",
      author: "Sarah M.",
      role: "Parent Caregiver",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      quote:
        "The resources provided helped me navigate the complex healthcare system and find financial assistance I didn't know existed.",
      author: "Michael T.",
      role: "Spouse Caregiver",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      quote:
        "Being able to connect with other caregivers who understand my daily struggles has been incredibly comforting and empowering.",
      author: "Elena K.",
      role: "Caregiver for Grandparent",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-primary-light wave-pattern">
      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-main opacity-10 animate-float"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary-main opacity-10 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-32 left-1/4 w-24 h-24 rounded-full bg-accent-main opacity-10 animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient mb-6">Caregiver Stories</h2>
          <p className="max-w-3xl mx-auto text-text-secondary">
            Hear from caregivers who have found support, resources, and
            community through our platform.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.9,
                  x: index === activeIndex ? 0 : (index < activeIndex ? -100 : 100),
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-xl shadow-xl p-8 md:p-10 ${
                  index === activeIndex ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-light">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -left-2 bg-primary-main rounded-full w-8 h-8 flex items-center justify-center">
                      <FaQuoteLeft className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg italic mb-6">{testimonial.quote}</p>
                    <div>
                      <h4 className="font-bold text-primary-main">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-text-light">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary-main w-10"
                    : "bg-primary-light"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 