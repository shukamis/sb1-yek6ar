import { format, formatDistance, differenceInDays, differenceInMonths, addMonths, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function normalizeDate(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getTimeElapsed(startDate: string) {
  const start = normalizeDate(startDate);
  const now = new Date();
  
  const monthsElapsed = differenceInMonths(now, start);
  const nextMonthDate = addMonths(start, monthsElapsed);
  const daysAfterMonths = differenceInDays(now, nextMonthDate);

  // Calculate total time in hours, minutes, seconds
  const totalSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return {
    months: monthsElapsed,
    days: daysAfterMonths,
    totalTime: {
      hours: totalHours,
      minutes: totalMinutes,
      seconds: remainingSeconds
    }
  };
}

export function formatDateToLocal(date: string | Date): string {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatDuration(hours: number, minutes: number, seconds: number): string {
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function getNextMonthiversary(startDate: string) {
  const start = normalizeDate(startDate);
  const today = new Date();
  
  const monthsElapsed = differenceInMonths(today, start);
  const currentMonthiversary = addMonths(start, monthsElapsed);
  const nextMonthiversary = addMonths(start, monthsElapsed + 1);
  
  const isMonthiversaryToday = isSameDay(today, currentMonthiversary);
  
  return {
    currentMonth: monthsElapsed + (isMonthiversaryToday ? 1 : 0),
    daysUntilNext: isMonthiversaryToday ? 0 : differenceInDays(nextMonthiversary, today),
    isMonthiversaryToday,
    nextDate: nextMonthiversary,
  };
}