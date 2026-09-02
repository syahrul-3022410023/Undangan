"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plane } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

interface EnvelopeIntroProps {
  onOpen: () => void;
  brideName?: string;
  groomName?: string;
}

export default function EnvelopeIntro({
  onOpen,
  brideName = "Silvi",
  groomName = "Izul"
}: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Sequence: Top flap opens -> Paper sheet slides up -> Transition to main page
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div
      key="envelope-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)", transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 gap-5 sm:gap-6 bg-[#1B3B2B] text-[#F4F1EA] overflow-y-auto select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B2B]/90 via-[#1B3B2B]/80 to-[#1B3B2B]/95"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      {/* TOP SECTION: Header Text */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={isOpen 
          ? { opacity: 0, y: -20 } 
          : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <p className="font-serif text-sm sm:text-base tracking-widest text-[#F4F1EA]/80 font-light mb-1">
          Undangan Pernikahan
        </p>

        <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-md py-1">
          {brideName} <span className="text-3xl sm:text-4xl opacity-80 mx-1">&</span> {groomName}
        </h1>

        <p className="font-serif italic text-xs sm:text-sm text-[#F4F1EA]/70 tracking-wider mt-1">
          Minggu, 20 September 2026
        </p>
      </motion.div>

      {/* CENTER SECTION: Interactive Envelope & Paper Sheet */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={!isOpen ? { scale: 1.03 } : {}}
        whileTap={!isOpen ? { scale: 0.96 } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="relative z-10 cursor-pointer group"
        onClick={handleOpen}
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-[300px] sm:w-[350px] h-[210px] sm:h-[240px]">
          {/* Warm Cream Envelope Interior Backing (Matches envelope paper) */}
          <div className="absolute inset-0 bg-[#F4F1EA] rounded-md shadow-[0_25px_60px_rgba(0,0,0,0.6)]"></div>

          {/* TOP FLAP (Flipping Open 180deg) */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-[120px] sm:h-[135px] bg-[#E2DCCB] origin-top pointer-events-none rounded-t-md z-30 overflow-hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Interior color of the flap when flipped */}
            <div className="absolute inset-0 bg-[#F4F1EA]"></div>
          </motion.div>

          {/* LEMBARAN KERTAS (Tucked inside when closed, expands to cover V-pocket when open) */}
          <motion.div 
            className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 bg-[#F4F1EA] text-[#1B3B2B] rounded-t-lg p-4 sm:p-5 flex flex-col items-center justify-start border border-[#D5CCA8] shadow-2xl z-20 pointer-events-none overflow-hidden"
            animate={isOpen 
              ? { y: -130, height: "calc(100% + 45px)", scale: 1.02 } 
              : { y: 0, height: "calc(100% - 24px)", scale: 1 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Paper Texture line borders */}
            <div className="w-full h-[165px] sm:h-[185px] border border-dashed border-[#1B3B2B]/25 p-3 sm:p-4 flex flex-col items-center justify-center text-center rounded-t-md shrink-0">
              <Plane size={22} className="text-[#1B3B2B] mb-1 -rotate-45" />
              <p className="uppercase text-[9px] tracking-[0.3em] font-bold text-[#1B3B2B]/70">Boarding Pass</p>
              <h2 className="font-script text-3xl sm:text-4xl text-[#1B3B2B] mt-0.5">{brideName} & {groomName}</h2>
              <p className="font-serif italic text-[11px] text-[#1B3B2B]/80 mt-1">20 September 2026</p>
            </div>
          </motion.div>

          {/* ENVELOPE FRONT BODY (Left, Right, Bottom Pocket Flaps) */}
          <div className="absolute inset-0 z-25 pointer-events-none rounded-md overflow-hidden shadow-md">
            {/* Left flap */}
            <div className="absolute inset-0 bg-[#E8E3D5]" style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}></div>
            {/* Right flap */}
            <div className="absolute inset-0 bg-[#E8E3D5]" style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}></div>
            {/* Bottom flap */}
            <div className="absolute inset-0 bg-[#DFD9C7]" style={{ clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}></div>

            {/* Dashed seam accents */}
            <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 350 240" fill="none">
              <path d="M0 0 L175 120 L350 0" stroke="#1B3B2B" strokeWidth="1" strokeDasharray="3 3"/>
              <path d="M0 240 L175 115 L350 240" stroke="#1B3B2B" strokeWidth="1" strokeDasharray="3 3"/>
            </svg>
          </div>

          {/* WAX SEAL (Fades out when flap opens) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.25 } }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center pointer-events-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] relative flex items-center justify-center overflow-hidden">
                  <img src="/seal.png" alt="Wax Seal" className="w-full h-full object-cover scale-110" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

