import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  subLabel,
  onClick, 
  variant = 'secondary',
  disabled = false
}) => {
  const baseClasses = "w-full py-4 px-6 rounded-lg font-bold uppercase italic tracking-wider transform transition-all duration-200 active:scale-95 flex items-center justify-between group overflow-hidden relative";
  
  let variantClasses = "";
  
  if (variant === 'primary') {
    variantClasses = "bg-vr46-yellow text-vr46-blue shadow-[0_0_20px_rgba(232,246,37,0.4)] border-2 border-vr46-yellow hover:bg-white hover:text-vr46-blue";
  } else if (variant === 'secondary') {
    variantClasses = "bg-vr46-blue text-white border-l-4 border-vr46-yellow hover:bg-blue-800";
  } else if (variant === 'outline') {
    variantClasses = "bg-transparent border-2 border-slate-700 text-slate-300 hover:border-vr46-yellow hover:text-vr46-yellow";
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Background Racing Stripe Effect */}
      <div className="absolute top-0 right-0 h-full w-12 bg-white/5 -skew-x-12 translate-x-4 group-hover:translate-x-full transition-transform duration-500"></div>

      <div className="flex flex-col items-start z-10">
        <span className="text-lg leading-tight">{label}</span>
        {subLabel && <span className="text-xs opacity-75 font-sans normal-case">{subLabel}</span>}
      </div>
      <div className="z-10 transform group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
    </button>
  );
};