import React from 'react';
import styles from './RunningBanner.module.css';

interface RunningBannerProps {
  items: string[];
  speed?: number; // Speed in pixels per second
  className?: string;
}

export const RunningBanner: React.FC<RunningBannerProps> = ({ items, speed = 40, className = "" }) => {
  const bannerItems = [...items, ...items];
  const animationDuration = (bannerItems.length * 10) / speed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="marquee"
      aria-live="polite"
      aria-label="Announcements"
    >
      <div 
        className={`flex flex-nowrap ${styles['running-banner-inner']}`}
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {bannerItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-3 flex-shrink-0 px-4 whitespace-nowrap"
          >
            <span className="text-lg font-medium">{item}</span>
            <span className="text-yellow-400">✨</span>
            <span className="text-purple-400">💜</span>
          </div>
        ))}
      </div>
    </div>
  );
};