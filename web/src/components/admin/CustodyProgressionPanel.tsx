import React from 'react';

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

interface CustodyProgressionPanelProps {
  orders: OperatorOrder[];
  selectedOrder: OperatorOrder;
  onAdvanceStage: () => void;
  stages: string[];
}

export const CustodyProgressionPanel: React.FC<CustodyProgressionPanelProps> = ({
  orders,
  selectedOrder,
  onAdvanceStage,
  stages,
}) => {
  // Categorize orders into Harbor-style stacked progress categories
  const categories = [
    {
      id: 'delivered',
      label: 'Delivered & Vaulted',
      stagesCovered: [7], // Stage 8: Delivered
      color: 'var(--color-primary, #b86538)',
    },
    {
      id: 'transit',
      label: 'Out for Valet Delivery',
      stagesCovered: [5, 6], // Stages 6, 7
      color: 'var(--color-gold-mid, #b8860b)',
    },
    {
      id: 'steam',
      label: 'Steam & Hand Pressing',
      stagesCovered: [3, 4], // Stages 4, 5
      color: '#d4af37',
    },
    {
      id: 'intake',
      label: 'Hub Intake & Diagnostics',
      stagesCovered: [0, 1, 2], // Stages 1, 2, 3
      color: '#c9b197',
    },
  ];

  const total = orders.length || 1;

  const categoryCounts = categories.map((cat) => {
    const matching = orders.filter((o) => cat.stagesCovered.includes(o.stage));
    const count = matching.length;
    const pct = Math.round((count / total) * 100);
    return { ...cat, count, pct };
  });

  return (
    <div className="tower-panel tower-progression-panel">
      <div className="tower-panel-header">
        <div>
          <h2 className="tower-panel-title">Custody Progression</h2>
          <span className="tower-panel-sub">{orders.length} active sessions in studio pipeline</span>
        </div>

        <button
          type="button"
          className="tower-btn-primary tower-btn-primary--sm"
          onClick={onAdvanceStage}
          disabled={selectedOrder.stage >= stages.length - 1}
          title={
            selectedOrder.stage >= stages.length - 1
              ? 'Order Delivered'
              : `Advance to next stage`
          }
        >
          {selectedOrder.stage >= stages.length - 1
            ? 'Delivered'
            : `Advance: ${stages[selectedOrder.stage + 1]?.toUpperCase()}`}
        </button>
      </div>

      {/* Selected Order Stage Micro-Bar */}
      <div className="tower-progression-session-chip">
        <span className="tower-progression-chip-tag">CURRENTLY INSPECTING:</span>
        <span className="tower-progression-chip-order">#{selectedOrder.orderNumber}</span>
        <span className="tower-progression-chip-meta">
          {selectedOrder.customerName} • {selectedOrder.garmentCount} Garments • {selectedOrder.status}
        </span>
      </div>

      {/* Damaged Hold Alert (Preserved from original dashboard) */}
      {selectedOrder.holdDamagedItems && (
        <div className="tower-damaged-hold-banner">
          <div className="tower-damaged-hold-title">
            ⚠️ HOLD DAMAGED ITEMS &amp; CONFIRM BEFORE PROCESSING
          </div>
          <div className="tower-damaged-hold-text">
            {selectedOrder.damageNote || 'Customer reported garment wear. Call customer before steam press.'}
          </div>
        </div>
      )}

      {/* Stacked Categories List with Progress Bars */}
      <div className="tower-progression-list">
        {categoryCounts.map((cat) => (
          <div key={cat.id} className="tower-progression-item">
            <div className="tower-progression-item-top">
              <span className="tower-progression-item-label">{cat.label}</span>
              <span className="tower-progression-item-count">
                {cat.count} <small>({cat.pct}%)</small>
              </span>
            </div>
            <div className="tower-progression-track">
              <div
                className="tower-progression-fill"
                style={{
                  width: `${cat.pct}%`,
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats Matching Harbor layout */}
      <div className="tower-progression-footer-stats">
        <div className="tower-progression-footer-stat">
          <strong className="tower-progression-footer-val">96%</strong>
          <span className="tower-progression-footer-lbl">On-time delivery</span>
        </div>
        <div className="tower-progression-footer-divider" />
        <div className="tower-progression-footer-stat">
          <strong className="tower-progression-footer-val">1.4 days</strong>
          <span className="tower-progression-footer-lbl">Avg. turnaround time</span>
        </div>
      </div>
    </div>
  );
};
