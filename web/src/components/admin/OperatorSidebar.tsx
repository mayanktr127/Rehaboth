import React from 'react';
import { Link } from 'react-router-dom';

interface OperatorSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  badges?: {
    escalations?: number;
    operations?: number;
    staff?: number;
  };
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  badgeDanger?: boolean;
  isRoute?: boolean;
  path?: string;
}

export const OperatorSidebar: React.FC<OperatorSidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed = false,
  onToggleCollapse,
  searchQuery,
  onSearchChange,
  badges = { escalations: 1, operations: 2, staff: 6 },
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '▤' },
    { id: 'operations', label: 'Tag Printing & Hub', icon: '🏷️', badge: badges.operations },
    { id: 'staff', label: 'Staff Directory', icon: '👥', badge: badges.staff },
    { id: 'wallet', label: 'Customer Wallet', icon: '₹' },
    { id: 'cache', label: 'Cache Registry', icon: '🔄' },
    { id: 'escalations', label: 'Escalations & QA', icon: '⚠️', badge: badges.escalations, badgeDanger: true },
    { id: 'termbase', label: 'Termbase Console', icon: 'Aa' },
    { id: 'cx', label: 'Journey Analytics', icon: '📊' },
  ];

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`tower-sidebar ${collapsed ? 'tower-sidebar--collapsed' : ''}`}>
      {/* 1. Header with Brand Emblem and Collapse Toggle */}
      <div className="tower-sidebar-header">
        <Link to="/admin" className="tower-brand-wrapper" onClick={() => onSelectTab('dashboard')}>
          <div className="tower-brand-icon">♨</div>
          {!collapsed && (
            <div>
              <div className="tower-brand-title">REHABOTH</div>
              <div className="tower-brand-sub">OPERATOR TOWER</div>
            </div>
          )}
        </Link>
        {onToggleCollapse && (
          <button
            type="button"
            className="tower-collapse-btn"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? '→' : '←'}
          </button>
        )}
      </div>

      {/* 2. Search Input */}
      {!collapsed && (
        <div className="tower-search-box">
          <span className="tower-search-icon">🔍</span>
          <input
            type="text"
            className="tower-search-input"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="tower-search-clear"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* 3. Primary Navigation List */}
      <nav className="tower-nav">
        {filteredItems.map((item) => {
          const isActive = activeTab === item.id;
          if (item.isRoute && item.path) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`tower-nav__item ${isActive ? 'tower-nav__item--active' : ''}`}
                title={item.label}
              >
                <span className="tower-nav-icon">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="tower-nav-text">{item.label}</span>
                    <span className="tower-nav-arrow">↗</span>
                  </>
                )}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              className={`tower-nav__item ${isActive ? 'tower-nav__item--active' : ''}`}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
            >
              <span className="tower-nav-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="tower-nav-text">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`tower-nav-badge ${
                        item.badgeDanger ? 'tower-nav-badge--danger' : ''
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* 4. Pinned Studio Shortcuts ("Favorites") */}
      {!collapsed && (
        <div className="tower-favorites">
          <div className="tower-favorites-title">PINNED STUDIOS</div>
          <div className="tower-favorites-list">
            <div className="tower-favorite-item tower-favorite-item--active">
              <span className="tower-favorite-dot" />
              <span className="tower-favorite-name">Indiranagar Atelier Hub</span>
              <span className="tower-favorite-badge">ACTIVE</span>
            </div>
            <div className="tower-favorite-item">
              <span className="tower-favorite-dot tower-favorite-dot--idle" />
              <span className="tower-favorite-name">Lavelle Road Studio</span>
              <span className="tower-favorite-meta">Corridor</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Bottom Pinned Operator Profile Card */}
      <div className="tower-sidebar-footer">
        <Link to="/" className="tower-website-link" title="Open Customer Website">
          <span className="tower-nav-icon">⌂</span>
          {!collapsed && <span>Customer Website ↗</span>}
        </Link>

        <div className="tower-user-card">
          <div className="tower-user-avatar">DS</div>
          {!collapsed && (
            <div className="tower-user-info">
              <div className="tower-user-name">Devendra Sharma</div>
              <div className="tower-user-role">Indiranagar Atelier Lead</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
