import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, type, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="w-full mb-4">
      {label && <label className="block text-slate-400 text-xs font-mono mb-2 uppercase tracking-wider">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={`w-full bg-slate-900/50 border border-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:border-quantum-accent focus:ring-1 focus:ring-quantum-accent transition-all font-mono text-sm placeholder-slate-600 ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};