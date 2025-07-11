// stress-relief-hub: Next.js + Tailwind CSS Starter with Stress Relief Tools + 100-Day Challenge + Self-Help Rules

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    "The Subtle Art of Not Giving a F*ck: Accept that life has struggles, choose yours wisely.",
    "Think Like a Monk: Practice gratitude daily.",
  ];

  const [timer, setTimer] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [affirmation, setAffirmation] = useState("");
  const [selfHelp, setSelfHelp] = useState("");
  const [day, setDay] = useState(1);

  useEffect(() => {
    setAffirmation(
      affirmations[Math.floor(Math.random() * affirmations.length)]
    );
    setSelfHelp(
      selfHelpRules[Math.floor(Math.random() * selfHelpRules.length)]
    );
  }, [day]);

  useEffect(() => {
    let interval;
    if (breathing && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setBreathing(false);
    }
    return () => clearInterval(interval);
  }, [breathing, timer]);

  const startBreathing = () => {
    setTimer(60); // 1 min breathing session
    setBreathing(true);
  };

  const nextDay = () => {
    setDay((prev) => (prev < 100 ? prev + 1 : 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full text-center shadow-xl">
        <CardContent className="space-y-6">
          <h1 className="text-3xl font-bold text-green-900">Stress Relief Hub</h1>
          <p className="text-gray-700">{affirmation}</p>

          {breathing ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-40 h-40 rounded-full bg-blue-300 mx-auto shadow-md"
            ></motion.div>
          ) : (
            <Button onClick={startBreathing} className="bg-green-500 hover:bg-green-600">
              Start Breathing Exercise
            </Button>
          )}

          {breathing && <p className="text-lg">Time left: {timer}s</p>}

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-green-800">Day {day} of 100-Day Challenge</h2>
            <p className="text-gray-700">Today's Self-Help Rule:</p>
            <p className="italic text-blue-900">"{selfHelp}"</p>
            <Button onClick={nextDay} className="bg-blue-500 hover:bg-blue-600">
              Complete Day & Show Next Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
