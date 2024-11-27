import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div 
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-100',
        'transition-all duration-200 ease-in-out',
        hover && 'hover:shadow-md hover:border-pink-100 hover:scale-[1.01]',
        'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}