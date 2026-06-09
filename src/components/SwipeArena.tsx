import { useState, useRef } from "react";
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

  const swipedCardIds = useRef<Set<string>>(new Set());

  // Handle swipe completed (either by drag or programmatically)
  const handleSwiped = (direction: "left" | "right", bet: PropBet, index: number) => {
    // Avoid double triggering
    if (swipedCardIds.current.has(bet.id)) return;
    swipedCardIds.current.add(bet.id);

    // Update index to track top card
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

  return (
    <div className="relative w-full max-w-sm flex-grow flex flex-col justify-center items-center pb-8 pt-4 px-4 pointer-events-auto">
      
      {/* Dynamic Degen Parlay Promo Banner */}
      <div className="w-full bg-[#00e701]/10 border border-[#00e701]/20 rounded-xl px-3.5 py-2 text-center shadow-[0_0_12px_rgba(0,231,1,0.04)] mb-2 mt-1 select-none">
        <span className="text-[9.5px] text-slate-350 font-bold tracking-wide leading-relaxed block">
          ⚡ <span className="text-[#00e701] font-extrabold">10 DAILY PICKS ARE LIVE!</span> Swipe through today's cards to craft a crazy <span className="text-[#00e701] font-black">10-leg degen parlay</span>.
        </span>
      </div>

      {/* Winnings Counter & Stake Input (The main focus, right above card deck) */}
      <PayoutCounter value={payout} stake={stake} onStakeChange={onStakeChange} />

      {/* Cards Deck Stack */}
      <div className="relative w-full aspect-[3/4.2] max-h-[380px] flex justify-center items-center mt-3">
        
        {/* Background card preview (renders underneath) */}
        {currentIndex + 1 < bets.length && (
          <SwipeableCard
            key={bets[currentIndex + 1].id}
            bet={bets[currentIndex + 1]}
            isBackground={true}
          />
        )}

        {/* Foreground active card (draggable and clickable) */}
        {currentIndex < bets.length ? (
          <SwipeableCard
            key={bets[currentIndex].id}
            bet={bets[currentIndex]}
            onSwipeRight={() => handleSwiped("right", bets[currentIndex], currentIndex)}
            onSwipeLeft={() => handleSwiped("left", bets[currentIndex], currentIndex)}
            forceSwipe={forceSwipe}
            onForceSwipeComplete={() => setForceSwipe(null)}
            isBackground={false}
          />
        ) : (
          /* Empty deck state when all cards are swiped */
          <div className="w-full h-full bg-[#1a2c38]/40 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col justify-center items-center p-6 text-center">
            <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">
              End of Deck Reached
            </span>
            <p className="text-[11px] text-slate-600 mt-2">
              You selected {acceptedCount}/10 slips. Reset the deck to draft more props.
            </p>
          </div>
        )}
      </div>

      {/* Tinder Actions Circular Buttons (Positioned directly under the cards) */}
      {currentIndex < bets.length && (
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
