import React from 'react';

export default function Logo({ className = '', size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-accent ${className}`}
    >
      {/* Background soft glow or core */}
      <circle cx="50" cy="50" r="18" fill="currentColor" fillOpacity="0.08" />
      
      {/* Left Vertical Core Rail */}
      <path
        d="M32 28V72"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="opacity-40"
      />
      {/* Right Vertical Core Rail */}
      <path
        d="M68 28V72"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="opacity-40"
      />
      {/* Horizontal Bus Connection */}
      <path
        d="M32 50H68"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="opacity-50"
      />

      {/* Hexagonal Outer boundaries / system links */}
      <path
        d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
        className="opacity-30"
      />

      {/* Core Node Connections */}
      <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" className="opacity-20" />
      <line x1="20" y1="32" x2="80" y2="68" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" className="opacity-20" />
      <line x1="20" y1="68" x2="80" y2="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" className="opacity-20" />

      {/* Glowing Outer system nodes (vertices) */}
      <circle cx="50" cy="15" r="5" fill="currentColor" />
      <circle cx="80" cy="32" r="5" fill="currentColor" />
      <circle cx="80" cy="68" r="5" fill="currentColor" />
      <circle cx="50" cy="85" r="5" fill="currentColor" />
      <circle cx="20" cy="68" r="5" fill="currentColor" />
      <circle cx="20" cy="32" r="5" fill="currentColor" />

      {/* Central Inner Server Active Node (The Core Engines) */}
      <circle cx="50" cy="50" r="8.5" fill="currentColor" />
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2.5" className="opacity-40 animate-ping" style={{ transformOrigin: 'center', animationDuration: '3s' }} />
    </svg>
  );
}
