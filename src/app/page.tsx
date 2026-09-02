"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plane, MapPin, Heart, Music, CalendarDays, Gift, CreditCard, Copy, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Polaroid from "@/components/ui/Polaroid";
import PhotoStrip from "@/components/ui/PhotoStrip";
import VintagePaperCard from "@/components/ui/VintagePaperCard";
import EnvelopeIntro from "@/components/ui/Envelope";
import CountdownTimer from "@/components/ui/CountdownTimer";

export default function Home() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedState, setCopiedState] = useState<{ [key: string]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedState((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  useEffect(() => {
    if (isCheckedIn && audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime = 173; // 2 menit 53 detik
      audio.volume = 0; // Mulai dari volume 0 (fade in)
      
      audio.play()
        .then(() => {
          setIsPlaying(true);
          
          const targetVolume = 0.3;
          const fadeDuration = 2000;
          const intervalTime = 100;
          const volumeStep = targetVolume / (fadeDuration / intervalTime);
          
          const fadeInterval = setInterval(() => {
            if (audio.volume + volumeStep < targetVolume) {
              audio.volume += volumeStep;
            } else {
              audio.volume = targetVolume;
              clearInterval(fadeInterval);
            }
          }, intervalTime);
        })
        .catch(err => console.log("Auto-play prevented", err));
    }
  }, [isCheckedIn]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.currentTime === 0) {
          audioRef.current.currentTime = 173;
        }
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const photos = [
    "/Foto1.JPG",
    "/Foto2.JPG",
    "/Foto3.JPG",
    "/Foto4.JPG",
    "/Foto5.JPG",
    "/Foto6.JPG",
    "/Foto7.JPG",
    "/Foto8.JPG",
    "/Foto9.JPG"
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <main className="relative min-h-screen bg-[#0D241A] font-sans text-[#1B3B2B] selection:bg-[#1B3B2B] selection:text-[#F4F1EA] overflow-x-hidden">
      {/* Background Jet Image (blurred) */}
      <div className="fixed inset-0 z-0 bg-[#0B1E16]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-[#1B3B2B] opacity-60 mix-blend-multiply"></div>
      </div>

      <AnimatePresence mode="wait">
        {!isCheckedIn ? (
          <EnvelopeIntro 
            onOpen={() => setIsCheckedIn(true)}
            brideName="Silvi"
            groomName="Izul"
          />
        ) : (
          <motion.div
            key="ticket-screen"
            className="relative z-10 py-12 px-4 flex justify-center w-full min-h-screen items-start md:items-center overflow-hidden"
          >
            <motion.div 
              className="w-full max-w-md drop-shadow-2xl flex flex-col mt-10 md:mt-0"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
              {/* TOP TICKET SECTION (CREAM) */}
              <div className="bg-[#F4F1EA] text-[#1B3B2B] rounded-t-xl overflow-hidden relative pb-8 ticket-edge-bottom z-40">
                {/* Perforated side dots */}
                <div className="absolute top-12 -left-3 w-6 h-6 bg-[#1B3B2B] rounded-full"></div>
                <div className="absolute top-12 -right-3 w-6 h-6 bg-[#1B3B2B] rounded-full"></div>
                
                <div className="p-6 md:p-8 pb-4 text-center border-b-2 border-dashed border-[#1B3B2B]/20 mx-4">
                  {/* Changed to Green since Cream bg */}
                  <motion.p initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } } }} className="uppercase text-[10px] tracking-[0.2em] font-bold text-[#1B3B2B] mb-6 opacity-80">Tiket Pernikahan</motion.p>
                  
                  <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.8, type: "spring" } } }} className="flex justify-center mb-6">
                    <div className="w-20 h-20 border border-[#1B3B2B] rounded-full flex items-center justify-center relative shadow-inner bg-[#F4F1EA] overflow-hidden">
                      <Plane size={24} className="text-[#1B3B2B] relative z-10 transform -rotate-45" />
                    </div>
                  </motion.div>

                  <motion.h1 initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 20, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.8, duration: 1.2 } } }} className="font-script text-6xl mb-6 leading-none">Silvi <span className="text-5xl opacity-80 mx-2">&</span> Izul</motion.h1>

                  <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8 } } }} className="mx-auto grid grid-cols-2 text-center bg-[#1B3B2B] text-[#F4F1EA] p-4 rounded-sm text-xs shadow-md">
                    <div className="flex items-center justify-center gap-3">
                      <CalendarDays size={18} className="opacity-50" />
                      <div className="flex flex-col items-start text-left">
                        <p className="opacity-60 text-[9px] uppercase tracking-widest mb-1">Tanggal</p>
                        <p className="font-medium">20 Sept 2026</p>
                      </div>
                    </div>
                    <div className="border-l border-[#F4F1EA]/20 flex items-center justify-center gap-3">
                      <Heart size={18} className="opacity-50" />
                      <div className="flex flex-col items-start text-left">
                        <p className="opacity-60 text-[9px] uppercase tracking-widest mb-1">Tujuan</p>
                        <p className="font-medium">Kebahagiaan</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.0, duration: 0.8 } } }} className="text-center pt-4">
                  <p className="uppercase text-[9px] tracking-widest font-medium opacity-60">Boarding Pass</p>
                </motion.div>
              </div>

              {/* MIDDLE TICKET SECTION 1: MEMPELAI (GREEN) */}
              <div className="bg-[#1B3B2B] text-[#F4F1EA] relative z-30 shadow-xl ticket-edge-bottom pb-10 mt-[-15px] overflow-hidden">
                {/* WOW Animated Cinematic Background + Love Watermark */}
                <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute inset-0 pointer-events-none z-0">
                  {/* Glowing Orbs */}
                  <motion.div animate={{ x: [0, 30, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.9, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -left-[10%] w-[300px] h-[300px] bg-[#F4F1EA]/10 rounded-full blur-[80px]" />
                  <motion.div animate={{ x: [0, -40, 20, 0], y: [0, 30, -30, 0], scale: [1, 0.8, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[40%] -right-[10%] w-[250px] h-[250px] bg-white/5 rounded-full blur-[60px]" />
                  
                  {/* Love Watermark */}
                  <Heart className="absolute top-10 -left-24 text-white opacity-[0.03] w-96 h-96 -rotate-12" strokeWidth={1} />
                  <Heart className="absolute -bottom-20 -right-24 text-white opacity-[0.03] w-96 h-96 rotate-12" strokeWidth={1} />
                </div>

                <div className="absolute top-12 -left-3 w-6 h-6 bg-[#F4F1EA] rounded-full z-20"></div>
                <div className="absolute top-12 -right-3 w-6 h-6 bg-[#F4F1EA] rounded-full z-20"></div>

                <div className="px-8 pt-24 pb-12 text-center border-b border-dashed border-[#F4F1EA]/20 mx-4 relative z-10">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp} className="mb-24 relative">
                    <h2 className="font-serif text-2xl md:text-3xl mb-3 leading-relaxed opacity-90">Kepada Teman & Keluarga!</h2>
                    <p className="text-xs opacity-40 leading-relaxed font-light">Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami.</p>
                  </motion.div>
                  
                  <div className="space-y-12 relative">
                    <motion.div 
                      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} 
                      variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } } }}
                    >
                      <h2 className="font-script text-6xl text-white -mb-1 pt-4">Silvi</h2>
                      <p className="font-serif text-sm opacity-80 italic mt-1">Putri dari Bapak Fulan & Ibu Fulanah</p>
                    </motion.div>
                    
                    <motion.div 
                      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
                      variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3, ease: "easeOut" } } }}
                      className="flex justify-center py-2"
                    >
                      <span className="font-script text-6xl text-white opacity-90">&</span>
                    </motion.div>
                    
                    <motion.div 
                      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
                      variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.6, ease: "easeOut" } } }}
                    >
                      <h2 className="font-script text-6xl text-white -mb-1 pt-4">Izul</h2>
                      <p className="font-serif text-sm opacity-80 italic mt-1">Putra dari Bapak Fulan & Ibu Fulanah</p>
                    </motion.div>
                  </div>
                </div>
                <div className="text-center pt-6 mx-4 relative z-10">
                  <p className="uppercase text-[9px] tracking-widest font-medium opacity-50">The Bride & Groom</p>
                </div>
              </div>

              {/* MIDDLE TICKET SECTION 2: GALLERY/SCRAPBOOK (CREAM) */}
              <div className="bg-[#F4F1EA] text-[#1B3B2B] relative z-20 shadow-xl ticket-edge-bottom pb-8 mt-[-15px]">
                {/* Dedicated Divider Row with Static Holes */}
                <div className="relative w-full pt-10 pb-6 flex items-center justify-center">
                  {/* Left hole */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#1B3B2B] rounded-full -translate-y-1/2"></div>
                  
                  {/* Lines and Text */}
                  <div className="flex-1 border-t border-[#1B3B2B]/20 ml-3"></div>
                  <h3 className="font-serif text-lg px-4 opacity-90">Our Love Story</h3>
                  <div className="flex-1 border-t border-[#1B3B2B]/20 mr-3"></div>
                  
                  {/* Right hole */}
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#1B3B2B] rounded-full -translate-y-1/2"></div>
                </div>

                <div className="px-6 pb-10 text-center border-b border-dashed border-[#1B3B2B]/20 mx-4">

                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                    <div className="relative w-full flex flex-col items-center py-4">
                      {/* Photo Strip Component */}
                      <PhotoStrip photos={photos} />
                    </div>
                  </motion.div>
                </div>
                <div className="text-center pt-4 mx-4">
                  <p className="uppercase text-[9px] tracking-widest font-medium opacity-50">Memories</p>
                </div>
              </div>

              {/* BOTTOM TICKET SECTION (GREEN) */}
              <div className="bg-[#1B3B2B] text-[#F4F1EA] relative rounded-b-xl overflow-hidden z-10 shadow-2xl mt-[-15px]">
                {/* WOW Animated Cinematic Background + Watermark */}
                <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute inset-0 pointer-events-none z-0">
                  {/* Glowing Orbs */}
                  <motion.div animate={{ x: [0, -30, 30, 0], y: [0, 40, -20, 0], scale: [1, 1.3, 0.8, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute bottom-[20%] -left-[10%] w-[350px] h-[350px] bg-[#F4F1EA]/10 rounded-full blur-[90px]" />
                  <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 30, 0], scale: [1, 0.9, 1.2, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] -right-[5%] w-[250px] h-[250px] bg-white/5 rounded-full blur-[70px]" />
                  
                  {/* Travel Watermarks */}
                  <Plane className="absolute top-20 -right-20 text-white opacity-[0.02] w-80 h-80 -rotate-45" strokeWidth={1} />
                  <MapPin className="absolute bottom-10 -left-20 text-white opacity-[0.02] w-80 h-80 rotate-12" strokeWidth={1} />
                </div>

                <div className="absolute top-12 -left-3 w-6 h-6 bg-[#F4F1EA] rounded-full z-20"></div>
                <div className="absolute top-12 -right-3 w-6 h-6 bg-[#F4F1EA] rounded-full z-20"></div>
                
                <div className="p-6 sm:p-8 pt-18 sm:pt-20 space-y-12 relative z-10">
                  
                  {/* Jadwal Acara */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <VintagePaperCard>
                      <h3 className="font-script text-4xl mb-3 text-center text-[#1B3B2B] drop-shadow-sm">Detail Acara</h3>
                      <div className="w-12 h-[1px] bg-[#1B3B2B]/20 mx-auto mb-6"></div>
                      
                      <div className="space-y-8 relative z-10 text-center text-[#1B3B2B]">
                        <div>
                          <h4 className="font-serif tracking-widest uppercase text-sm font-bold mb-2">Akad Nikah</h4>
                          <div className="flex items-center justify-center gap-2 opacity-90 mb-1 text-xs font-medium">
                            Minggu, 20 September 2026
                          </div>
                          <p className="opacity-70 text-xs">Pukul 09.00 WIB - Selesai</p>
                        </div>
                        
                        <div className="w-8 h-[1px] bg-[#1B3B2B]/10 mx-auto"></div>
                        
                        <div>
                          <h4 className="font-serif tracking-widest uppercase text-sm font-bold mb-2">Resepsi</h4>
                          <div className="flex items-center justify-center gap-2 opacity-90 mb-1 text-xs font-medium">
                            Minggu, 20 September 2026
                          </div>
                          <p className="opacity-70 text-xs">Pukul 11.30 WIB - Selesai</p>
                        </div>

                        <div className="w-full pt-6 sm:pt-8 border-t border-[#1B3B2B]/10">
                          <CountdownTimer targetDate="2026-09-20T09:00:00" variant="light" />
                        </div>
                      </div>
                    </VintagePaperCard>
                  </motion.div>

                  {/* Lokasi */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center py-10 sm:py-14 pb-12 sm:pb-16 my-2">
                    <h3 className="font-serif text-2xl mb-3 flex items-center justify-center gap-2"><MapPin size={20} className="text-white"/> Lokasi Acara</h3>
                    <p className="text-sm opacity-90 mb-1 font-medium">Sungegeneng RT 04 / RW 04</p>
                    <p className="text-xs opacity-70 mb-6 leading-relaxed">
                      Kec. Sekaran, Kab. Lamongan, Jawa Timur
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/HomtUCga2LTCkctb6?g_st=ic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 bg-white text-[#1B3B2B] text-xs font-bold rounded-sm hover:bg-opacity-90 transition-all shadow-md"
                    >
                      Buka Google Maps
                    </a>
                  </motion.div>

              {/* MIDDLE TICKET SECTION 3: AMPLOP DIGITAL (CREAM) */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="bg-[#F4F1EA] text-[#1B3B2B] relative z-20 shadow-xl ticket-edge-bottom pb-8 mt-6 sm:mt-8">
                {/* Dedicated Divider Row with Static Holes */}
                <div className="relative w-full pt-10 pb-6 flex items-center justify-center">
                  {/* Left hole */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#1B3B2B] rounded-full -translate-y-1/2"></div>
                  
                  {/* Lines and Text */}
                  <div className="flex-1 border-t border-[#1B3B2B]/20 ml-3"></div>
                  <h3 className="font-serif text-lg px-4 opacity-90 flex items-center gap-2">
                    <Gift size={18} /> Amplop Digital
                  </h3>
                  <div className="flex-1 border-t border-[#1B3B2B]/20 mr-3"></div>
                  
                  {/* Right hole */}
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#1B3B2B] rounded-full -translate-y-1/2"></div>
                </div>

                <div className="px-6 sm:px-8 pb-8 text-center border-b border-dashed border-[#1B3B2B]/20 mx-4">
                  <p className="text-xs opacity-75 mb-6 leading-relaxed font-light text-[#1B3B2B]">
                    Doa restu Anda merupakan karunia terbesar bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui:
                  </p>

                  <div className="space-y-4 text-left">
                    {/* Bank Mandiri - Groom */}
                    <div className="bg-white text-[#1B3B2B] p-4.5 sm:p-6 rounded-2xl shadow-sm border border-[#1B3B2B]/20 relative overflow-hidden transition-all hover:shadow-md">
                      <div className="flex justify-between items-center mb-3 pb-2.5 border-b border-dashed border-[#1B3B2B]/20">
                        <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#1B3B2B] flex items-center gap-2">
                          <CreditCard size={15} className="text-[#1B3B2B]" /> Bank Mandiri
                        </span>
                        <span className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 border border-[#1B3B2B]/20 rounded-full font-bold text-[#1B3B2B]/75 bg-[#1B3B2B]/5">
                          GIFT PASS
                        </span>
                      </div>

                      <div className="my-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] font-serif font-bold text-[#1B3B2B]/60 mb-1">Nomor Rekening</p>
                        <p className="font-sans text-xl sm:text-2xl font-bold tracking-tight sm:tracking-wider text-[#1B3B2B] my-1">1420025622803</p>
                        <p className="font-serif italic text-xs text-[#1B3B2B]/80 mt-1">a.n ZULKARNAIN AJI PUTRA</p>
                      </div>

                      <button
                        onClick={() => handleCopy("1420025622803", "mandiri")}
                        className="w-full py-2.5 px-4 bg-[#1B3B2B] text-[#F4F1EA] text-xs font-semibold rounded-xl tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1B3B2B]/90 transition-all active:scale-[0.98] shadow-sm cursor-pointer mt-4"
                      >
                        {copiedState["mandiri"] ? (
                          <>
                            <Check size={15} className="text-emerald-400" />
                            <span>Tersalin ke Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={15} />
                            <span>Salin No. Rekening</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Bank BCA - Bride */}
                    <div className="bg-white text-[#1B3B2B] p-4.5 sm:p-6 rounded-2xl shadow-sm border border-[#1B3B2B]/20 relative overflow-hidden transition-all hover:shadow-md">
                      <div className="flex justify-between items-center mb-3 pb-2.5 border-b border-dashed border-[#1B3B2B]/20">
                        <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#1B3B2B] flex items-center gap-2">
                          <CreditCard size={15} className="text-[#1B3B2B]" /> Bank BCA
                        </span>
                        <span className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 border border-[#1B3B2B]/20 rounded-full font-bold text-[#1B3B2B]/75 bg-[#1B3B2B]/5">
                          GIFT PASS
                        </span>
                      </div>

                      <div className="my-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] font-serif font-bold text-[#1B3B2B]/60 mb-1">Nomor Rekening</p>
                        <p className="font-sans text-xl sm:text-2xl font-bold tracking-tight sm:tracking-wider text-[#1B3B2B] my-1">6170669612</p>
                        <p className="font-serif italic text-xs text-[#1B3B2B]/80 mt-1">a.n Silvi Ana</p>
                      </div>

                      <button
                        onClick={() => handleCopy("6170669612", "bca")}
                        className="w-full py-2.5 px-4 bg-[#1B3B2B] text-[#F4F1EA] text-xs font-semibold rounded-xl tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1B3B2B]/90 transition-all active:scale-[0.98] shadow-sm cursor-pointer mt-4"
                      >
                        {copiedState["bca"] ? (
                          <>
                            <Check size={15} className="text-emerald-400" />
                            <span>Tersalin ke Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={15} />
                            <span>Salin No. Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-4 mx-4">
                  <p className="uppercase text-[9px] tracking-widest font-medium opacity-50">Digital Gift</p>
                </div>
              </motion.div>

                  {/* Ucapan Penutup */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center px-4">
                    <p className="font-serif text-xs opacity-70 leading-relaxed italic mb-6">
                      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."<br/>(QS. Ar-Rum: 21)
                    </p>
                  </motion.div>

                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="border-t border-dashed border-[#F4F1EA]/20 pt-8 text-center pb-2">
                    <Plane size={20} className="mx-auto text-white mb-3" />
                    <h1 className="font-script text-4xl mb-2 text-white">Terima Kasih</h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60">Sampai Jumpa Nanti!</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MUSIC CONTROLS */}
      <audio 
        ref={audioRef} 
        src="/audio/music.mp3" 
        onEnded={() => setIsPlaying(false)} 
      />
      
      {isCheckedIn && (
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white text-[#1B3B2B] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all hover:scale-110"
        >
          {isPlaying ? <Music size={20} className="animate-pulse" /> : <Music size={20} className="opacity-70" />}
        </button>
      )}
    </main>
  );
}
