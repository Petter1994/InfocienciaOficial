'use client';

import { CSSProperties } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function Spinner({ 
  size = 'md', 
  color = '#3b82f6', 
  className = '' 
}: SpinnerProps) {
  const sizeMap = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-3',
    lg: 'h-8 w-8 border-4'
  };

  const spinnerStyle: CSSProperties = {
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <div 
      role="status" 
      aria-label="Cargando"
      className={`inline-block rounded-full animate-spin ${sizeMap[size]} ${className}`}
      style={spinnerStyle}
    />
  );
}