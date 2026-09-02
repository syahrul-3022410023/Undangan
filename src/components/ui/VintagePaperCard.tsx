import React from 'react';
import { Heart } from 'lucide-react';

export default function VintagePaperCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full my-6">
      {/* SVG Filters definitions for torn edge and texture */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="torn-edge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Actual Paper Container */}
      <div className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
        {/* Background Layer with Torn Edge Filter */}
        <div 
          className="absolute inset-0 bg-[#F4F1EA] overflow-hidden"
          style={{ filter: "url(#torn-edge)" }}
        >
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          
          {/* Subtle vignette for vintage look */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.05)_100%)]"></div>
        </div>
        
        {/* Card Content */}
        <div className="relative z-10 text-[#1B3B2B] w-full pt-10 sm:pt-12 pb-10 px-6 sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
