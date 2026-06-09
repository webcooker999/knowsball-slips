import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

interface PayoutCounterProps {
  value: number; // calculated as stake * product of accepted odds
  stake: number;
  onStakeChange: (stake: number) => void;
}

export function PayoutCounter({ value, stake, onStakeChange }: PayoutCounterProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
    mass: 0.8,
  });

  // Target value updates trigger the spring animation roll up
  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (textRef.current) {
        textRef.current.textContent = `$${latest.toFixed(2)}`;
      }
    });
  }, [springValue]);

  return (
    <div className="flex flex-col items-center select-none py-4 z-10 shrink-0">
      <span className="text-[10px] text-[#00e701] font-bold tracking-[0.25em] uppercase">
        POTENTIAL PAYOUT
      </span>
      <div className="text-4xl md:text-5xl font-black text-[#00e701] font-mono tracking-wider mt-1 filter drop-shadow-[0_0_12px_rgba(0,231,1,0.4)]">
        <span ref={textRef}>$0.00</span>
      </div>

      {/* Interactive Custom Stake Input (Clean static box with a border focus transition) */}
      <div className="flex items-center gap-2.5 mt-2.5 border border-slate-700 bg-slate-900/80 rounded-xl px-4 py-1.5 focus-within:border-[#00e701] focus-within:shadow-[0_0_15px_rgba(0,231,1,0.12)] transition-all pointer-events-auto cursor-text">
        <span className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase">
          BET AMOUNT:
        </span>
        <div className="flex items-center font-mono">
          <span className="text-sm font-black text-[#00e701]">$</span>
          <input
            type="number"
            min="1"
            value={stake}
            onChange={(e) => {
              const val = Number(e.target.value);
              onStakeChange(val >= 1 ? val : 1);
            }}
            className="w-16 bg-transparent text-sm font-black text-white outline-none border-none pl-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0 font-mono"
          />
        </div>

        {/* Subtle pulsing edit pencil indicator */}
        <motion.svg 
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-3.5 h-3.5 text-slate-400 ml-0.5 shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </motion.svg>
      </div>
    </div>
  );
}

export function SlimHeader({ picksCount }: { picksCount: number }) {
  return (
    <header className="w-full bg-[#0f172a]/95 border-b border-slate-800/80 backdrop-blur-md px-6 py-3 flex justify-between items-center select-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] z-40 shrink-0">
      <div className="flex flex-col items-start gap-0.5">
        <img src="/logo.png" alt="Knowsball Logo" className="h-10 w-auto object-contain" />
        <span className="text-[7.5px] text-slate-500 font-black tracking-[0.18em] uppercase pl-0.5">
          WORLD CUP 2026 EDITION
        </span>
      </div>

      <div className="flex items-center gap-2 bg-[#1a2c38] px-3 py-1 rounded-full border border-slate-700/60 shadow-inner">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e701] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e701]"></span>
        </div>
        <span className="text-[10px] text-slate-300 font-bold tracking-widest font-mono">
          {picksCount}/10 LOCKED
        </span>
      </div>
    </header>
  );
}
