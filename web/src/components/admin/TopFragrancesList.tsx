import React from 'react';
import { Link } from 'react-router-dom';

export const TopFragrancesList: React.FC = () => {
  const fragrances = [
    {
      id: 'kl',
      name: 'Kashmir Lavender',
      category: 'French Organic Steam Mist',
      count: '18 sessions',
      initials: 'KL',
      icon: '🪻',
      trend: '+24%',
    },
    {
      id: 'rs',
      name: 'Mysore Sandalwood',
      category: 'Heritage Woodcraft Press',
      count: '12 sessions',
      initials: 'MS',
      icon: '🪵',
      trend: '+15%',
    },
    {
      id: 'fc',
      name: 'Fresh Crisp Cotton',
      category: 'Pure Morning Linen Vapor',
      count: '8 sessions',
      initials: 'FC',
      icon: '🧺',
      trend: '+8%',
    },
    {
      id: 'pn',
      name: 'Pure Neutral',
      category: 'Hypoallergenic Distilled',
      count: '4 sessions',
      initials: 'PN',
      icon: '✨',
      trend: 'Steady',
    },
  ];

  return (
    <div className="tower-panel tower-ranked-panel">
      <div className="tower-panel-header">
        <h2 className="tower-panel-title">Top Botanical Fragrances</h2>
        <Link to="/schedule" className="tower-panel-viewall">
          View catalog →
        </Link>
      </div>

      <div className="tower-ranked-list">
        {fragrances.map((f) => (
          <div key={f.id} className="tower-ranked-item">
            <div className="tower-ranked-avatar">
              <span className="tower-ranked-emoji">{f.icon}</span>
            </div>

            <div className="tower-ranked-info">
              <span className="tower-ranked-name">{f.name}</span>
              <span className="tower-ranked-category">{f.category}</span>
            </div>

            <div className="tower-ranked-value-group">
              <span className="tower-ranked-value">{f.count}</span>
              <span className="tower-ranked-trend">{f.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
