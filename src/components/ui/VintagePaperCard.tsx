import React from 'react';
import { Heart } from 'lucide-react';

export default function VintagePaperCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full mt-14 mb-8">
      {/* Wax Seal Image at the top center */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]">
        <div className="w-[85px] h-[85px] rounded-full overflow-hidden shadow-inner flex items-center justify-center">
          <img src="/seal.png" alt="Wax Seal" className="w-full h-full object-cover scale-[1.05]" />
        </div>
      </div>

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
      {/* We use a wrapper to apply the drop-shadow separately from the displacement map, 
          because doing them together can sometimes clip the shadow. */}
      <div className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
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
        
        {/* Card Content (NO FILTER) */}
        <div className="relative z-10 text-[#1B263B] w-full pt-16 pb-10 px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
