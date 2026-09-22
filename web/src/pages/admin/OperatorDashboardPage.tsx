import React, { useState } from 'react';
import '../../styles/admin/operator-dashboard.css';
import { OperatorSidebar } from '../../components/admin/OperatorSidebar';
import { OperatorTopBar } from '../../components/admin/OperatorTopBar';
import { MetricStatCard } from '../../components/admin/MetricStatCard';
import { RadialGaugeCard } from '../../components/admin/RadialGaugeCard';
import { CustodyThroughputChart } from '../../components/admin/CustodyThroughputChart';
import { CustodyProgressionPanel } from '../../components/admin/CustodyProgressionPanel';
import { TopFragrancesList } from '../../components/admin/TopFragrancesList';
import { ActiveSessionsTable } from '../../components/admin/ActiveSessionsTable';
import { WorkspacePanel } from './WorkspacePanel';

export interface OperatorOrder {
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

interface OperatorDashboardPageProps {
  initialTab?: string;
}

export const OperatorDashboardPage: React.FC<OperatorDashboardPageProps> = ({
  initialTab = 'dashboard',
}) => {
  const [role, setRole] = useState<'super_admin' | 'admin' | 'store_manager'>('super_admin');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [orders, setOrders] = useState<OperatorOrder[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState('REH-2904');
  const [searchQuery, setSearchQuery] = useState('');
  const [scope, setScope] = useState('month');
  const [statusNotice, setStatusNotice] = useState('');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newGarmentCount, setNewGarmentCount] = useState(3);
  const [newFragrance, setNewFragrance] = useState('Kashmir Lavender');

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
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const handleCreateNewSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim()) return;

    const newOrderNum = `REH-${Math.floor(2000 + Math.random() * 8000)}`;
    const newOrder: OperatorOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: newOrderNum,
      customerName: newCustomerName.trim(),
      garmentCount: newGarmentCount,
      fragrance: newFragrance,
      stage: 0,
      status: STAGES[0],
      holdDamagedItems: false,
    };

    setOrders([newOrder, ...orders]);
    setSelectedOrderId(newOrderNum);
    setShowNewSessionModal(false);
    setNewCustomerName('');
    setStatusNotice(`New wardrobe session #${newOrderNum} logged for ${newOrder.customerName}.`);
    setTimeout(() => setStatusNotice(''), 4000);
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.fragrance.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  // Calculate real counts for badges
  const damagedHoldCount = orders.filter((o) => o.holdDamagedItems).length;

  return (
    <div className="tower-page">
      {/* 1. Left Sidebar with Harbor layout (search, badges, favorites, operator card) */}
      <OperatorSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery('');
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        badges={{
          escalations: damagedHoldCount,
          operations: 2,
          staff: 6,
        }}
      />

      {/* 2. Main Console */}
      <main className="tower-content">
        {/* Top Bar with greeting, date, scope, alerts bell & action */}
        <OperatorTopBar
          operatorName="Devendra"
          scope={scope}
          onScopeChange={setScope}
          onNewSession={() => setShowNewSessionModal(true)}
          onExportReport={() => {
            alert('Exporting Indiranagar Atelier custody log (CSV)...');
          }}
          activeRole={role}
          onRoleChange={(r) => setRole(r as any)}
        />

        {/* Global Action Notification Banner */}
        {statusNotice && (
          <div
            style={{
              padding: '12px 18px',
              background: '#e8f5e9',
              color: '#2e7d32',
              border: '1px solid #c8e6c9',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '0.86rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(46, 125, 50, 0.08)',
            }}
          >
            ✓ {statusNotice}
          </div>
        )}

        {/* Main Dashboard Views */}
        {activeTab === 'dashboard' ? (
          <>
            {/* 3. Stat Row: 4 Metric Cards + 1 Radial Gauge Card */}
            <div className="tower-stat-row-5">
              <MetricStatCard
                icon="🧺"
                label="Active Orders"
                value={orders.length}
                trend={{ text: '12% vs last cycle', isUp: true }}
              />

              <MetricStatCard
                icon="♨️"
                label="In Atelier Custody"
                value={orders.filter((o) => o.stage >= 2 && o.stage < 7).length}
                trend={{ text: 'Normal flow', isNeutral: true }}
              />

              <MetricStatCard
                icon="⚠️"
                label="At Risk / Hold"
                value={damagedHoldCount}
                trend={{ text: '1 requires phone call', isWarning: true }}
              />

              <MetricStatCard
                icon="📍"
                label="Care Studios"
                value="02"
                trend={{ text: '100% operational', isUp: true }}
              />

              <RadialGaugeCard
                percentage={96}
                label="On-Time Delivery"
                sublabel="Goal: 98% (Indiranagar)"
              />
            </div>

            {/* 4. Middle Row: Left Throughput Line Chart + Right Custody Progression */}
            <div className="tower-middle-grid">
              <CustodyThroughputChart />

              <CustodyProgressionPanel
                orders={orders}
                selectedOrder={selectedOrder}
                onAdvanceStage={handleAdvanceStage}
                stages={STAGES}
              />
            </div>

            {/* 5. Bottom Row: Left Top Fragrances List + Right Active Sessions Table */}
            <div className="tower-bottom-grid">
              <TopFragrancesList />

              <ActiveSessionsTable
                orders={filteredOrders}
                selectedOrderId={selectedOrderId}
                onSelectOrder={setSelectedOrderId}
                onViewAll={searchQuery ? () => setSearchQuery('') : undefined}
              />
            </div>
          </>
        ) : (
          /* Sub-workspaces (Tag Printing, Staff, Wallet, Cache, Escalations) */
          <WorkspacePanel
            activeTab={activeTab}
            orderId={selectedOrder.orderNumber}
            role={role}
          />
        )}
      </main>

      {/* New Wardrobe Session Modal */}
      {showNewSessionModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 23, 20, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setShowNewSessionModal(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e6dcce)',
              borderRadius: '20px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(58, 49, 40, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif, 'Fraunces', serif)",
                  fontSize: '1.35rem',
                  margin: 0,
                  color: 'var(--color-foreground, #1a1714)',
                }}
              >
                Log New Wardrobe Session
              </h3>
              <button
                type="button"
                onClick={() => setShowNewSessionModal(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: 'var(--color-muted-foreground, #7d7265)',
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewSession} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    color: 'var(--color-muted-foreground, #7d7265)',
                    marginBottom: '6px',
                  }}
                >
                  CUSTOMER FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Varma"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="tower-search-input"
                  style={{
                    border: '1.5px solid var(--color-border, #e6dcce)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    backgroundColor: '#faf5ee',
                  }}
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    color: 'var(--color-muted-foreground, #7d7265)',
                    marginBottom: '6px',
                  }}
                >
                  GARMENT COUNT
                </label>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={newGarmentCount}
                  onChange={(e) => setNewGarmentCount(parseInt(e.target.value) || 1)}
                  className="tower-search-input"
                  style={{
                    border: '1.5px solid var(--color-border, #e6dcce)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    backgroundColor: '#faf5ee',
                  }}
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    color: 'var(--color-muted-foreground, #7d7265)',
                    marginBottom: '6px',
                  }}
                >
                  CHOSEN BOTANICAL FRAGRANCE
                </label>
                <select
                  value={newFragrance}
                  onChange={(e) => setNewFragrance(e.target.value)}
                  className="tower-select"
                  style={{
                    width: '100%',
                    border: '1.5px solid var(--color-border, #e6dcce)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    backgroundColor: '#faf5ee',
                  }}
                >
                  <option value="Kashmir Lavender">Kashmir Lavender (Organic French Steam)</option>
                  <option value="Mysore Royal Sandalwood">Mysore Royal Sandalwood (Formal Heritage)</option>
                  <option value="Fresh Crisp Cotton">Fresh Crisp Cotton (Morning Linen Mist)</option>
                  <option value="Pure Neutral">Pure Neutral (Hypoallergenic Distilled)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="tower-btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowNewSessionModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tower-btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Confirm Intake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
