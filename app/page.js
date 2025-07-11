"use client"; // If using Next.js 13+ with App Router

import { useState, useEffect } from "react";

export default function Home() {
  const affirmations = [
    "You are calm, strong, and in control.",
    "This moment will pass, and you will be okay.",
    "Breathe deeply, let go gently.",
    "You are doing your best, and that's enough.",
  ];

  const selfHelpRules = [
    "Atomic Habits: Focus on tiny improvements every day.",
    "The Power of Now: Stay in the present moment.",
    "Deep Work: Remove distractions to find clarity.",
    "The Subtle Art Of Not Giving a F*ck: Accept that life has struggles, choose yours wisely.",
    "Think Like a Monk: Practice gratitude daily.",
  ];

  const [timer, setTimer] = useState(0);
  const [day, setDay] = useState(1);
  const [affirmation, setAffirmation] = useState("");
  const [selfHelp, setSelfHelp] = useState("");

  useEffect(() => {
    setAffirmation(
      affirmations[Math.floor(Math.random() * affirmations.length)]
    );
    setSelfHelp(selfHelpRules[(day - 1) % selfHelpRules.length]);
  }, [day]);

  const startBreathing = () => {
    setTimer(10);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeDay = () => {
    setDay((prev) => (prev >= 100 ? 1 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Calmness Hub 🌿</h1>

      <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg mb-6 w-full max-w-md">
        <h2 className="text-2xl mb-2">Today's Affirmation:</h2>
        <p className="text-lg italic">{affirmation}</p>
      </div>

      <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg mb-6 w-full max-w-md">
        <h2 className="text-2xl mb-2">Breathing Timer:</h2>
        {timer > 0 ? (
          <p className="text-lg font-bold">{timer} seconds remaining</p>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-2"
            onClick={startBreathing}
          >
            Start Breathing Exercise
          </button>
        )}
      </div>

      <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg mb-6 w-full max-w-md">
        <h2 className="text-2xl mb-2">100-Day Self-Help Challenge (Day {day}):</h2>
        <p className="text-lg">{selfHelp}</p>
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mt-2"
          onClick={completeDay}
        >
          Complete Today's Challenge ✅
        </button>
      </div>
    </div>
  );
}
