import React from 'react';

interface BrainLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrainLogo: React.FC<BrainLogoProps> = ({ 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative ${iconDimensions} flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-md shadow-indigo-500/20`}>
        <div className="w-full h-full bg-slate-950/20 rounded-[10px] flex items-center justify-center p-1.5 backdrop-blur-xs">
          <svg 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white"
          >
            {/* Geometric Brain Left Hemisphere */}
            <path 
              d="M14 6C10.5 6 8 8.5 8 12C8 13.5 8.5 14.8 9.3 16C8.5 17.2 8 18.5 8 20C8 23.5 10.5 26 14 26V23C12.5 23 11 21.8 11 20C11 18.8 11.5 17.8 12.5 17.2L14 16.3V14L12.5 13.2C11.5 12.5 11 11.5 11 10.5C11 8.8 12.2 7.5 14 7.5V6Z" 
              fill="currentColor" 
              fillOpacity="0.95"
            />
            {/* Geometric Brain Right Hemisphere */}
            <path 
              d="M18 6C21.5 6 24 8.5 24 12C24 13.5 23.5 14.8 22.7 16C23.5 17.2 24 18.5 24 20C24 23.5 21.5 26 18 26V23C19.5 23 21 21.8 21 20C21 18.8 20.5 17.8 19.5 17.2L18 16.3V14L19.5 13.2C20.5 12.5 21 11.5 21 10.5C21 8.8 19.8 7.5 18 7.5V6Z" 
              fill="currentColor" 
              fillOpacity="0.95"
            />
            {/* Central Neural Synapse Nexus */}
            <circle cx="16" cy="11" r="1.5" fill="#38BDF8" />
            <circle cx="16" cy="16" r="1.5" fill="#C084FC" />
            <circle cx="16" cy="21" r="1.5" fill="#38BDF8" />
            <line x1="16" y1="12.5" x2="16" y2="14.5" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="17.5" x2="16" y2="19.5" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-extrabold tracking-tight text-slate-900 ${textSizes} leading-none flex items-center`}>
            <span>IQ</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">MANIA</span>
          </div>
          <span className="text-[9px] font-semibold tracking-widest text-slate-600 uppercase mt-0.5">
            Cognitive Assessment
          </span>
        </div>
      )}
    </div>
  );
};
