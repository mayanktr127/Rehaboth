import React, { useState } from 'react';

interface OperatorTopBarProps {
  operatorName?: string;
  scope: string;
  onScopeChange: (scope: string) => void;
  onNewSession?: () => void;
  onExportReport?: () => void;
  activeRole?: string;
  onRoleChange?: (role: string) => void;
}

export const OperatorTopBar: React.FC<OperatorTopBarProps> = ({
  operatorName = 'Devendra',
  scope,
  onScopeChange,
  onNewSession,
  onExportReport,
  activeRole = 'super_admin',
  onRoleChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format today's date cleanly
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date().toLocaleDateString('en-GB', options);
  };

  const notifications = [
    {
      id: 'notif-1',
      type: 'warning',
      title: 'Damaged Hold: #REH-2904',
      detail: 'Tear on left lapel of charcoal wool blazer. Call customer before steam press.',
      time: '12m ago',
    },
    {
      id: 'notif-2',
      type: 'info',
      title: 'Pending Tag Printing',
      detail: '2 piece barcode labels waiting for Indiranagar Hub batch print.',
      time: '45m ago',
    },
    {
      id: 'notif-3',
      type: 'success',
      title: 'On-Time Target Met',
      detail: '96% on-time valet rate achieved across Central Bangalore corridor.',
      time: '2h ago',
    },
  ];

  return (
    <header className="tower-topbar">
      {/* Left: Personalized Greeting & Date */}
      <div className="tower-topbar-left">
        <h1 className="tower-greeting">
          {getGreeting()}, {operatorName}
        </h1>
        <p className="tower-date">{getFormattedDate()}</p>
      </div>

      {/* Right: Role, Scope Selector, Notifications & Primary Action */}
      <div className="tower-topbar-right">
        {onRoleChange && (
          <div className="tower-scope-group">
            <span className="tower-scope-label">Role:</span>
            <select
              className="tower-select"
              value={activeRole}
              onChange={(e) => onRoleChange(e.target.value)}
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Cluster Admin</option>
              <option value="store_manager">Hub Manager</option>
            </select>
          </div>
        )}

        <div className="tower-scope-group">
          <span className="tower-scope-icon">📅</span>
          <select
            className="tower-select"
            value={scope}
            onChange={(e) => onScopeChange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>

        {/* Notification Bell with Popover */}
        <div className="tower-notif-container">
          <button
            type="button"
            className="tower-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Studio Alerts"
            aria-label="Studio Alerts"
          >
            <span className="tower-icon">🔔</span>
            <span className="tower-notif-badge" />
          </button>

          {showNotifications && (
            <div className="tower-notif-popover">
              <div className="tower-notif-header">
                <span className="tower-notif-title">Studio Alerts</span>
                <span className="tower-notif-count">{notifications.length} New</span>
              </div>
              <div className="tower-notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`tower-notif-item tower-notif-item--${n.type}`}>
                    <div className="tower-notif-item-title">{n.title}</div>
                    <div className="tower-notif-item-detail">{n.detail}</div>
                    <div className="tower-notif-item-time">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button: Export / New Session */}
        {onExportReport && (
          <button
            type="button"
            className="tower-btn-secondary"
            onClick={onExportReport}
          >
            Export Log
          </button>
        )}

        {onNewSession && (
          <button
            type="button"
            className="tower-btn-primary"
            onClick={onNewSession}
          >
            + New Session
          </button>
        )}
      </div>
    </header>
  );
};
