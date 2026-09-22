import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

export const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: "easeOut" }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const PageEffects = () => {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[70] h-1 bg-transparent"><div className="h-full origin-left bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
      <motion.button initial={false} animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 12, pointerEvents: showTop ? "auto" : "none" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1 hover:bg-orange-600"><ArrowUp size={18} /></motion.button>
      <div className="pointer-events-none fixed bottom-6 left-5 z-40 hidden items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-700 shadow-lg backdrop-blur sm:flex"><Sparkles size={13} className="text-orange-500" /> Fresh picks daily</div>
    </>
  );
};
