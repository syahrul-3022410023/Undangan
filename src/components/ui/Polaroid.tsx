import { ReactNode } from "react";
import { motion } from "framer-motion";
import Tape from "@/components/ui/Tape";

interface PolaroidProps {
  imageSrc?: string;
  caption?: string;
  rotation?: number;
  className?: string;
  children?: ReactNode;
}

export default function Polaroid({ imageSrc, caption, rotation = 0, className = "", children }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`relative bg-white p-3 pb-12 sm:p-4 sm:pb-16 shadow-lg border border-gray-200 inline-flex flex-col items-center ${className}`}
    >
      {/* Tape on top */}
      <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 z-10 rotate-[-3deg]" />

      {/* Image or Content */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden border border-gray-100">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={caption || "Polaroid photo"} className="w-full h-full object-cover filter contrast-110 sepia-[.2]" />
        ) : (
          children
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-2 sm:bottom-4 left-0 w-full text-center px-2">
          <p className="font-handwriting text-2xl sm:text-3xl text-gray-700 leading-none">{caption}</p>
        </div>
      )}
    </motion.div>
  );
}
