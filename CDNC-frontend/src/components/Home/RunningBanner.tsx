import { useEffect, useState } from "react";

interface RunningBannerProps {
  items: string[];
  speed?: number;
  className?: string;
}

export const RunningBanner = ({ items, speed = 20, className = "" }: RunningBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [items.length, speed]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      role="marquee"
      aria-live="polite"
      aria-label="Announcements"
    >
      <div className="flex transition-transform duration-500 ease-in-out">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 transform transition-all duration-500 ${
              index === currentIndex 
                ? "translate-x-0 opacity-100" 
                : "translate-x-full opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-lg font-medium">{item}</span>
              <span className="animate-pulse text-yellow-400" aria-hidden="true">✨</span>
              <span className="animate-bounce text-purple-400" aria-hidden="true">💜</span>
            </div>
          </div>
        ))}
      </div>
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple/5 via-transparent to-purple/5"
        aria-hidden="true"
      />
    </div>
  );
}; 