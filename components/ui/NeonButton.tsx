import React from 'react';
import { playClickSound, playHoverSound } from '../../utils/audio';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseStyles = "relative font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm group overflow-hidden flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-quantum-accent/10 text-quantum-accent border border-quantum-accent hover:bg-quantum-accent hover:text-black shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
    secondary: "bg-quantum-secondary/10 text-quantum-secondary border border-quantum-secondary hover:bg-quantum-secondary hover:text-white shadow-[0_0_10px_rgba(255,0,153,0.2)] hover:shadow-[0_0_20px_rgba(255,0,153,0.6)]",
    outline: "bg-transparent text-slate-400 border border-slate-700 hover:border-slate-300 hover:text-white hover:bg-slate-800"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onMouseEnter={() => playHoverSound()}
      onClick={(e) => {
        playClickSound();
        if (onClick) onClick(e);
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};