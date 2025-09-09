import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RunningBannerProps {
  items: string[];
  className?: string;
}

export const RunningBanner = ({ items, className = "" }: RunningBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className={`${className} overflow-hidden relative`}>
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-main bg-opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-main" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center h-10"
              >
                {items[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="ml-auto flex gap-1">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-primary-main' : 'bg-primary-light'
              }`}
              aria-label={`Announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
