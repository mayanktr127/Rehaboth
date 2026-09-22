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

interface ActiveSessionsTableProps {
  orders: OperatorOrder[];
  selectedOrderId: string;
  onSelectOrder: (orderNumber: string) => void;
  onViewAll?: () => void;
}

export const ActiveSessionsTable: React.FC<ActiveSessionsTableProps> = ({
  orders,
  selectedOrderId,
  onSelectOrder,
  onViewAll,
}) => {
  // Helper to extract customer initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to determine status pill color style
  const getStatusPillClass = (status: string, stage: number) => {
    if (stage >= 7) return 'tower-status-pill--completed'; // Delivered
    if (stage >= 5) return 'tower-status-pill--transit'; // Out for Delivery
    if (stage >= 3) return 'tower-status-pill--steam'; // Ironing In Progress
    return 'tower-status-pill--intake'; // Intake & Bag Picked Up
  };

  return (
    <div className="tower-panel tower-sessions-panel">
      <div className="tower-panel-header">
        <div>
          <h2 className="tower-panel-title">Recent Wardrobe Sessions</h2>
          <span className="tower-panel-sub">Live studio custody ledger</span>
        </div>

        {onViewAll && (
          <button
            type="button"
            className="tower-panel-viewall tower-panel-viewall--btn"
            onClick={onViewAll}
          >
            Reset filter →
          </button>
        )}
      </div>

      <div className="tower-table-responsive">
        <table className="tower-data-table">
          <thead>
            <tr>
              <th>ORDER</th>
              <th>CUSTOMER</th>
              <th>GARMENTS</th>
              <th>FRAGRANCE</th>
              <th>STAGE STATUS</th>
              <th>DAMAGED HOLD</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => {
              const isSelected = ord.orderNumber === selectedOrderId;
              const initials = getInitials(ord.customerName);

              return (
                <tr
                  key={ord.id}
                  className={`tower-data-row ${isSelected ? 'tower-data-row--selected' : ''}`}
                  onClick={() => onSelectOrder(ord.orderNumber)}
                >
                  <td className="tower-cell-order">
                    #{ord.orderNumber}
                  </td>

                  <td className="tower-cell-customer">
                    <div className="tower-customer-cell-wrapper">
                      <div className="tower-customer-avatar">{initials}</div>
                      <span className="tower-customer-name">{ord.customerName}</span>
                    </div>
                  </td>

                  <td className="tower-cell-garments">
                    {ord.garmentCount} items
                  </td>

                  <td className="tower-cell-fragrance">
                    {ord.fragrance}
                  </td>

                  <td className="tower-cell-status">
                    <span
                      className={`tower-status-pill ${getStatusPillClass(
                        ord.status,
                        ord.stage
                      )}`}
                    >
                      <span className="tower-status-dot" />
                      {ord.status}
                    </span>
                  </td>

                  <td className="tower-cell-hold">
                    {ord.holdDamagedItems ? (
                      <span className="tower-badge-hold-active">
                        HOLD ACTIVE
                      </span>
                    ) : (
                      <span className="tower-badge-hold-clear">Clear</span>
                    )}
                  </td>

                  <td className="tower-cell-action">
                    <button
                      type="button"
                      className={`tower-action-btn ${
                        isSelected ? 'tower-action-btn--selected' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrder(ord.orderNumber);
                      }}
                    >
                      {isSelected ? 'Inspecting' : 'Inspect'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
