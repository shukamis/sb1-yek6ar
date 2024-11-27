import { useState, useEffect } from 'react';
import { getNextMonthiversary } from '../utils/dateUtils';

interface MonthiversaryInfo {
  daysUntilNext: number;
  isMonthiversaryToday: boolean;
  currentMonth: number;
  nextDate: Date;
}

export function useMonthiversary(startDate: string) {
  const [monthiversaryInfo, setMonthiversaryInfo] = useState<MonthiversaryInfo>({
    daysUntilNext: 0,
    isMonthiversaryToday: false,
    currentMonth: 0,
    nextDate: new Date()
  });

  useEffect(() => {
    const updateMonthiversary = () => {
      setMonthiversaryInfo(getNextMonthiversary(startDate));
    };

    updateMonthiversary();
    const timer = setInterval(updateMonthiversary, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [startDate]);

  return monthiversaryInfo;
}