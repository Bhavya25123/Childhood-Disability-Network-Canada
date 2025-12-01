import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageRunningBannerProps {
  items: ImageItem[];
  className?: string;
  heightClass?: string; // Tailwind height classes e.g. "h-48 md:h-64 lg:h-80"
  maxWidthClass?: string; // Tailwind max width e.g. "max-w-4xl"
  interval?: number;
}

const ImageRunningBanner = ({
  items,
  className = "",
  heightClass = "h-56 md:h-72 lg:h-96",
  maxWidthClass = "max-w-4xl",
  interval = 3500,
}: ImageRunningBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (!items || items.length === 0) return null;

  return (
    <div className={`${className} overflow-hidden relative ${maxWidthClass} mx-auto`}>
      <div className={`w-full ${heightClass} relative`}>        
        <AnimatePresence mode="wait">
          <motion.img
            key={items[currentIndex].src}
            src={items[currentIndex].src}
            alt={items[currentIndex].alt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="object-cover w-full h-full rounded-lg shadow-sm"
          />
        </AnimatePresence>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 md:bottom-16 px-2 md:px-3 w-[95%] md:w-auto">
        <p className="bg-white/90 text-gray-800 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 rounded-md shadow-sm text-center mx-auto max-w-full md:max-w-[80%]">
          {items[currentIndex].alt}
        </p>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-2 md:bottom-3 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${currentIndex === idx ? 'bg-purple-900' : 'bg-white/60'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageRunningBanner;
