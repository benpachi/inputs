import { useContext } from "react";
import { GamepadsContext } from "./GamepadsContext";

export function useGamepads() {
  const context = useContext(GamepadsContext);
  if (!context) { throw new Error('useGamepads must be used within a Provider') }
  return context;
};