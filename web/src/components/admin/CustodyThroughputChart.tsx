import React, { useState } from 'react';

export const CustodyThroughputChart: React.FC = () => {
  const [chartScope, setChartScope] = useState<'weekly' | 'monthly'>('weekly');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const weeklyData = [
    { label: 'Mon', count: 6 },
    { label: 'Tue', count: 8 },
    { label: 'Wed', count: 5 },
    { label: 'Thu', count: 9 },
    { label: 'Fri', count: 12 },
    { label: 'Sat', count: 15 },
    { label: 'Sun', count: 11 },
  ];

  const monthlyData = [
    { label: 'Feb', count: 28 },
    { label: 'Mar', count: 35 },
    { label: 'Apr', count: 32 },
    { label: 'May', count: 42 },
    { label: 'Jun', count: 48 },
    { label: 'Jul', count: 55 },
    { label: 'Aug', count: 64 },
  ];

  const activePoints = chartScope === 'weekly' ? weeklyData : monthlyData;
  const maxVal = Math.max(...activePoints.map((p) => p.count));
  const minVal = 0;

  // Chart dimensions
  const width = 520;
  const height = 180;
  const paddingX = 36;
  const paddingTop = 20;
  const paddingBottom = 30;

  const getCoordinates = (index: number, value: number) => {
    const x = paddingX + (index / (activePoints.length - 1)) * (width - paddingX * 2);
    const y =
      height -
      paddingBottom -
      ((value - minVal) / (maxVal - minVal || 1)) * (height - paddingTop - paddingBottom);
    return { x, y };
  };

  const points = activePoints.map((p, idx) => getCoordinates(idx, p.count));

  // Build SVG path
  const linePath = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    height - paddingBottom
  } L ${points[0].x} ${height - paddingBottom} Z`;

  return (
    <div className="tower-panel tower-throughput-panel">
      <div className="tower-panel-header">
        <div>
          <h2 className="tower-panel-title">Custody Throughput</h2>
          <span className="tower-panel-sub">Finished garments processed in studio</span>
        </div>

        <div className="tower-panel-controls">
          <select
            className="tower-select tower-select--sm"
            value={chartScope}
            onChange={(e) => {
              setChartScope(e.target.value as any);
              setHoverIndex(null);
            }}
          >
            <option value="weekly">Weekly View</option>
            <option value="monthly">Monthly View</option>
          </select>
        </div>
      </div>

      {/* Large Headline Metric */}
      <div className="tower-throughput-metric-row">
        <span className="tower-throughput-number">
          {chartScope === 'weekly' ? '66' : '304'} Garments
        </span>
        <span className="tower-stat-trend tower-stat-trend--up">
          <span className="tower-trend-arrow">↗</span> 8.4% vs last cycle
        </span>
      </div>

      {/* SVG Line Chart */}
      <div className="tower-chart-svg-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="tower-chart-svg">
          <defs>
            <linearGradient id="throughputAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary, #b86538)" stopOpacity="0.28" />
              <stop offset="90%" stopColor="var(--color-primary, #b86538)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={height - paddingBottom}
            x2={width - paddingX}
            y2={height - paddingBottom}
            stroke="#ece3d6"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={(height - paddingTop - paddingBottom) / 2 + paddingTop}
            x2={width - paddingX}
            y2={(height - paddingTop - paddingBottom) / 2 + paddingTop}
            stroke="#f5eee3"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#throughputAreaGradient)" />

          {/* Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-primary, #b86538)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((pt, idx) => {
            const isHovered = hoverIndex === idx;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#ffffff' : 'var(--color-primary, #b86538)'}
                  stroke="var(--color-primary, #b86538)"
                  strokeWidth={isHovered ? 3 : 2}
                  className="tower-chart-point"
                />
                {/* X-axis label */}
                <text
                  x={pt.x}
                  y={height - 10}
                  textAnchor="middle"
                  className="tower-chart-label"
                >
                  {activePoints[idx].label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoverIndex !== null && (
          <div
            className="tower-chart-tooltip"
            style={{
              left: `${(points[hoverIndex].x / width) * 100}%`,
              top: `${(points[hoverIndex].y / height) * 100}%`,
            }}
          >
            <strong>{activePoints[hoverIndex].count} Garments</strong>
            <span>{activePoints[hoverIndex].label}</span>
          </div>
        )}
      </div>
    </div>
  );
};
