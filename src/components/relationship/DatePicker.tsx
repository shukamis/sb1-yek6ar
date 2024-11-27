import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDateToLocal, parseLocalDate } from '../../utils/dateUtils';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export function DatePicker({ value, onChange, label = 'Data de Início' }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (newDate: string) => {
    // Ensure we're working with the start of the day in local timezone
    const localDate = new Date(newDate);
    localDate.setHours(0, 0, 0, 0);
    onChange(localDate.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  // Format the display date for the input
  const displayDate = React.useMemo(() => {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }, [value]);

  return (
    <div className="relative" ref={datePickerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
      >
        <span className="flex items-center text-gray-700">
          <CalendarIcon className="w-5 h-5 text-pink-500 mr-2" />
          {formatDateToLocal(value)}
        </span>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <Card className="absolute z-10 mt-2 w-full bg-white shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="p-4">
            <input
              type="date"
              value={displayDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              max={new Date().toISOString().split('T')[0]}
            />
            
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-600">Datas Sugeridas:</p>
              {[7, 30, 90, 180].map((days) => {
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() - days);
                const formattedDate = date.toISOString().split('T')[0];
                
                return (
                  <button
                    key={days}
                    onClick={() => handleDateChange(formattedDate)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-md transition-colors"
                  >
                    {days === 7 && '1 semana atrás'}
                    {days === 30 && '1 mês atrás'}
                    {days === 90 && '3 meses atrás'}
                    {days === 180 && '6 meses atrás'}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}