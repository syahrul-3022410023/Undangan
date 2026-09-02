"use client";

import { useState, useEffect } from "react";
import { CalendarPlus } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  variant?: "navy" | "light";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({
  targetDate = "2026-09-20T09:00:00",
  className = "",
  variant = "navy"
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isNavy = variant === "navy";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Silvi+%26+Izul&dates=20260920T020000Z/20260920T060000Z&details=Undangan+Pernikahan+Silvi+%26+Izul&location=Sungegeneng+RT+04+/+RW+04,+Kec.+Sekaran,+Kab.+Lamongan,+Jawa+Timur`;

  if (!isMounted) {
    return (
      <div className={`flex gap-3 justify-center ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-12 h-12 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Title matching Resepsi / Akad Nikah font styling 1:1 */}
      <h4 className={`font-serif tracking-widest uppercase text-xs sm:text-sm font-bold mb-3.5 ${isNavy ? "text-[#F4F1EA]" : "text-[#1B3B2B]"}`}>
        Hitung Mundur Hari Bahagia
      </h4>

      {/* Digits Row - Mepet Kanan Kiri (Compact Gap) */}
      <div className="flex items-start justify-center gap-1.5 sm:gap-3 mb-4">
        {[
          { label: "HARI", value: timeLeft.days },
          { label: "JAM", value: timeLeft.hours },
          { label: "MENIT", value: timeLeft.minutes },
          { label: "DETIK", value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-1.5 sm:gap-3">
            <div className="flex flex-col items-center min-w-[32px] sm:min-w-[40px]">
              <span className={`font-serif text-3xl sm:text-4xl font-normal leading-none lining-nums tabular-nums ${isNavy ? "text-[#F4F1EA]" : "text-[#1B3B2B]"}`}>
                {String(item.value).padStart(2, "0")}
              </span>
              <span className={`font-serif text-[7.5px] sm:text-[9px] mt-2 uppercase tracking-[0.18em] font-semibold ${isNavy ? "text-[#F4F1EA]/70" : "text-[#1B3B2B]/70"}`}>
                {item.label}
              </span>
            </div>
            {idx < 3 && (
              <span className={`font-serif text-xl sm:text-2xl font-light leading-none pt-0.5 opacity-60 ${isNavy ? "text-[#F4F1EA]" : "text-[#1B3B2B]"}`}>:</span>
            )}
          </div>
        ))}
      </div>

      {/* Save the Date Clean Pill Button */}
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-serif text-[11px] tracking-wider transition-all cursor-pointer ${
          isNavy
            ? "bg-white/15 hover:bg-white/25 text-[#F4F1EA] border border-white/20"
            : "border border-[#1B3B2B]/30 text-[#1B3B2B] hover:bg-[#1B3B2B] hover:text-[#F4F1EA]"
        }`}
      >
        <CalendarPlus size={12} />
        <span>Save the Date</span>
      </a>
    </div>
  );
}
