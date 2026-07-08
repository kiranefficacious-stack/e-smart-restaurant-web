import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'mark' | 'vertical';
  lightText?: boolean;
}

export default function Logo({ className = 'h-10', variant = 'horizontal', lightText = false }: LogoProps) {
  // SVG Brandmark
  const brandmark = (
    <svg
      viewBox="0 0 110 130"
      className="h-full w-auto select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Leaves (Green) ── */}
      {/* Left big leaf */}
      <path
        d="M48 57C48 57 32 30 45 10C53 1 60 10 54 36C52 46 48 57 48 57Z"
        fill="#689F38"
      />
      {/* Right small leaf */}
      <path
        d="M59 55C59 55 64 36 78 33C87 31 83 40 71 49C65 53 59 55 59 55Z"
        fill="#689F38"
      />

      {/* ── Orange "e" ── */}
      <path
        d="M80 84.5C80 94.5 73.5 110 50 110C26.5 110 16 93.5 16 71C16 48.5 28 32 50.5 32C73 32 78.5 50.5 78.5 68H32.5C32.5 76.5 39 88.5 51 88.5C63 88.5 72.5 82.5 76 77.5"
        stroke="#E65100"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Filled upper segment of "e" */}
      <path
        d="M32.5 68H78.5C78.5 68 76 43 51 43C26 43 32.5 68 32.5 68Z"
        fill="#E65100"
      />

      {/* ── Fork (Left - Black/Charcoal) ── */}
      <g fill="#212121">
        {/* Fork Stem */}
        <path d="M7 66C7 66 7.5 118 7.5 120C7.5 122 5.5 122 5.5 120C5.5 118 6 66 6 66H7Z" />
        {/* Hole at stem bottom */}
        <circle cx="6.5" cy="118.5" r="1.2" fill={lightText ? '#1A1A2E' : '#FFFFFF'} />
        {/* Fork base & outer tines */}
        <path d="M1 45.5C1 45.5 1.5 59.5 6.5 59.5C11.5 59.5 12 45.5 12 45.5V36.5C12 36.5 11 36 10.5 36.5C10 37 10.5 45.5 10.5 45.5V35.5C10.5 35.5 9.5 35 9 35.5C8.5 36 9 45.5 9 45.5V35.5C9 35.5 8 35 7.5 35.5C7 36 7.5 45.5 7.5 45.5V36.5C7.5 36.5 6.5 36 6 36.5C5.5 37 6 52 6 52C6 52 4.5 52 4.5 50C4.5 48 4 36.5 4 36.5C4 36.5 3 36 2.5 36.5C2 37 2.5 45.5 2.5 45.5V36.5C2.5 36.5 1.5 36 1 36.5C0.5 37 1 45.5 1 45.5Z" />
      </g>

      {/* ── Spoon (Right - Black/Charcoal) ── */}
      <g fill="#212121">
        {/* Spoon Stem */}
        <path d="M91 66C91 66 90.5 118 90.5 120C90.5 122 92.5 122 92.5 120C92.5 118 92 66 92 66H91Z" />
        {/* Hole at stem bottom */}
        <circle cx="91.5" cy="118.5" r="1.2" fill={lightText ? '#1A1A2E' : '#FFFFFF'} />
        {/* Spoon Head */}
        <path d="M98 48.5C98 56 94.8 61.5 91.5 61.5C88.2 61.5 85 56 85 48.5C85 41 88.2 35.5 91.5 35.5C94.8 35.5 98 41 98 48.5Z" />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-block ${className}`}>{brandmark}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="h-16 w-auto mb-2">{brandmark}</div>
        <div>
          <div className={`text-xl font-bold font-sora tracking-tight leading-tight ${lightText ? 'text-white' : 'text-charcoal'}`}>
            <span className="font-extrabold text-2xl">S</span>mart <span className="font-extrabold text-2xl">R</span>estaurant
          </div>
          <div className="text-[9px] uppercase tracking-[0.25em] font-medium text-primary mt-1">
            <span className="font-bold">E</span>xceeding <span className="font-bold">E</span>xpectation
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="h-full shrink-0 py-0.5">{brandmark}</div>
      <div className="flex flex-col justify-center leading-none">
        <div className={`text-lg sm:text-xl font-bold font-sora tracking-tight ${lightText ? 'text-white' : 'text-charcoal'}`}>
          <span className="font-extrabold text-xl sm:text-2xl">S</span>mart <span className="font-extrabold text-xl sm:text-2xl">R</span>estaurant
        </div>
        <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] font-medium text-primary mt-0.5 whitespace-nowrap">
          <span className="font-bold">E</span>xceeding <span className="font-bold">E</span>xpectation
        </div>
      </div>
    </div>
  );
}
