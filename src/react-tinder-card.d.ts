declare module "react-tinder-card" {
  import * as React from "react";

  export interface TinderCardAPI {
    swipe(dir?: "left" | "right" | "up" | "down"): Promise<void>;
    restoreCard(): Promise<void>;
  }

  export interface TinderCardProps {
    ref?: React.Ref<TinderCardAPI>;
    className?: string;
    flickOnSwipe?: boolean;
    onSwipe?: (direction: "left" | "right" | "up" | "down") => void;
    onCardLeftScreen?: (direction: "left" | "right" | "up" | "down") => void;
    preventSwipe?: string[];
    swipeThreshold?: number;
    children?: React.ReactNode;
  }

  const TinderCard: React.ForwardRefExoticComponent<TinderCardProps & React.RefAttributes<TinderCardAPI>>;
  export default TinderCard;
}
