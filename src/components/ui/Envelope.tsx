"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Sequence: 
    // 0s-1.2s: Flap opens, Letter slides out
    // 1.2s: Envelope disappears instantly, Zoom layer appears instantly (solid background)
    setTimeout(() => {
      setShowEnvelope(false);
      setShowZoom(true);
    }, 1200);

    // 2.2s: Page behind renders, Zoom layer starts fading out
    setTimeout(() => {
      onOpen();
      setShowZoom(false);
    }, 2200);

    // 3.5s: Cleanup completely
    setTimeout(() => {
      setIsFinished(true);
    }, 3500);
  };

  if (isFinished) return null;

  return (
    <AnimatePresence>
      {showEnvelope && (
        <motion.div
          key="envelope-container"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a2a2a] p-4"
          style={{ perspective: "1000px" }}
        >
          <motion.div 
            className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#c4b097] rounded-sm shadow-2xl"></div>

            {/* The Letter inside */}
            <motion.div 
              className="absolute w-[90%] h-[90%] bg-[#f4f1ea] rounded-sm flex flex-col items-center justify-center p-6 shadow-md border border-[#e5e0d8] z-10"
              initial={{ y: 0 }}
              animate={isOpen ? { y: -150, zIndex: 30 } : { y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "backOut" }}
            >
              <div className="border border-[#d5c3aa] w-full h-full p-4 flex flex-col items-center justify-center text-center">
                <p className="font-sans text-xs tracking-[0.2em] uppercase mb-4 text-[#8b7355]">The Wedding Of</p>
                <h1 className="font-handwriting text-5xl md:text-6xl mb-6 text-[#333]">Romeo & Juliet</h1>
                <p className="font-sans text-xs text-[#555]">12.12.2026</p>
              </div>
            </motion.div>

            {/* Front of Envelope (Left & Right Flaps) */}
            <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[#d5c3aa]" style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}></div>
              <div className="absolute inset-0 bg-[#d5c3aa]" style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}></div>
              <div className="absolute inset-0 bg-[#d0be9f]" style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}></div>
            </div>

            {/* Top Flap (Opens) */}
            <motion.div 
              className="absolute inset-0 bg-[#cbb79a] z-30 origin-top shadow-sm"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)" }}
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            ></motion.div>
            
            {/* Wax Seal & Button */}
            {!isOpen && (
              <motion.div 
                className="absolute z-40 flex flex-col items-center gap-6 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
              >
                <div className="w-16 h-16 bg-[#8b1e1e] rounded-full shadow-lg flex items-center justify-center border-2 border-[#5c1010]">
                  <span className="font-handwriting text-[#e3c78a] text-2xl">R&J</span>
                </div>
                <div className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-sans tracking-widest text-sm shadow-xl border border-white/30">
                  BUKA UNDANGAN
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {showZoom && (
        <motion.div
          key="zoom-transition"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f1ea]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-full h-full flex flex-col items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, ease: "easeIn" }}
          >
             <h1 className="font-handwriting text-7xl md:text-9xl mb-6 text-[#333]">Romeo & Juliet</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
