import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/operator-dashboard.css';
import { WorkspacePanel } from './WorkspacePanel';
import { runtimeConfig } from '../../services/runtimeConfig';

interface OperatorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  garmentCount: number;
  fragrance: string;
  stage: number;
  status: string;
  holdDamagedItems: boolean;
  damageNote?: string;
}

const STAGES = [
  'Order Placed',
  'Bag Picked Up',
  'At Hub Processing',
  'Ironing In Progress',
  'Quality Control',
  'Out for Delivery',
  'Secure Handover',
  'Delivered',
];

const INITIAL_ORDERS: OperatorOrder[] = [
  {
    id: 'ord_1',
    orderNumber: 'REH-2904',
    customerName: 'Devendra Sharma',
    garmentCount: 4,
    fragrance: 'Kashmir Lavender',
    stage: 3,
    status: 'At Hub Processing',
    holdDamagedItems: true,
    damageNote: 'Tear on left lapel of charcoal wool blazer. Call customer before steam press.',
  },
  {
    id: 'ord_2',
    orderNumber: 'REH-3110',
    customerName: 'Priya Sundaram',
    garmentCount: 6,
    fragrance: 'Fresh Crisp Cotton',
    stage: 2,
    status: 'Bag Picked Up',
    holdDamagedItems: false,
  },
  {
    id: 'ord_3',
    orderNumber: 'REH-3287',
    customerName: 'Arvind Swamy',
    garmentCount: 2,
    fragrance: 'Mysore Royal Sandalwood',
    stage: 5,
    status: 'Out for Delivery',
    holdDamagedItems: false,
  },
  {
    id: 'ord_4',
    orderNumber: 'REH-2851',
    customerName: 'Nandita Das',
    garmentCount: 8,
    fragrance: 'Pure Neutral',
    stage: 7,
    status: 'Delivered',
    holdDamagedItems: false,
  },
];

export const OperatorDashboardPage: React.FC = () => {
  const [role, setRole] = useState<'super_admin' | 'admin' | 'store_manager'>('super_admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<OperatorOrder[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState('REH-2904');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusNotice, setStatusNotice] = useState('');

  const selectedOrder =
    orders.find((o) => o.orderNumber === selectedOrderId) || orders[0];

  const handleAdvanceStage = () => {
    if (!selectedOrder || selectedOrder.stage >= STAGES.length - 1) return;

    const nextStage = selectedOrder.stage + 1;
    const nextStatus = STAGES[nextStage];

    setOrders((prev) =>
      prev.map((o) =>
        o.orderNumber === selectedOrder.orderNumber
          ? { ...o, stage: nextStage, status: nextStatus }
          : o
      )
    );
    setStatusNotice(`Order #${selectedOrder.orderNumber} advanced to: ${nextStatus}.`);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tower-page">
      {/* Left Navigation Sidebar */}
      <aside className="tower-sidebar">
        <div className="tower-brand">REHABOTH</div>
        <div className="tower-brand-sub">COMMAND TOWER • ATELIER HUB</div>

        <nav className="tower-nav">
          <button
            type="button"
            className={`tower-nav__item ${activeTab === 'dashboard' ? 'tower-nav__item--active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="tower-nav-icon">▤</span> Dashboard
          </button>
          <button
            type="button"
            className={`tower-nav__item ${activeTab === 'operations' ? 'tower-nav__item--active' : ''}`}
            onClick={() => setActiveTab('operations')}
          >
            <span className="tower-nav-icon">🏷️</span> Tag Printing &amp; Hub
          </button>
          <button
            type="button"
            className={`tower-nav__item ${activeTab === 'staff' ? 'tower-nav__item--active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <span className="tower-nav-icon">👥</span> Staff Directory
          </button>
          <button
            type="button"
            className={`tower-nav__item ${activeTab === 'wallet' ? 'tower-nav__item--active' : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            <span className="tower-nav-icon">₹</span> Customer Wallet
          </button>
          <button
            type="button"
            className={`tower-nav__item ${activeTab === 'cache' ? 'tower-nav__item--active' : ''}`}
            onClick={() => setActiveTab('cache')}
          >
            <span className="tower-nav-icon">🔄</span> Cache Registry
          </button>
          <button
            type="button"
            className={`tower-nav__item ${activeTab === 'escalations' ? 'tower-nav__item--active' : ''}`}
            onClick={() => setActiveTab('escalations')}
          >
            <span className="tower-nav-icon">⚠️</span> Escalations &amp; QA
          </button>
          <Link to="/admin/termbase" style={{ textDecoration: 'none' }}>
            <div className="tower-nav__item">
              <span className="tower-nav-icon">Aa</span> Termbase Console ↗
            </div>
          </Link>
          <Link to="/admin/customer-experience" style={{ textDecoration: 'none' }}>
            <div className="tower-nav__item">
              <span className="tower-nav-icon">📊</span> Journey Analytics ↗
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: 'none', marginTop: 'auto' }}>
            <div className="tower-nav__item" style={{ color: 'var(--color-primary, #b86538)', fontWeight: 700 }}>
              <span className="tower-nav-icon">⌂</span> Customer Website ↗
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Command Console */}
      <main className="tower-content">
        {/* Top Header Bar */}
        <div className="tower-top-header">
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-primary, #b86538)', letterSpacing: 2, fontWeight: 700 }}>
              OPERATOR COMMAND • INDIRANAGAR ATELIER STUDIO
            </div>
            <h1 className="tower-header-title">
              {activeTab === 'dashboard'
                ? 'Active Wardrobe Custody'
                : activeTab.toUpperCase() + ' WORKSPACE'}
            </h1>
            <p className="tower-header-sub">
              Real-time garment custody pipeline, technician assignments, and studio controls.
            </p>
          </div>

          <div className="tower-header-meta">
            <span style={{ color: 'var(--color-muted-foreground, #7d7265)', fontSize: '0.8rem', fontWeight: 600 }}>Active Role:</span>
            <select
              className="tower-role-select"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="super_admin">SUPER ADMIN (All Studios)</option>
              <option value="admin">ADMIN (Cluster Oversight)</option>
              <option value="store_manager">STORE MANAGER (Hub Intake)</option>
            </select>
          </div>
        </div>

        {statusNotice ? (
          <div style={{ padding: '10px 16px', background: '#e8f5e9', color: '#2e7d32', border: '1px solid #c8e6c9', borderRadius: 8, marginBottom: 20, fontSize: '0.85rem', fontWeight: 600 }}>
            ✓ {statusNotice}
          </div>
        ) : null}

        {/* Core KPI Stat Counters */}
        <div className="tower-kpi-grid">
          <div className="tower-kpi-card">
            <span>ACTIVE ORDERS</span>
            <strong>{orders.length}</strong>
          </div>
          <div className="tower-kpi-card">
            <span>IN ATELIER CUSTODY</span>
            <strong>03</strong>
          </div>
          <div className="tower-kpi-card">
            <span>AT RISK / DAMAGED HOLD</span>
            <strong style={{ color: '#c62828' }}>01</strong>
          </div>
          <div className="tower-kpi-card">
            <span>CARE STUDIOS</span>
            <strong>02</strong>
          </div>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'dashboard' ? (
          <>
            {/* Selected Order Stepper Card */}
            <div className="tower-card">
              <div className="tower-card-title">
                <div>
                  <span>SELECTED SESSION: #{selectedOrder.orderNumber}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 400, marginLeft: 12 }}>
                    {selectedOrder.customerName} • {selectedOrder.garmentCount} Garments • Fragrance: {selectedOrder.fragrance}
                  </span>
                </div>
                <button
                  type="button"
                  className="tower-btn"
                  onClick={handleAdvanceStage}
                  disabled={selectedOrder.stage >= STAGES.length - 1}
                >
                  {selectedOrder.stage >= STAGES.length - 1
                    ? 'ORDER COMPLETED'
                    : `ADVANCE TO: ${STAGES[selectedOrder.stage + 1]?.toUpperCase()}`}
                </button>
              </div>

              {/* Custody Stage Stepper */}
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary, #b86538)', letterSpacing: 1.5, fontWeight: 700, marginBottom: 10 }}>
                CUSTODY PROGRESSION • STAGE {selectedOrder.stage + 1} OF {STAGES.length}
              </div>

              <div className="tower-stepper">
                {STAGES.map((stg, idx) => {
                  const isActive = idx <= selectedOrder.stage;
                  const isCurrent = idx === selectedOrder.stage;
                  return (
                    <div key={stg} className="tower-stepper-item">
                      <div className={`tower-stepper-dot ${isActive ? 'tower-stepper-dot--active' : ''}`} />
                      <span className={`tower-stepper-label ${isCurrent ? 'tower-stepper-label--active' : ''}`}>
                        {stg}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Damaged Hold Banner */}
              {selectedOrder.holdDamagedItems ? (
                <div style={{ marginTop: 24, padding: '14px 18px', background: '#fff3e0', border: '1.5px solid #ffb74d', borderRadius: 10, color: '#b76400', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#b76400' }}>⚠️ HOLD DAMAGED ITEMS &amp; CONFIRM BEFORE PROCESSING: ENABLED</strong>
                  <p style={{ margin: '4px 0 0', color: '#6d4200', fontSize: '0.82rem' }}>
                    {selectedOrder.damageNote || 'Customer reported pre-existing garment wear. Care team must call the customer before steam press.'}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Orders Ledger Table */}
            <div className="tower-card">
              <div className="tower-card-title">
                <span>Active Wardrobe Sessions</span>
                <input
                  className="tower-input"
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: 280, fontSize: '0.8rem' }}
                />
              </div>

              <table className="tower-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>GARMENTS</th>
                    <th>FRAGRANCE</th>
                    <th>CURRENT STAGE</th>
                    <th>DAMAGED HOLD</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => {
                    const isSelected = ord.orderNumber === selectedOrder.orderNumber;
                    return (
                      <tr
                        key={ord.id}
                        style={{
                          background: isSelected ? 'rgba(184,101,56,0.06)' : undefined,
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedOrderId(ord.orderNumber)}
                      >
                        <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary, #b86538)' }}>
                          #{ord.orderNumber}
                        </td>
                        <td style={{ fontWeight: 600 }}>{ord.customerName}</td>
                        <td>{ord.garmentCount} items</td>
                        <td>{ord.fragrance}</td>
                        <td>
                          <span className="tower-badge tower-badge--gold">{ord.status}</span>
                        </td>
                        <td>
                          {ord.holdDamagedItems ? (
                            <span className="tower-badge tower-badge--red">HOLD ACTIVE</span>
                          ) : (
                            <span style={{ color: 'var(--color-muted-foreground, #7d7265)', fontSize: '0.75rem' }}>None</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="tower-btn tower-btn--outline"
                            style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrderId(ord.orderNumber);
                            }}
                          >
                            {isSelected ? 'Selected' : 'Inspect'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <WorkspacePanel
            activeTab={activeTab}
            orderId={selectedOrder.orderNumber}
            role={role}
          />
        )}
      </main>
    </div>
  );
};
