import React from 'react';

interface SheroLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'teal' | 'white' | 'gold';
}

export const SheroLogo: React.FC<SheroLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'teal'
}) => {
  // Height map for responsive sizing (bigger and clearly visible)
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-22',
  };

  const primaryColor = variant === 'teal' ? '#3EA6B0' : variant === 'gold' ? '#DFB15B' : '#FFFFFF';
  const secondaryColor = variant === 'teal' ? '#2A7F86' : variant === 'gold' ? '#F4CF74' : '#E2E8F0';
  const accentGlow = variant === 'teal' ? '#5CD2DD' : '#F9DE96';

  return (
    <div className={`inline-flex items-center select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}>
      {/* 
        Authentic SHERO Women's Forum Brand Logo
        Recreated faithfully from official brand identity:
        - Bold "SHER" typography
        - "O" as Venus female symbol with raised empowerment fist inside
        - Continuous underline extending into the female crossbar
        - "WOMEN'S FORUM" subtext beneath
        - Transparent backdrop blending seamlessly into dark/light themes
      */}
      <svg
        viewBox="0 0 350 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightMap[size]} w-auto drop-shadow-[0_2px_12px_rgba(42,127,134,0.35)]`}
        aria-label="SHERO Women's Forum Official Logo"
      >
        <defs>
          <linearGradient id="sheroLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentGlow} />
            <stop offset="45%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>

          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#2A7F86" floodOpacity="0.4" />
          </filter>
        </defs>

        <g fill="url(#sheroLogoGrad)" filter="url(#subtleGlow)">
          {/* ================= LETTER 'S' ================= */}
          <path
            d="M52 35 C38 35 24 41 23 54 C22 66 33 71 45 74 C58 77 62 81 62 88 C62 95 55 101 41 101 C29 101 19 96 15 88 L25 81 C28 86 34 90 41 90 C47 90 51 86 51 81 C51 75 44 71 34 68 C21 64 12 59 12 47 C12 36 23 25 41 25 C52 25 61 29 65 37 L55 43 C52 38 46 35 40 35 Z"
          />

          {/* ================= LETTER 'H' ================= */}
          <path
            d="M74 27 H85 V56 H111 V27 H122 V99 H111 V67 H85 V99 H74 Z"
          />

          {/* ================= LETTER 'E' ================= */}
          <path
            d="M134 27 H171 V38 H145 V57 H168 V67 H145 V88 H172 V99 H134 Z"
          />

          {/* ================= LETTER 'R' ================= */}
          {/* Leg extends downward to touch the underline bar */}
          <path
            d="M182 27 H209 C223 27 232 35 232 47 C232 57 225 64 214 67 L233 107 H220 L203 69 H193 V99 H182 Z M193 38 V59 H208 C215 59 220 54 220 48 C220 42 215 38 208 38 Z"
          />

          {/* ================= CONTINUOUS UNDERLINE BAR ================= */}
          {/* Connects from the left under 'S' across to seamlessly join the 'O' crossbar */}
          <rect
            x="12"
            y="108"
            width="225"
            height="11"
            rx="5.5"
          />

          {/* ================= "WOMEN'S FORUM" SUBTEXT ================= */}
          <text
            x="13"
            y="138"
            fontFamily="Montserrat, 'Plus Jakarta Sans', sans-serif"
            fontSize="18.5"
            fontWeight="800"
            letterSpacing="2.8"
            fill="url(#sheroLogoGrad)"
          >
            WOMEN'S FORUM
          </text>

          {/* ================= LETTER 'O' / VENUS FEMALE SYMBOL ================= */}
          {/* Female symbol outer ring */}
          <circle
            cx="278"
            cy="63"
            r="44"
            stroke="url(#sheroLogoGrad)"
            strokeWidth="11"
            fill="none"
          />

          {/* Vertical stem of the cross extending down to bottom */}
          <rect
            x="272.5"
            y="106"
            width="11"
            height="38"
            rx="3"
          />

          {/* Crossbar that aligns and integrates with the horizontal underline */}
          <rect
            x="248"
            y="114"
            width="60"
            height="11"
            rx="5"
          />

          {/* ================= RAISED CLENCHED FIST INSIDE 'O' ================= */}
          <g transform="translate(254, 38)">
            {/* Forearm / Wrist */}
            <path
              d="M18 48 L19 33 C19 31 29 31 29 33 L30 48 Z"
            />

            {/* Palm & Fist base */}
            <path
              d="M14 26 C14 20, 18 16, 24 16 C30 16, 34 20, 34 26 L32 34 L16 34 Z"
            />

            {/* Clenched Four Knuckles */}
            {/* Little finger */}
            <rect x="13.5" y="11" width="4.5" height="11" rx="2.25" />
            {/* Ring finger */}
            <rect x="18.5" y="7" width="5" height="14" rx="2.5" />
            {/* Middle finger */}
            <rect x="24" y="5" width="5" height="16" rx="2.5" />
            {/* Index finger */}
            <rect x="29.5" y="8" width="5" height="13" rx="2.5" />

            {/* Thumb curved firmly across the fingers */}
            <path
              d="M12 21 C12 16, 17 14, 23 15 C26 15.5, 30 17, 32 20 C31 22, 28 24, 23 24 C17 24, 12 25, 12 21 Z"
              fill={accentGlow}
            />

            {/* Cut lines for knuckle definition */}
            <line x1="18.5" y1="9" x2="18.5" y2="18" stroke="#12071D" strokeWidth="1.2" />
            <line x1="24" y1="8" x2="24" y2="19" stroke="#12071D" strokeWidth="1.2" />
            <line x1="29.5" y1="10" x2="29.5" y2="20" stroke="#12071D" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
};
