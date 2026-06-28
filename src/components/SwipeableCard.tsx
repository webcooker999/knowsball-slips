import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import type { PropBet } from "../data/bets";

export interface ForceSwipeInfo {
  direction: "left" | "right";
  cardId: string;
}

interface SwipeableCardProps {
  bet: PropBet;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  forceSwipe?: ForceSwipeInfo | null;
  onForceSwipeComplete?: () => void;
  isBackground?: boolean;
}

// Helper to determine the prop bet type and corresponding icon/badge styles
export function getBetIcon(market: string) {
  const m = market.toLowerCase();
  if (m.includes("red card") || m.includes("sent off")) {
    return { icon: "🟥", label: "RED CARD", color: "bg-red-500/10 text-red-500 border-red-500/30" };
  }
  if (m.includes("card") || m.includes("carded") || m.includes("booking") || m.includes("cards")) {
    return { icon: "🟨", label: "CARD", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" };
  }
  if (m.includes("corner") || m.includes("corners")) {
    return { icon: "🚩", label: "CORNERS", color: "bg-teal-500/10 text-teal-400 border-teal-500/30" };
  }
  if (m.includes("both teams to score") || m.includes("btts")) {
    return { icon: "🤝", label: "BTTS", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" };
  }
  if (m.includes("score") || m.includes("goalscorer") || m.includes("header")) {
    return { icon: "⚽", label: "GOAL", color: "bg-[#00e701]/10 text-[#00e701] border-[#00e701]/30" };
  }
  if (m.includes("goals in match") || m.includes("goals")) {
    return { icon: "⚽", label: "GOALS", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
  }
  if (m.includes("win") || m.includes("draw") || m.includes("winner")) {
    return { icon: "🏆", label: "MATCH", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
  }
  if (m.includes("shot") || m.includes("shots")) {
    return { icon: "🎯", label: "SHOTS", color: "bg-blue-500/10 text-blue-500 border-blue-500/30" };
  }
  if (m.includes("pass") || m.includes("passes")) {
    return { icon: "🔄", label: "PASSES", color: "bg-purple-500/10 text-purple-500 border-purple-500/30" };
  }
  if (m.includes("assist")) {
    return { icon: "👟", label: "ASSIST", color: "bg-orange-500/10 text-orange-500 border-orange-500/30" };
  }
  return { icon: "⚽", label: "PROP", color: "bg-slate-800 text-slate-400 border-slate-700" };
}

export function SwipeableCard({
  bet,
  onSwipeRight,
  onSwipeLeft,
  forceSwipe,
  onForceSwipeComplete,
  isBackground = false,
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic transforms based on horizontal drag offset
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-300, -200, 0, 200, 300], [0.5, 0.9, 1, 0.9, 0.5]);

  // Interpolate border color: Red (Left), Slate (Center), Green (Right)
  const borderGlow = useTransform(
    x,
    [-120, 0, 120],
    ["rgba(239, 68, 68, 1)", "rgba(51, 65, 85, 0.8)", "rgba(0, 231, 1, 1)"]
  );

  // Interpolate drop shadow glow
  const boxGlow = useTransform(
    x,
    [-120, 0, 120],
    [
      "0 0 30px rgba(239, 68, 68, 0.45)",
      "0 15px 35px rgba(0, 0, 0, 0.55)",
      "0 0 35px rgba(0, 231, 1, 0.5)",
    ]
  );

  // Opacities for Tinder-style badges
  const lockBadgeOpacity = useTransform(x, [15, 90], [0, 1]);
  const skipBadgeOpacity = useTransform(x, [-90, -15], [1, 0]);

  // Handle external manual swipes (button clicks)
  useEffect(() => {
    if (!forceSwipe || isBackground || forceSwipe.cardId !== bet.id) return;

    if (forceSwipe.direction === "right") {
      animate(x, 500, { duration: 0.25 }).then(() => {
        onSwipeRight?.();
        onForceSwipeComplete?.();
      });
      animate(y, 40, { duration: 0.25 });
    } else if (forceSwipe.direction === "left") {
      animate(x, -500, { duration: 0.25 }).then(() => {
        onSwipeLeft?.();
        onForceSwipeComplete?.();
      });
      animate(y, 40, { duration: 0.25 });
    }
  }, [forceSwipe, isBackground, bet.id]);

  // Countdown timer and live status state
  const [timeStatus, setTimeStatus] = useState<string>("");
  const [statusBadge, setStatusBadge] = useState<{ label: string; style: string } | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const kickoff = new Date(bet.kickoffTime);
      const diffMs = kickoff.getTime() - now.getTime();

      if (diffMs > 0) {
        // Upcoming match
        const totalSeconds = Math.floor(diffMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (hours < 24) {
          setTimeStatus(`Starts in ${hours > 0 ? `${hours}h ` : ""}${minutes}m`);
          setStatusBadge({
            label: "UPCOMING",
            style: "bg-blue-500/10 text-blue-400 border-blue-500/25"
          });
        } else {
          const timeStr = kickoff.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
          setTimeStatus(`Starts at ${timeStr}`);
          setStatusBadge({
            label: "SCHEDULED",
            style: "bg-slate-800 text-slate-400 border-slate-700/50"
          });
        }
      } else if (diffMs <= 0 && diffMs > -120 * 60 * 1000) {
        // Live (first 2 hours after kickoff)
        setTimeStatus("Live in progress");
        setStatusBadge({
          label: "LIVE",
          style: "bg-red-500/15 text-red-500 border-red-500/30 animate-pulse font-black"
        });
      } else {
        // Match over
        setTimeStatus("Match finished");
        setStatusBadge({
          label: "FINISHED",
          style: "bg-slate-900 text-slate-600 border-slate-800/80"
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 15000); // Update every 15 seconds
    return () => clearInterval(interval);
  }, [bet.kickoffTime]);

  const isRedCardBet = bet.market.toLowerCase().includes("red card") || bet.market.toLowerCase().includes("sent off");
  const isYellowCardBet = !isRedCardBet && (bet.market.toLowerCase().includes("card") || bet.market.toLowerCase().includes("carded") || bet.market.toLowerCase().includes("booking") || bet.market.toLowerCase().includes("cards"));
  const isCardBet = isRedCardBet || isYellowCardBet;
  const isWinnerBet = !isCardBet && !bet.playerHeadshot && (
    bet.market.toLowerCase().includes("to win") ||
    bet.market.toLowerCase().includes("wins") ||
    bet.market.toLowerCase().includes("winner")
  );
  const isCornerBet = !isCardBet && !isWinnerBet && (
    bet.market.toLowerCase().includes("corner") || 
    bet.market.toLowerCase().includes("corners")
  );
  const isGoalsBet = !isCardBet && !isWinnerBet && !isCornerBet && !bet.playerHeadshot && (
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

  const typeInfo = getBetIcon(bet.market);

  const dateObj = new Date(bet.date + "T00:00:00");
  const formattedDate = `${dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()} ${dateObj.getDate()} • ROUND OF 32`;

  // Render a simpler static layout for the background card
  if (isBackground) {
    return (
      <div className="absolute w-full h-full bg-[#1a2c38]/90 border-[3px] border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between select-none overflow-hidden text-left opacity-60 scale-[0.96] translate-y-3.5 blur-[0.5px]">
        {/* Match Header / Odds Badge */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-650 font-extrabold tracking-widest uppercase">
                {formattedDate}
              </span>
              {statusBadge && (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border tracking-wider uppercase scale-90 origin-left opacity-60 ${statusBadge.style}`}>
                  {statusBadge.label}
                </span>
              )}
            </div>
            <span className="text-[9px] text-slate-600 font-semibold mt-0.5">
              {timeStatus}
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center -space-x-1 shrink-0">
                <img src={bet.teamFlagLeft} className="w-5 h-3.5 object-cover rounded-sm border border-slate-900" alt="" />
                <img src={bet.teamFlagRight} className="w-5 h-3.5 object-cover rounded-sm border border-slate-900" alt="" />
              </div>
              <span className="text-xs font-black text-slate-400 tracking-tight">{bet.match}</span>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-xl px-3 py-1">
            <span className="text-xs font-black text-slate-400 font-mono">{bet.oddsAmerican}</span>
          </div>
        </div>

        {/* Player headshot or yellow/red card (faded) */}
        {displayImage && (
          <img
            src={displayImage}
            alt=""
            className={`absolute pointer-events-none select-none opacity-25 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)] ${
              isCardBet
                ? "bottom-[-16px] right-[-16px] w-56 h-56 object-contain"
                : "bottom-8 right-1 w-32 h-32 object-contain"
            }`}
          />
        )}

        {/* Market Selection */}
        <div className="my-auto py-4 z-10 relative max-w-[70%] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500 font-bold tracking-[0.25em] uppercase">SELECTION</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-400 leading-snug tracking-tight">{bet.market}</h2>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center bg-slate-950/40 rounded-xl px-4 py-2 border border-slate-900/40">
          <span className="text-[9px] font-extrabold text-slate-600 tracking-wider">DECIMAL VALUE</span>
          <span className="text-xs font-black text-slate-500 font-mono">{bet.oddsDecimal.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  // Active draggable card
  return (
    <motion.div
      style={{ x, y, rotate, opacity, borderColor: borderGlow, boxShadow: boxGlow }}
      drag={true}
      dragConstraints={{ left: -600, right: 600, top: -600, bottom: 600 }}
      dragElastic={0.65}
      onDragEnd={(_, info) => {
        const swipeThreshold = 100;
        const velocityThreshold = 350;

        if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
          // Swipe Right (Accept)
          animate(x, 500, { duration: 0.2 }).then(() => {
            onSwipeRight?.();
          });
          animate(y, info.offset.y + info.velocity.y * 0.1, { duration: 0.2 });
        } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
          // Swipe Left (Reject)
          animate(x, -500, { duration: 0.2 }).then(() => {
            onSwipeLeft?.();
          });
          animate(y, info.offset.y + info.velocity.y * 0.1, { duration: 0.2 });
        } else {
          // Snap back
          animate(x, 0, { type: "spring", stiffness: 350, damping: 22 });
          animate(y, 0, { type: "spring", stiffness: 350, damping: 22 });
        }
      }}
      whileDrag={{ scale: 1.02 }}
      className="absolute w-full h-full bg-[#1a2c38] border-[3px] rounded-2xl p-6 flex flex-col justify-between select-none overflow-hidden text-left cursor-grab active:cursor-grabbing pointer-events-auto touch-none z-20"
    >
      {/* Top glowing decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00e701]/80 to-transparent opacity-80" />

      {/* Tinder Overlays */}
      <motion.div
        style={{ opacity: lockBadgeOpacity }}
        className="absolute top-6 left-6 border-[3px] border-[#00e701] text-[#00e701] text-sm font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-lg -rotate-12 pointer-events-none z-30 shadow-[0_0_15px_rgba(0,231,1,0.2)] bg-slate-950/80"
      >
        LOCK IN
      </motion.div>

      <motion.div
        style={{ opacity: skipBadgeOpacity }}
        className="absolute top-6 right-6 border-[3px] border-[#ff3b30] text-[#ff3b30] text-sm font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-lg rotate-12 pointer-events-none z-30 shadow-[0_0_15px_rgba(255,59,48,0.2)] bg-slate-950/80"
      >
        SKIP
      </motion.div>

      {/* Match Header / Odds Badge */}
      <div className="flex justify-between items-start z-20 relative">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">
              {formattedDate}
            </span>
            {statusBadge && (
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border tracking-wider uppercase ${statusBadge.style}`}>
                {statusBadge.label}
              </span>
            )}
          </div>
          <span className="text-[9px] text-[#00e701]/85 font-semibold mt-0.5">
            {timeStatus}
          </span>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center -space-x-1 shrink-0">
              <img
                src={bet.teamFlagLeft}
                className="w-5 h-3.5 object-cover rounded-sm border border-slate-850 shadow"
                alt=""
              />
              <img
                src={bet.teamFlagRight}
                className="w-5 h-3.5 object-cover rounded-sm border border-slate-850 shadow"
                alt=""
              />
            </div>
            <span className="text-xs font-black text-slate-200 tracking-tight">
              {bet.match}
            </span>
          </div>
        </div>

        {/* Glowing Odds Badge */}
        <div className="bg-[#00e701]/10 border border-[#00e701]/30 rounded-xl px-3 py-1 text-center shadow-[0_0_15px_rgba(0,231,1,0.1)]">
          <span className="text-xs font-black text-[#00e701] font-mono tracking-tight">
            {bet.oddsAmerican}
          </span>
        </div>
      </div>

      {/* Player headshot cutout, yellow card, or red card */}
      {displayImage && (
        <img
          src={displayImage}
          alt=""
          className={`absolute pointer-events-none z-10 select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)] ${
            isCardBet
              ? "bottom-[-16px] right-[-16px] w-56 h-56 object-contain"
              : "bottom-8 right-1 w-32 h-32 object-contain"
          }`}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      )}

      {/* Market Prop Description */}
      <div className="my-auto py-4 z-20 relative max-w-[70%] text-left flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-[#00e701] font-bold tracking-[0.25em] uppercase">
            SELECTION
          </span>
          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${typeInfo.color} flex items-center gap-1 uppercase tracking-wider`}>
            <span>{typeInfo.icon}</span>
            <span>{typeInfo.label}</span>
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-black text-white leading-snug tracking-tight">
          {bet.market}
        </h2>
      </div>

      {/* Footer odds translation */}
      <div className="flex justify-between items-center bg-slate-900/90 rounded-xl px-4 py-2 border border-slate-800 z-20 relative backdrop-blur-sm">
        <span className="text-[9px] font-extrabold text-slate-500 tracking-wider">DECIMAL VALUE</span>
        <span className="text-xs font-black text-[#00e701] font-mono">
          {bet.oddsDecimal.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}
