import React from 'react';

interface MetricStatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: {
    text: string;
    isUp?: boolean;
    isWarning?: boolean;
    isNeutral?: boolean;
  };
}

export const MetricStatCard: React.FC<MetricStatCardProps> = ({
  icon,
  label,
  value,
  trend,
}) => {
  return (
    <div className="tower-stat-card">
      <div className="tower-stat-card-top">
        <div className="tower-stat-icon-wrapper">
          <span className="tower-stat-icon">{icon}</span>
        </div>
        <span className="tower-stat-label">{label}</span>
      </div>

      <div className="tower-stat-value">{value}</div>

      {trend && (
        <div
          className={`tower-stat-trend ${
            trend.isWarning
              ? 'tower-stat-trend--warning'
              : trend.isNeutral
              ? 'tower-stat-trend--neutral'
              : trend.isUp
              ? 'tower-stat-trend--up'
              : 'tower-stat-trend--down'
          }`}
        >
          {trend.isUp && <span className="tower-trend-arrow">↗</span>}
          {!trend.isUp && !trend.isNeutral && !trend.isWarning && (
            <span className="tower-trend-arrow">↘</span>
          )}
          <span>{trend.text}</span>
        </div>
      )}
    </div>
  );
};
