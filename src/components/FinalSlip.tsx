import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";
import type { PropBet } from "../data/bets";

// Helper to resolve bet type icon for the receipt slip
function getBetIcon(market: string) {
  const m = market.toLowerCase();
  if (m.includes("red card") || m.includes("sent off")) return "🟥";
  if (m.includes("card") || m.includes("carded") || m.includes("booking") || m.includes("cards")) return "🟨";
  if (m.includes("corner") || m.includes("corners")) return "🚩";
  if (m.includes("both teams to score") || m.includes("btts")) return "🤝";
  if (m.includes("win") || m.includes("draw") || m.includes("winner")) return "🏆";
  if (m.includes("score") || m.includes("goalscorer") || m.includes("header")) return "⚽";
  if (m.includes("goals in match") || m.includes("goals")) return "⚽";
  if (m.includes("shot") || m.includes("shots")) return "🎯";
  if (m.includes("pass") || m.includes("passes")) return "🔄";
  if (m.includes("assist")) return "👟";
  return "⚽";
}

// Helper to calculate combined American odds from decimal multiplier
function getCombinedAmericanOdds(decimalOdds: number): string {
  if (decimalOdds >= 2.0) {
    return `+${Math.round((decimalOdds - 1) * 100)}`;
  } else if (decimalOdds > 1.0) {
    return `-${Math.round(100 / (decimalOdds - 1))}`;
  }
  return "+0";
}

interface FinalSlipProps {
  acceptedBets: PropBet[];
  multiplier: number;
  onReset: () => void;
  stake: number;
  onStakeChange?: (stake: number) => void;
  onRemoveBet?: (betId: string) => void;
  onContinueDrafting?: () => void;
}

export function FinalSlip({
  acceptedBets,
  multiplier,
  onReset,
  stake,
  onStakeChange,
  onRemoveBet,
  onContinueDrafting
}: FinalSlipProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);

  // Trigger continuous celebratory slot machine confetti bursts on mount!
  useEffect(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);
      // Confetti shooting from the bottom corners
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Export receipt element to PNG and trigger Share API (fallback: direct download)
  const handleShare = async () => {
    if (!receiptRef.current) return;
    setSharing(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#1a2c38",
        scale: 2, // Double resolution for crisp text renders
        logging: false,
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setSharing(false);
          return;
        }

        const file = new File([blob], "godslip.png", { type: "image/png" });
        const shareText = `Lock in your parlay at knowsball.site! ⚽🔥 Combined odds: ${multiplier.toFixed(2)}x.`;

        // Native share interface if available (iOS / Android Safari/Chrome)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: "My Knowsball Slip",
              text: shareText,
            });
          } catch (shareErr) {
            console.log("User canceled share, or sharing failed.", shareErr);
          }
        } else {
          // Fallback: download image directly and copy text with url to clipboard
          try {
            await navigator.clipboard.writeText(shareText);
          } catch (clipErr) {
            console.log("Failed to copy link to clipboard", clipErr);
          }
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "knowsball-godslip.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        setSharing(false);
      }, "image/png");
    } catch (err) {
      console.error("Failed to generate image", err);
      setSharing(false);
    }
  };

  return (
    <div className="w-full max-w-sm flex-grow flex flex-col justify-start items-center pt-6 pb-44 px-4 overflow-y-auto">

      {/* Visual Header Confirmation */}
      <div className="text-center mb-5 mt-4">
        <div className="w-12 h-12 rounded-full bg-[#00e701]/10 border border-[#00e701] flex items-center justify-center mx-auto mb-2.5">
          <svg className="w-6 h-6 text-[#00e701]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight uppercase">
          BALLER SLIP LOCK-IN
        </h2>
        <p className="text-2xs text-[#00e701] font-bold tracking-[0.2em] uppercase mt-0.5">
          {acceptedBets.length === 1 ? "SINGLE BET COMPLETED" : `${acceptedBets.length}-LEG PARLAY COMPLETED`}
        </p>
      </div>

      {/* Visually Stunning Receipt Card to Export */}
      <div
        ref={receiptRef}
        className="w-full bg-[#1a2c38] border-2 border-slate-700/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4"
      >
        {/* Receipt header overlay */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#00e701] font-black tracking-widest uppercase">
              KNOWSBALL TICKET
            </span>
            <span className="text-[7.5px] text-slate-500 font-extrabold tracking-wider uppercase mt-0.5">
              SLIP ID: #{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>
          {/* Interactive Stake Input in Receipt Header */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-750 px-3 py-1 rounded-lg focus-within:border-[#00e701]/60 focus-within:shadow-[0_0_12px_rgba(0,231,1,0.1)] transition-all cursor-text pointer-events-auto">
            <span className="text-[7.5px] text-slate-500 font-extrabold tracking-widest uppercase">
              STAKE:
            </span>
            <div className="flex items-center font-mono">
              <span className="text-[10px] font-black text-[#00e701]">$</span>
              <input
                type="number"
                min="1"
                value={stake}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onStakeChange?.(val >= 1 ? val : 1);
                }}
                className="w-12 bg-transparent text-[10px] font-black text-white outline-none border-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0"
              />
            </div>
            {/* Subtle pulsing edit pencil indicator */}
            <motion.svg
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 text-slate-500 ml-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </motion.svg>
          </div>
        </div>

        {/* Selected Bets List */}
        <div className="flex flex-col gap-3.5 my-2">
          {acceptedBets.map((bet, idx) => {
            const icon = getBetIcon(bet.market);
            const isRedCardBet = bet.market.toLowerCase().includes("red card") || bet.market.toLowerCase().includes("sent off");
            const isYellowCardBet = !isRedCardBet && (bet.market.toLowerCase().includes("card") || bet.market.toLowerCase().includes("carded") || bet.market.toLowerCase().includes("booking") || bet.market.toLowerCase().includes("cards"));
            const isWinnerBet = !isRedCardBet && !isYellowCardBet && !bet.playerHeadshot && (
              bet.market.toLowerCase().includes("to win") ||
              bet.market.toLowerCase().includes("wins") ||
              bet.market.toLowerCase().includes("winner")
            );
            const isCornerBet = !isRedCardBet && !isYellowCardBet && !isWinnerBet && (
              bet.market.toLowerCase().includes("corner") ||
              bet.market.toLowerCase().includes("corners")
            );
            const isGoalsBet = !isRedCardBet && !isYellowCardBet && !isWinnerBet && !isCornerBet && !bet.playerHeadshot && (
              bet.market.toLowerCase().includes("goals") ||
              bet.market.toLowerCase().includes("goal") ||
              bet.market.toLowerCase().includes("score") ||
              bet.market.toLowerCase().includes("btts") ||
              /\d+\.\d+\+?/.test(bet.market)
            );
            const displayImage = isRedCardBet
              ? "/red_card.png"
              : (isYellowCardBet
                ? "/yellow_card.png"
                : (isWinnerBet
                  ? "/winner.png"
                  : (isGoalsBet
                    ? "/soccer_ball.png"
                    : (isCornerBet ? "/corner_flag.png" : bet.playerHeadshot))));

            return (
              <div key={bet.id} className="flex justify-between items-center text-left relative py-1 pl-3">
                <div className="flex flex-col max-w-[70%]">
                  <span className="text-[8.5px] text-slate-500 font-black tracking-wider uppercase truncate">
                    {idx + 1}. {bet.match}
                  </span>
                  <p className="text-xs font-extrabold text-white leading-snug mt-0.5 flex items-center gap-1.5">
                    <span className="text-xs shrink-0 select-none">{icon}</span>
                    <span>{bet.market}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 z-20">
                  {displayImage && (
                    <img
                      src={displayImage}
                      alt=""
                      className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700/60 object-contain shadow-md shrink-0 select-none pointer-events-none"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  )}
                  <span className="text-[9.5px] font-black text-[#00e701] font-mono">
                    {bet.oddsAmerican}
                  </span>
                  {onRemoveBet && (
                    <button
                      onClick={() => onRemoveBet(bet.id)}
                      className="w-5 h-5 rounded bg-slate-800/80 border border-slate-700/60 hover:bg-red-950/60 hover:border-red-500/40 text-slate-450 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer text-[10px] ml-1 select-none z-30"
                      title="Remove pick"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="absolute left-0 top-1.5 w-1 h-8 bg-[#00e701]/40 rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Receipt Footer Calculations - JACKPOT STYLE */}
        <div className="border-t border-slate-800/80 pt-4 mt-2 relative">
          
          {/* Soccer balls, trophies, and money emojis rising from the payout */}
          {[...Array(10)].map((_, i) => {
            const emojis = ["🏆", "⚽", "💵", "⚽", "💰", "⚽", "💵", "🏆", "💸", "⚽"];
            const emoji = emojis[i % emojis.length];
            const isSoccerBall = emoji === "⚽";
            const leftPos = [15, 75, 45, 35, 60, 85, 25, 65, 50, 92][i % 10];
            const delay = i * 0.28;
            const duration = 2.0 + (i % 3) * 0.3;
            
            return (
              <motion.div
                key={i}
                className="absolute z-20 pointer-events-none select-none text-[15px]"
                initial={{ 
                  opacity: 0, 
                  scale: 0.3,
                  rotate: 0,
                  x: 0,
                  y: 10
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.3, 1.2, 1.0, 0],
                  rotate: isSoccerBall ? [0, 180, 360, 540, 720] : [-15, 15, -15, 15, 0],
                  x: i % 2 === 0 ? [0, -8, -20, -35] : [0, 8, 20, 35],
                  y: [10, -25, -75, -130],
                }}
                transition={{ 
                  duration: duration, 
                  repeat: Infinity, 
                  delay: delay,
                  ease: "easeOut"
                }}
                style={{
                  top: "0px",
                  left: `${leftPos}%`,
                }}
              >
                {emoji}
              </motion.div>
            );
          })}

          <div className="relative z-10 overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a2710] to-slate-950 border-2 border-[#00e701] rounded-xl p-4 shadow-[0_0_25px_rgba(0,231,1,0.25)]">
            
            {/* Blinking/Glowing border indicator overlay */}
            <motion.div 
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#00e701]/10 pointer-events-none" 
            />

            {/* Glowing spot lights */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00e701]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase flex items-center gap-1">
                  <span className="animate-bounce">🎰</span> PARLAY MULTIPLIER
                </span>
                <span className="text-[9px] font-extrabold text-[#00e701] tracking-wider font-mono mt-0.5">
                  {getCombinedAmericanOdds(multiplier)} AMERICAN ODDS
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded bg-[#00e701]/10 border border-[#00e701]/30 text-xs font-black text-[#00e701] font-mono shadow-[0_0_10px_rgba(0,231,1,0.2)]">
                  {multiplier.toFixed(2)}x
                </span>
              </div>
            </div>

            <div className="border-t border-[#00e701]/20 my-3" />

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-amber-400 tracking-widest uppercase flex items-center gap-1 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]">
                  <span className="animate-pulse">🔥</span> JACKPOT PAYOUT
                </span>
                <span className="text-[8px] font-extrabold text-slate-400 tracking-wider font-mono mt-0.5">
                  STAKE: ${stake.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <motion.span 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00e701] via-yellow-300 to-amber-300 font-mono tracking-tight drop-shadow-[0_0_12px_rgba(0,231,1,0.4)]"
                >
                  ${(stake * multiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </motion.span>
              </div>
            </div>

            {/* Retro animated soccer/trophy winner badge */}
            <div className="absolute top-1.5 right-2.5 flex items-center gap-1 select-none">
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="text-[9px]"
              >
                ⚽
              </motion.span>
              <span className="text-[7px] text-[#00e701] font-black tracking-widest uppercase">
                WINNER
              </span>
              <motion.span 
                animate={{ y: [0, -3, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-[9px]"
              >
                🏆
              </motion.span>
            </div>
          </div>
        </div>

        {/* Dynamic barcode background decoration */}
        <div className="w-full h-8 opacity-25 mt-1 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_6px)]" />
      </div>

      {/* Share and Restart Controls */}
      <div className="w-full flex flex-col gap-2 mt-4 pointer-events-auto">
        <button
          onClick={handleShare}
          disabled={sharing}
          className="w-full py-3 px-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-600 font-bold text-xs text-white uppercase tracking-wider transition-colors active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l4.636-2.318m0 4.636L8.684 13.258m8.316-2.516a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {sharing ? "GENERATING..." : "SHARE TO GROUP CHAT"}
        </button>

        <div className="w-full flex gap-3">
          {acceptedBets.length < 10 && onContinueDrafting && (
            <button
              onClick={onContinueDrafting}
              className="flex-grow py-3 px-4 rounded-xl border border-[#00e701]/30 bg-[#00e701]/10 hover:bg-[#00e701]/25 text-[#00e701] font-black text-xs uppercase tracking-wider transition-colors active:scale-98 cursor-pointer"
            >
              ADD MORE PICKS
            </button>
          )}
          <button
            onClick={onReset}
            className={`${acceptedBets.length < 10 && onContinueDrafting ? 'flex-grow' : 'w-full'} py-3 px-4 rounded-xl border border-red-500/30 bg-red-950/20 hover:bg-red-950/40 text-red-500 font-black text-xs uppercase tracking-wider transition-colors active:scale-98 cursor-pointer`}
          >
            RE-DRAFT
          </button>
        </div>
      </div>

      {/* Massive Pulsing Casino Play Affiliate Call to Action (Fixed bottom) */}
      <div className="fixed bottom-6 left-0 right-0 z-30 px-4 pointer-events-auto max-w-sm mx-auto">
        <a
          href="https://stake.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="py-4 px-6 rounded-2xl neon-glow-btn text-black font-black text-xs uppercase tracking-widest cursor-pointer shadow-[0_0_25px_rgba(0,231,1,0.5)]"
          >
            PLAY THIS SLIP FOR REAL. CLAIM $200 DEPOSIT MATCH ➡️
          </motion.div>
        </a>
      </div>

    </div>
  );
}
