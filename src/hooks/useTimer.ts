import { useState, useEffect } from 'react';

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useTimer(startDate: string) {
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(startDate);
      const now = new Date();
      const totalSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);
      
      setTime({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  return time;
}