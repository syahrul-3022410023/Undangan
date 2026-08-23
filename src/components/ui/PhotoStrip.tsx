'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoStripProps {
  photos: string[];
}

export default function PhotoStrip({ photos }: PhotoStripProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Start slideshow after a delay (2.5s for paper slide + 1.5s for initial fade-in)
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 4500);

    return () => clearTimeout(timer);
  }, [photos.length]);

  return (
    <div className="relative w-full flex flex-col items-center py-4">
      {/* Printer Slot */}
      <div className="w-[300px] h-10 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-inner flex items-center justify-center p-1.5 relative z-20 border-b border-white/60">
        <div className="w-[260px] h-3 bg-gray-900 rounded-full shadow-[inset_0_4px_6px_rgba(0,0,0,1)] relative z-10 flex justify-center">
          {/* This empty space represents the dark slit */}
        </div>
      </div>

      {/* Wrapper to clip the top so it comes exactly from the slot */}
      {/* We set z-30 so it is ABOVE the slot, but we clip it so it only shows from the middle of the black hole downwards.
          Since it's above the slot, it will cover the bottom half of the black hole and the bottom gray lip.
          This creates a perfect illusion of paper sticking out of the hole! 
          The slot is h-10 (40px). The hole is centered, so its vertical center is at 20px. 
          We pull the wrapper up by -mt-[20px]. So top=0 of wrapper is exactly at the center of the slot.
      */}
      <div className="w-full flex justify-center -mt-[20px] z-30" style={{ clipPath: "inset(0 -100px -100px -100px)" }}>
        {/* Photo Strip */}
        <motion.div 
          initial={{ y: "-100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-[240px] bg-[#F9F9F9] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative"
        >
          {/* Perforated edges effect using a dashed border on an absolute element */}
          <div className="absolute inset-0 border-x-[6px] border-dotted border-[#F4F1EA] pointer-events-none z-20" style={{ mixBlendMode: 'screen' }}></div>
          
          <div className="space-y-3 relative z-10 pt-1">
            {[0, 1, 2].map((slotIndex) => {
              const photoIndex = (currentIndex + slotIndex) % photos.length;
              
              return (
                <div key={slotIndex} className="w-full aspect-[4/3] bg-gray-200 overflow-hidden relative shadow-sm">
                  {/* The initial fade in for the first time */}
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 2.5 + (slotIndex * 0.4) }}
                    className="absolute inset-0 z-10 bg-gray-200"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={photoIndex}
                        src={photos[photoIndex]}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover grayscale-[15%] absolute inset-0"
                      />
                    </AnimatePresence>
                  </motion.div>

                  {slotIndex === 2 && (
                    <div className="absolute bottom-2 left-3 z-20 pointer-events-none">
                      <p className="font-script text-white text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">Photo<br/>Dump</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
