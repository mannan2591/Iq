import React from 'react';

interface IQManiaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showText?: boolean;
  textVariant?: 'horizontal' | 'stacked';
  className?: string;
  iconClassName?: string;
}

export const IQManiaRocketIcon: React.FC<{ className?: string; idPrefix?: string }> = ({ 
  className = 'w-full h-full',
  idPrefix = 'iqm'
}) => {
  return (
    <svg 
      viewBox="0 0 240 240" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Rocket Body Gradient */}
        <linearGradient id={`${idPrefix}-rocket-grad`} x1="40" y1="40" x2="190" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Brain Circuitry Gradient */}
        <linearGradient id={`${idPrefix}-brain-grad`} x1="30" y1="50" x2="200" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Rocket Thrust Flame Gradients */}
        <linearGradient id={`${idPrefix}-flame-main`} x1="120" y1="120" x2="40" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="40%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        <linearGradient id={`${idPrefix}-flame-glow`} x1="100" y1="110" x2="30" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Orange Accent Arrow Gradient */}
        <linearGradient id={`${idPrefix}-arrow-orange`} x1="160" y1="160" x2="200" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        {/* Cyan Accent Arrow Gradient */}
        <linearGradient id={`${idPrefix}-arrow-cyan`} x1="110" y1="70" x2="145" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Calculator Keys Background */}
        <linearGradient id={`${idPrefix}-calc-bg`} x1="90" y1="75" x2="145" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F284E" />
          <stop offset="100%" stopColor="#091830" />
        </linearGradient>

        {/* Golden Light Porthole */}
        <radialGradient id={`${idPrefix}-gold-light`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* 1. UPWARD BOOST ARROWS (BACKGROUND) */}
      {/* Top Left Cyan Growth Arrow */}
      <path 
        d="M100 80 L125 55 L135 65 L145 35 L115 45 L125 55 L100 80 Z" 
        fill="url(#iqm-arrow-cyan)" 
        opacity="0.9"
      />
      {/* Bottom Right Orange Growth Arrow */}
      <path 
        d="M150 160 L180 120 L170 112 L202 102 L192 134 L182 126 L150 160 Z" 
        fill="url(#iqm-arrow-orange)" 
      />

      {/* 2. THRUST EXHAUST FLAMES (Bottom Left Trailing) */}
      {/* Outer Cyan Exhaust Streaks */}
      <path 
        d="M95 160 C75 175 55 195 40 215 C52 195 65 178 85 162 Z" 
        fill="url(#iqm-flame-glow)" 
        opacity="0.8"
      />
      <path 
        d="M75 145 C60 165 42 190 32 205 C42 185 55 168 70 148 Z" 
        fill="url(#iqm-flame-glow)" 
        opacity="0.85"
      />
      {/* Fiery Core Rocket Flame */}
      <path 
        d="M80 140 C65 165 50 190 42 210 C58 192 72 178 82 188 C88 172 102 160 115 152 C102 155 92 148 80 140 Z" 
        fill="url(#iqm-flame-main)" 
      />
      <path 
        d="M82 146 C72 165 60 182 54 195 C66 182 76 172 82 178 C86 166 96 158 105 152 C95 153 88 150 82 146 Z" 
        fill="#FEF08A" 
      />

      {/* 3. DIGITAL BRAIN NEURAL CIRCUITRY WINGS */}
      {/* Left Brain Hemisphere & Circuit Nodes */}
      <path 
        d="M85 80 C70 70 60 85 62 100 C50 102 48 118 55 128 C45 135 52 152 68 150 C75 156 88 150 92 142" 
        stroke="#0284C7" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <path 
        d="M85 80 C70 70 60 85 62 100 C50 102 48 118 55 128 C45 135 52 152 68 150 C75 156 88 150 92 142" 
        stroke="#38BDF8" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      {/* Left Brain Internal Circuit Lines & Dots */}
      <path d="M72 90 L85 100 M65 115 L80 120 M68 135 L85 135" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="68" cy="90" r="3.5" fill="#38BDF8" />
      <circle cx="60" cy="115" r="3.5" fill="#38BDF8" />
      <circle cx="62" cy="135" r="3.5" fill="#38BDF8" />
      <circle cx="85" cy="100" r="2.5" fill="#E0F2FE" />

      {/* Right Brain Hemisphere & Circuit Nodes */}
      <path 
        d="M145 120 C160 115 175 125 178 138 C188 142 192 158 185 170 C190 182 178 195 165 192 C158 198 142 196 138 185" 
        stroke="#0284C7" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <path 
        d="M145 120 C160 115 175 125 178 138 C188 142 192 158 185 170 C190 182 178 195 165 192 C158 198 142 196 138 185" 
        stroke="#38BDF8" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right Brain Internal Circuit Lines & Dots */}
      <path d="M155 132 L165 140 M160 155 L175 158 M150 172 L165 175" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="170" cy="138" r="3.5" fill="#38BDF8" />
      <circle cx="180" cy="158" r="3.5" fill="#38BDF8" />
      <circle cx="170" cy="180" r="3.5" fill="#38BDF8" />
      <circle cx="155" cy="132" r="2.5" fill="#E0F2FE" />

      {/* 4. ROCKET NOSE & FUSELAGE */}
      {/* Main Rocket Shell (Rotated 45 degrees towards top right) */}
      <g transform="rotate(45 120 120)">
        {/* Rocket Left & Right Fins */}
        <path d="M85 145 C65 150 55 170 50 185 C65 182 85 175 92 160 Z" fill="#0284C7" stroke="#0F284E" strokeWidth="3" />
        <path d="M155 145 C175 150 185 170 190 185 C175 182 155 175 148 160 Z" fill="#0284C7" stroke="#0F284E" strokeWidth="3" />

        {/* Rocket Fuselage Body */}
        <path 
          d="M120 30 C95 65 82 110 82 165 C82 170 85 175 90 175 L150 175 C155 175 158 170 158 165 C158 110 145 65 120 30 Z" 
          fill="url(#iqm-rocket-grad)" 
          stroke="#0A2540" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />

        {/* Nose Cone Highlight Overlay */}
        <path 
          d="M120 30 C110 50 102 75 98 100 C112 95 128 95 142 100 C138 75 130 50 120 30 Z" 
          fill="#0284C7" 
          opacity="0.6"
        />
        <path 
          d="M120 34 C128 50 134 70 138 88" 
          stroke="#BAE6FD" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />

        {/* Golden Central Porthole / Beacon */}
        <circle cx="120" cy="85" r="9" fill="url(#iqm-gold-light)" stroke="#0A2540" strokeWidth="2.5" />
        <circle cx="118" cy="83" r="2.5" fill="#FFFFFF" />

        {/* Calculator Display & Keypad Module Container */}
        <rect 
          x="94" 
          y="104" 
          width="52" 
          height="58" 
          rx="8" 
          fill="url(#iqm-calc-bg)" 
          stroke="#38BDF8" 
          strokeWidth="2.5" 
        />

        {/* Calculator Digital Screen Readout */}
        <rect x="99" y="109" width="42" height="11" rx="3.5" fill="#38BDF8" />
        <line x1="103" y1="114.5" x2="135" y2="114.5" stroke="#0369A1" strokeWidth="2.5" strokeDasharray="3 2" />

        {/* Calculator Keypad Buttons Grid */}
        {/* Row 1: 1, 2, + */}
        <rect x="99" y="124" width="11" height="9" rx="2" fill="#0284C7" />
        <text x="104.5" y="131" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">1</text>
        
        <rect x="114.5" y="124" width="11" height="9" rx="2" fill="#0284C7" />
        <text x="120" y="131" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">2</text>
        
        <rect x="130" y="124" width="11" height="9" rx="2" fill="#F59E0B" />
        <text x="135.5" y="131" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">+</text>

        {/* Row 2: 2, 3, = */}
        <rect x="99" y="136" width="11" height="9" rx="2" fill="#0284C7" />
        <text x="104.5" y="143" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">2</text>
        
        <rect x="114.5" y="136" width="11" height="9" rx="2" fill="#0284C7" />
        <text x="120" y="143" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">3</text>
        
        <rect x="130" y="136" width="11" height="9" rx="2" fill="#38BDF8" />
        <text x="135.5" y="143" fontSize="7" fontWeight="bold" fill="#0F172A" textAnchor="middle" fontFamily="sans-serif">=</text>

        {/* Row 3: % */}
        <rect x="99" y="148" width="11" height="9" rx="2" fill="#0284C7" />
        <text x="104.5" y="155" fontSize="6.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">%</text>
      </g>
    </svg>
  );
};

export const IQManiaLogo: React.FC<IQManiaLogoProps> = ({ 
  size = 'md', 
  showText = true,
  textVariant = 'horizontal',
  className = '',
  iconClassName = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
    hero: 'w-28 h-28 sm:w-36 sm:h-36'
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
    hero: 'text-4xl sm:text-5xl'
  }[size];

  const subtitleSizes = {
    sm: 'text-[7.5px] tracking-[0.18em]',
    md: 'text-[9.5px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.24em]',
    xl: 'text-[13px] tracking-[0.25em]',
    '2xl': 'text-sm tracking-[0.26em]',
    hero: 'text-base tracking-[0.28em]'
  }[size];

  if (textVariant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <div className={`relative ${iconDimensions} ${iconClassName} flex items-center justify-center shrink-0`}>
          <IQManiaRocketIcon />
        </div>

        {showText && (
          <div className="flex flex-col items-center mt-2">
            <div className={`font-black ${titleSizes} leading-none tracking-tight text-[#0284C7] flex items-center gap-1.5`}>
              <span className="text-[#0369A1]">IQ</span>
              <div className="relative inline-flex items-center">
                <span>Man</span>
                {/* Letter 'i' with Sunburst Star Crown */}
                <div className="relative inline-flex flex-col items-center">
                  <svg viewBox="0 0 24 16" className="w-3.5 h-2.5 text-[#F59E0B] -mb-0.5">
                    {/* 5 Rays Sunburst / Sparkle */}
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                    <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="5" y1="5" x2="8" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="19" y1="5" x2="16" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="22" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="-mt-1">ı</span>
                </div>
                <span>a</span>
              </div>
            </div>
            <span className={`${subtitleSizes} font-black text-[#0F172A] uppercase mt-1 font-sans`}>
              IQ CALCULATOR
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Rocket Brain Icon */}
      <div className={`relative ${iconDimensions} ${iconClassName} flex items-center justify-center shrink-0`}>
        <IQManiaRocketIcon />
      </div>

      {/* Text Branding */}
      {showText && (
        <div className="flex flex-col items-start text-left">
          <div className={`font-black ${titleSizes} leading-none tracking-tight text-[#0284C7] flex items-center gap-1`}>
            <span className="text-[#0369A1]">IQ</span>
            <div className="relative inline-flex items-center">
              <span>Man</span>
              {/* Letter 'i' with Sunburst Star Crown */}
              <div className="relative inline-flex flex-col items-center">
                <svg viewBox="0 0 24 16" className="w-3.5 h-2.5 text-[#F59E0B] -mb-0.5">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="5" x2="8" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="19" y1="5" x2="16" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="22" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="-mt-1">ı</span>
              </div>
              <span>a</span>
            </div>
          </div>
          <span className={`${subtitleSizes} font-black text-[#0F172A] uppercase mt-1 font-sans`}>
            IQ CALCULATOR
          </span>
        </div>
      )}
    </div>
  );
};
