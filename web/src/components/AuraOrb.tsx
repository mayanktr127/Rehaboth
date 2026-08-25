import React from 'react';

interface AuraOrbProps {
  size?: number;
  opacity?: number;
  className?: string;
}

export const AuraOrb: React.FC<AuraOrbProps> = ({
  size = 180,
  opacity = 0.8,
  className = '',
}) => {
  return (
    <div
      className={`aura-orb-container ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        opacity,
        background: '#f5cba7',
        boxShadow: '0 8px 30px rgba(184, 101, 56, 0.15)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: '50%',
          backgroundColor: '#aed6f1',
          opacity: 0.8,
          filter: 'blur(16px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: '50%',
          backgroundColor: '#d7bde2',
          opacity: 0.8,
          filter: 'blur(16px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: '50%',
          backgroundColor: '#f9e79f',
          opacity: 0.85,
          filter: 'blur(12px)',
        }}
      />
    </div>
  );
};
