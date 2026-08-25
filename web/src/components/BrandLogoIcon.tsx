import React from 'react';

interface BrandLogoIconProps {
  size?: number;
  className?: string;
}

export const BrandLogoIcon: React.FC<BrandLogoIconProps> = ({ size = 38, className = '' }) => {
  return (
    <div
      className={`brand-logo-icon ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #b86538 0%, #8c411d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(184, 101, 56, 0.28)',
        border: '1.5px solid rgba(255, 255, 255, 0.35)',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Inner Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '60%',
          height: '60%',
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '50%',
          filter: 'blur(4px)',
        }}
      />
      
      {/* Elegant Atelier Monogram / Steam Glyph */}
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Steam Wisps */}
        <path
          d="M7 4C7 2.89543 7.89543 2 9 2C10.1046 2 11 2.89543 11 4C11 5.10457 10.1046 6 9 6"
          stroke="#fffaf4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M13 5C13 3.89543 13.8954 3 15 3C16.1046 3 17 3.89543 17 5C17 6.10457 16.1046 7 15 7"
          stroke="#fde8d7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Garment / Atelier Crest Silhouette */}
        <path
          d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V10Z"
          stroke="#ffffff"
          strokeWidth="1.8"
          fill="rgba(255, 255, 255, 0.12)"
        />
        {/* Stylized RS Monogram */}
        <text
          x="12"
          y="18"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="8.5"
          fontFamily="Playfair Display, Georgia, serif"
          fontWeight="800"
          letterSpacing="0.5"
        >
          RS
        </text>
      </svg>
    </div>
  );
};
