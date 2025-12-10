import React from 'react';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`mb-8 relative ${className}`}>
      {title && (
        <div className="flex items-center mb-4">
          <div className="h-8 w-2 bg-vr46-yellow -skew-x-12 mr-3 shadow-[0_0_10px_rgba(232,246,37,0.5)]"></div>
          <h2 className="text-2xl font-racing italic uppercase tracking-wider text-white">
            {title}
          </h2>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};