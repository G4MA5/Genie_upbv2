import { useState, useEffect } from 'react';

export interface CountdownValues {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isOver: boolean;
}

export function useCountdown(targetIsoDate: string = '2026-12-18T23:59:59'): CountdownValues {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const target = new Date(targetIsoDate).getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setTimeLeft(diff);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetIsoDate]);

  const p = (n: number) => String(n).padStart(2, '0');
  const d = Math.floor(timeLeft / 86400);
  const h = Math.floor((timeLeft % 86400) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return {
    days: p(d),
    hours: p(h),
    minutes: p(m),
    seconds: p(s),
    isOver: timeLeft <= 0
  };
}
