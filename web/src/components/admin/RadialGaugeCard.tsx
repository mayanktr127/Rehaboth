import React from 'react';

interface RadialGaugeCardProps {
  percentage?: number;
  label?: string;
  sublabel?: string;
}

export const RadialGaugeCard: React.FC<RadialGaugeCardProps> = ({
  percentage = 96,
  label = 'On-Time Valet Rate',
  sublabel = 'Goal: 98% (Indiranagar Hub)',
}) => {
  // Semi-circle gauge SVG calculations
  // Arc from 180 deg to 0 deg (top half circle)
  const radius = 54;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // Half-circle circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="tower-stat-card tower-gauge-card">
      <div className="tower-gauge-content">
        <div className="tower-gauge-svg-wrapper">
          <svg viewBox="0 0 140 80" className="tower-gauge-svg">
            {/* Background Track Arc */}
            <path
              d="M 16 70 A 54 54 0 0 1 124 70"
              fill="none"
              stroke="#f2e8dc"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Active Value Arc */}
            <path
              d="M 16 70 A 54 54 0 0 1 124 70"
              fill="none"
              stroke="var(--color-primary, #b86538)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="tower-gauge-active-path"
            />
          </svg>

          <div className="tower-gauge-center-text">
            <span className="tower-gauge-number">{percentage}%</span>
            <span className="tower-gauge-label">{label}</span>
          </div>
        </div>

        <div className="tower-gauge-footer">{sublabel}</div>
      </div>
    </div>
  );
};
