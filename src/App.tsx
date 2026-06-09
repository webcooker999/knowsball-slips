import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { getDailyBets, type PropBet } from "./data/bets";
import { SlimHeader } from "./components/PayoutCounter";
import { SwipeArena } from "./components/SwipeArena";
import { FinalSlip } from "./components/FinalSlip";

export default function App() {
  const [acceptedBets, setAcceptedBets] = useState<PropBet[]>([]);
  const dailyBets = useMemo(() => getDailyBets(), []);
  const [stake, setStake] = useState<number>(10);
  const [isSlipFinalized, setIsSlipFinalized] = useState(false);

  // Math: combined odds are the product of all accepted prop bet decimal values
  const multiplier = acceptedBets.length === 0
    ? 0
    : acceptedBets.reduce((acc, bet) => acc * bet.oddsDecimal, 1);

  const payout = acceptedBets.length === 0 ? 0 : stake * multiplier;

  // Swiped right -> Add to slip
  const handleAcceptBet = (bet: PropBet) => {
    setAcceptedBets((prev) => {
      // Limit to max 10 picks
      if (prev.length >= 10) return prev;
      if (prev.find((b) => b.id === bet.id)) return prev;
      return [...prev, bet];
    });
  };

  // Swiped left -> Skip bet
  const handleRejectBet = (bet: PropBet) => {
    console.log("Skipped bet:", bet.market);
  };

  // Restart draft slip
  const handleReset = () => {
    setAcceptedBets([]);
    setIsSlipFinalized(false);
  };

  // Remove individual bet
  const handleRemoveBet = (betId: string) => {
    setAcceptedBets((prev) => prev.filter((b) => b.id !== betId));
  };

  // Victory fireworks when all 10 selections are completed
  useEffect(() => {
    if (acceptedBets.length === 10) {
      const end = Date.now() + 1.5 * 1000;
      const colors = ["#00e701", "#ffffff", "#1a2c38"];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [acceptedBets]);

  return (
    <div className="relative w-full h-[100dvh] bg-[#0f172a] text-slate-100 flex flex-col items-center justify-start font-sans overflow-hidden">
      
      {/* Slim Top Navigation Header Bar */}
      <SlimHeader picksCount={acceptedBets.length} />

      {/* Primary Interaction Flow Area */}
      <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden pointer-events-auto px-4">
        
        <AnimatePresence mode="wait">
          {!isSlipFinalized && acceptedBets.length < 10 ? (
            <SwipeArena
              key="swipe-arena"
              bets={dailyBets}
              onAcceptBet={handleAcceptBet}
              onRejectBet={handleRejectBet}
              acceptedCount={acceptedBets.length}
              payout={payout}
              stake={stake}
              onStakeChange={setStake}
              onFinalize={() => setIsSlipFinalized(true)}
              onReset={handleReset}
            />
          ) : (
            <FinalSlip
              key="final-slip"
              acceptedBets={acceptedBets}
              multiplier={multiplier}
              onReset={handleReset}
              stake={stake}
              onStakeChange={setStake}
              onRemoveBet={handleRemoveBet}
              onContinueDrafting={() => setIsSlipFinalized(false)}
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
