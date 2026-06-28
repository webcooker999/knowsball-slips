import { useState, useRef, useEffect } from "react";
import type { PropBet } from "../data/bets";
import { SwipeableCard, type ForceSwipeInfo } from "./SwipeableCard";
import { PayoutCounter } from "./PayoutCounter";

interface SwipeArenaProps {
  bets: PropBet[];
  onAcceptBet: (bet: PropBet) => void;
  onRejectBet: (bet: PropBet) => void;
  acceptedCount: number;
  payout: number;
  stake: number;
  onStakeChange: (stake: number) => void;
  onFinalize?: () => void;
  onReset?: () => void;
}

export function SwipeArena({
  bets,
  onAcceptBet,
  onRejectBet,
  acceptedCount,
  payout,
  stake,
  onStakeChange,
  onFinalize,
  onReset,
}: SwipeArenaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [forceSwipe, setForceSwipe] = useState<ForceSwipeInfo | null>(null);
  const [timeToMidnight, setTimeToMidnight] = useState<string>("");

  const swipedCardIds = useRef<Set<string>>(new Set());

  // Midnight (00:00 EST / Eastern Time) countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Get UTC time, then convert to EST/GMT-4 to get correct tomorrow threshold
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const estNow = new Date(utc + (3600000 * -4));
      
      const tomorrowEst = new Date(estNow.getFullYear(), estNow.getMonth(), estNow.getDate() + 1, 0, 0, 0);
      
      // Calculate diff in ms
      const diffMs = tomorrowEst.getTime() - estNow.getTime();
      
      if (diffMs <= 0) {
        setTimeToMidnight("00h 00m 00s");
        return;
      }
      
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      
      setTimeToMidnight(
        `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
      );
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle swipe completed (either by drag or programmatically)
  const handleSwiped = (direction: "left" | "right", bet: PropBet, index: number) => {
    if (swipedCardIds.current.has(bet.id)) return;
    swipedCardIds.current.add(bet.id);

    setCurrentIndex(index + 1);

    if (direction === "right") {
      onAcceptBet(bet);
    } else {
      onRejectBet(bet);
    }
  };

  // Programmatic swipe trigger for circular buttons
  const swipeManual = (dir: "left" | "right") => {
    if (currentIndex < bets.length && !forceSwipe) {
      setForceSwipe({ direction: dir, cardId: bets[currentIndex].id });
    }
  };

  const isDeckFinished = currentIndex >= bets.length;

  return (
    <div className="relative w-full max-w-sm flex-grow flex flex-col justify-center items-center pb-8 pt-4 px-4 pointer-events-auto">
      
      {/* Dynamic Degen Parlay Promo Banner */}
      <div className="w-full bg-[#00e701]/10 border border-[#00e701]/20 rounded-xl px-3.5 py-2 text-center shadow-[0_0_12px_rgba(0,231,1,0.04)] mb-2 mt-1 select-none">
        <span className="text-[9.5px] text-slate-350 font-bold tracking-wide leading-relaxed block">
          {isDeckFinished ? (
            <span>⚡ <span className="text-[#00e701] font-extrabold">TODAY'S SLATE COMPLETE</span> • COME BACK TOMORROW</span>
          ) : (
            <span>⚡ <span className="text-[#00e701] font-extrabold">10 DAILY PICKS LIVE!</span> Swipe through today's cards to craft a parlay.</span>
          )}
        </span>
      </div>

      {/* Winnings Counter & Stake Input (The main focus, right above card deck) */}
      <PayoutCounter value={payout} stake={stake} onStakeChange={onStakeChange} />

      {/* Cards Deck Stack */}
      <div className="relative w-full aspect-[3/4.2] max-h-[380px] flex justify-center items-center mt-3">
        {isDeckFinished ? (
          /* Slate Finished Countdown Screen */
          <div className="w-full h-full bg-slate-900/60 border-2 border-[#00e701]/30 rounded-2xl flex flex-col justify-between p-6 text-center shadow-[0_0_30px_rgba(0,231,1,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00e701] opacity-70 animate-pulse" />
            
            <div className="mt-4 flex flex-col items-center">
              <span className="text-3xl mb-3 animate-bounce">💸</span>
              <h3 className="text-base font-black text-white tracking-wide uppercase">
                Daily Slate Completed
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed max-w-[85%]">
                You've swiped through all available slips for today. Come back tomorrow to draft more props.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl py-4 px-3 my-4 flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] text-[#00e701] font-bold tracking-[0.2em] uppercase mb-1.5">
                Next Slate Unlocks In
              </span>
              <span className="text-2xl font-black text-white font-mono tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {timeToMidnight}
              </span>
            </div>

            <p className="text-[10px] text-slate-500 italic mb-2">
              Next cards unlock tomorrow at 00:00 EST!
            </p>
          </div>
        ) : currentIndex + 1 < bets.length ? (
          /* Background card preview (renders underneath) */
          <>
            <SwipeableCard
              key={bets[currentIndex + 1].id}
              bet={bets[currentIndex + 1]}
              isBackground={true}
            />
            <SwipeableCard
              key={bets[currentIndex].id}
              bet={bets[currentIndex]}
              onSwipeRight={() => handleSwiped("right", bets[currentIndex], currentIndex)}
              onSwipeLeft={() => handleSwiped("left", bets[currentIndex], currentIndex)}
              forceSwipe={forceSwipe}
              onForceSwipeComplete={() => setForceSwipe(null)}
              isBackground={false}
            />
          </>
        ) : (
          /* Foreground active card */
          <SwipeableCard
            key={bets[currentIndex].id}
            bet={bets[currentIndex]}
            onSwipeRight={() => handleSwiped("right", bets[currentIndex], currentIndex)}
            onSwipeLeft={() => handleSwiped("left", bets[currentIndex], currentIndex)}
            forceSwipe={forceSwipe}
            onForceSwipeComplete={() => setForceSwipe(null)}
            isBackground={false}
          />
        )}
      </div>

      {/* Tinder Actions Circular Buttons (Positioned directly under the cards) */}
      {!isDeckFinished && currentIndex < bets.length && (
        <div className="relative mt-6 z-30 flex justify-center items-center gap-6 pointer-events-auto">
          {/* Reject Button (Left swipe) */}
          <button
            onClick={() => swipeManual("left")}
            disabled={!!forceSwipe}
            className="w-14 h-14 rounded-full bg-slate-900 border-2 border-[#ff3b30] flex items-center justify-center shadow-[0_4px_15px_rgba(255,59,48,0.2)] hover:bg-[#ff3b30]/10 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            aria-label="Skip Prop Bet"
          >
            <span className="text-xl select-none">❌</span>
          </button>

          {/* Insta Bet (Super Like) Button (Center) */}
          <button
            onClick={() => {
              const bet = bets[currentIndex];
              if (bet) {
                window.open(bet.betUrl || "https://stake.com", "_blank");
              }
            }}
            className="w-14 h-14 rounded-full bg-slate-900 border-2 border-[#00a2ff] flex items-center justify-center shadow-[0_4px_15px_rgba(0,162,255,0.25)] hover:bg-[#00a2ff]/10 active:scale-95 transition-all cursor-pointer"
            aria-label="Insta Bet"
          >
            <svg 
              className="w-6 h-6 text-[#00a2ff] fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>

          {/* Accept Button (Right swipe) */}
          <button
            onClick={() => swipeManual("right")}
            disabled={!!forceSwipe}
            className="w-16 h-16 rounded-full bg-slate-900 border-2 border-[#00e701] flex items-center justify-center shadow-[0_4px_20px_rgba(0,231,1,0.25)] hover:bg-[#00e701]/10 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            aria-label="Add Prop Bet to Slip"
          >
            <span className="text-2xl select-none">💸</span>
          </button>
        </div>
      )}

      {/* Checkout / Reset Buttons */}
      {acceptedCount > 0 && onFinalize && (
        <div className="mt-6 w-full flex gap-3 pointer-events-auto shrink-0">
          <button
            onClick={onFinalize}
            className="flex-grow py-3 bg-[#00e701] text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,231,1,0.3)] hover:scale-102 active:scale-98 transition-all cursor-pointer font-sans"
          >
            LOCK IN SLIP ({acceptedCount}) ➡️
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="py-3 px-4 rounded-xl border border-red-500/30 bg-red-950/20 hover:bg-red-950/40 text-red-500 font-black text-xs uppercase tracking-wider transition-colors active:scale-98 cursor-pointer font-sans"
            >
              RESET
            </button>
          )}
        </div>
      )}
    </div>
  );
}
