import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';

export type Gamepads = Record<Gamepad['index'], Gamepad>;

const GamepadsContext = createContext<Gamepads>({});

export const GamepadsProvider = ({ children }: { children: ReactNode }) => {
  const [gamepads, setGamepads] = useState<Gamepads>({});
  const requestRef = useRef<number | null>(null);

  const addGamepad = (gamepad: Gamepad) => {
    setGamepads((prevGamepads) => ({
      ...prevGamepads,
      [gamepad.index]: gamepad
    }));
  }

  const removeGamepad = (gamepad: Gamepad) => {
    setGamepads((prevGamepads) => {
      const newGamepads = { ...prevGamepads };
      delete newGamepads[gamepad.index];
      return newGamepads;
    });
  }

  const scanGamepads = () => {
    const detectedGamepads = navigator.getGamepads();
    detectedGamepads.forEach((gamepad) => {
      if (gamepad) {
        addGamepad(gamepad);
      }
    });
  }

  const gamepadConnectedHandler = (e: GamepadEvent) => {
    addGamepad(e.gamepad);
  }

  const gamepadDisconnectedHandler = (e: GamepadEvent) => {
    removeGamepad(e.gamepad);
  }

  useEffect(() => {
    window.addEventListener('gamepadconnected', gamepadConnectedHandler);
    window.addEventListener('gamepaddisconnected', gamepadDisconnectedHandler);

    return () => {
      window.removeEventListener('gamepadconnected', gamepadConnectedHandler);
      window.removeEventListener('gamepaddisconnected', gamepadDisconnectedHandler);
    }
  });

  const update = () => {
    scanGamepads();
    requestRef.current = requestAnimationFrame(update);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(requestRef.current!);
  });

  return (
    <GamepadsContext.Provider value={gamepads}>
      {children}
    </GamepadsContext.Provider>
  );
};

export function useGamepads() {
  const context = useContext(GamepadsContext);
  if (!context) { throw new Error('useGamepads must be used within a Provider') }
  return context;
};