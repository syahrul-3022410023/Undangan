"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StickerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotation?: number;
}

export default function Sticker({ children, className = "", delay = 0, rotation = 0 }: StickerProps) {
  return (
    <motion.div
      className={`absolute z-20 cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: rotation - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
      whileHover={{ scale: 1.15, rotate: rotation + 10 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -8, 0],
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      transition={{
        y: {
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="bg-white px-3 py-1 rounded-sm shadow-md border border-gray-100 font-handwriting text-xl text-[#8b7355] transform">
        {children}
      </div>
    </motion.div>
  );
}
