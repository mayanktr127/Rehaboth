import React, { useState, useEffect } from 'react';
import { CustomerExperiencePage } from './CustomerExperiencePage';
import { runtimeConfig, defaultAuthHeaders } from '../../services/runtimeConfig';

interface WorkspacePanelProps {
  activeTab: string;
  orderId: string;
  role: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  isDisabled: boolean;
}

interface GarmentTag {
  id: string;
  orderId: string;
  tagNumber: number;
  tagCode: string;
  status: 'pending' | 'printed';
}

interface WalletAccount {
  customerId: string;
  customerName: string;
  phone: string;
  balanceInr: number;
  ledger: Array<{
    id: string;
    amountInr: number;
    reason: string;
    createdAt: string;
  }>;
}

interface CacheRegion {
  region: string;
  description: string;
  entries: number;
  hitCount: number;
  missCount: number;
}

export const WorkspacePanel: React.FC<WorkspacePanelProps> = ({ activeTab, orderId, role }) => {
  // Staff Directory State
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 'st_1', name: 'Arun Kumar', role: 'Pickup Agent', isDisabled: false },
    { id: 'st_2', name: 'Devanathan S', role: 'Intake Technician', isDisabled: false },
    { id: 'st_3', name: 'Meenakshi Iyer', role: 'Garment Specialist', isDisabled: false },
    { id: 'st_4', name: 'Rajesh V', role: 'QA Inspector', isDisabled: false },
    { id: 'st_5', name: 'Karthik Rao', role: 'Delivery Agent', isDisabled: false },
    { id: 'st_6', name: 'Suresh Babu', role: 'Order Coordinator', isDisabled: false },
  ]);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Intake Technician');

  // Garment Tag Printing State
  const [selectedTagOrder, setSelectedTagOrder] = useState('REH-2904');
  const [garmentTags, setGarmentTags] = useState<GarmentTag[]>([
    { id: 'tag_1', orderId: 'REH-2904', tagNumber: 1, tagCode: 'TAG-2904-01-SILK', status: 'printed' },
    { id: 'tag_2', orderId: 'REH-2904', tagNumber: 2, tagCode: 'TAG-2904-02-WOOL', status: 'printed' },
    { id: 'tag_3', orderId: 'REH-2904', tagNumber: 3, tagCode: 'TAG-2904-03-LINEN', status: 'pending' },
    { id: 'tag_4', orderId: 'REH-2904', tagNumber: 4, tagCode: 'TAG-2904-04-COTTON', status: 'pending' },
  ]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [message, setMessage] = useState('');

  // Customer Wallet State
  const [walletPhone, setWalletPhone] = useState('9876543210');
  const [walletAccount, setWalletAccount] = useState<WalletAccount | null>({
    customerId: 'cust_9481',
    customerName: 'Devendra Sharma',
    phone: '9876543210',
    balanceInr: 450,
    ledger: [
      { id: 'led_1', amountInr: 100, reason: 'First Atelier Order Courtesy', createdAt: '2026-09-15' },
      { id: 'led_2', amountInr: 350, reason: 'Goodwill Credit - Rescheduled Slot', createdAt: '2026-09-18' },
    ],
  });
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('Customer Courtesy Credit');

  // Cache Management State
  const [cacheRegions, setCacheRegions] = useState<CacheRegion[]>([
    { region: 'store-catalog', description: 'Atelier studio locations & hub operating hours', entries: 4, hitCount: 1420, missCount: 12 },
    { region: 'rate-cards', description: 'Garment pressing rates & luxury treatment tariffs', entries: 18, hitCount: 3890, missCount: 24 },
    { region: 'promotions-active', description: 'Public marketing coupon codes & membership discounts', entries: 3, hitCount: 840, missCount: 5 },
    { region: 'pincode-serviceability', description: 'Bengaluru coverage zones & delivery corridors', entries: 42, hitCount: 2100, missCount: 18 },
  ]);

  // Escalation State
  const [escalationNote, setEscalationNote] = useState('');
  const [escalationSubmitted, setEscalationSubmitted] = useState(false);

  // Load backend data if available
  useEffect(() => {
    if (!runtimeConfig.apiBaseUrl) return;

    if (activeTab === 'staff') {
      fetch(`${runtimeConfig.apiBaseUrl}/api/operator/staff`, { headers: defaultAuthHeaders })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (Array.isArray(data?.staff)) setStaff(data.staff);
        })
        .catch(() => {});
    }
  }, [activeTab]);

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;
    const newMember: StaffMember = {
      id: `st_${Date.now()}`,
      name: newStaffName.trim(),
      role: newStaffRole,
      isDisabled: false,
    };
    setStaff([newMember, ...staff]);
    setNewStaffName('');
    setMessage(`Staff member '${newMember.name}' added.`);
  };

  const handlePrintAllTags = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setGarmentTags(garmentTags.map((t) => ({ ...t, status: 'printed' })));
      setIsPrinting(false);
      setMessage('All 4 garment tags marked as PRINTED.');
    }, 600);
  };

  const handleIssueRefund = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(refundAmount);
    if (isNaN(amt) || amt <= 0 || !walletAccount) return;

    if (!window.confirm(`Issue ₹${amt} refund to customer ${walletAccount.customerName}?`)) return;

    const newLedgerItem = {
      id: `led_${Date.now()}`,
      amountInr: amt,
      reason: refundReason,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setWalletAccount({
      ...walletAccount,
      balanceInr: walletAccount.balanceInr + amt,
      ledger: [newLedgerItem, ...walletAccount.ledger],
    });
    setRefundAmount('');
    setMessage(`₹${amt} refunded to wallet successfully.`);
  };

  const handleClearCache = (regionName?: string) => {
    const target = regionName || 'ALL';
    if (!window.confirm(`Purge in-memory Tier-2 cache for [${target}]?`)) return;

    if (regionName) {
      setCacheRegions(
        cacheRegions.map((r) => (r.region === regionName ? { ...r, entries: 0, hitCount: 0 } : r))
      );
    } else {
      setCacheRegions(cacheRegions.map((r) => ({ ...r, entries: 0, hitCount: 0 })));
    }
    setMessage(`Cache region '${target}' cleared successfully.`);
  };

  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalationNote.trim()) return;
    setEscalationSubmitted(true);
    setMessage(`Escalation ticket dispatched for ${orderId}.`);
    setEscalationNote('');
  };

  return (
    <div>
      {message ? (
        <div style={{ padding: '10px 16px', background: 'rgba(209,151,55,0.15)', color: '#e8c36a', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem' }}>
          ✓ {message}
        </div>
      ) : null}

      {/* 1. STAFF DIRECTORY & ASSIGNMENTS */}
      {activeTab === 'staff' && (
        <div className="tower-card">
          <div className="tower-card-title">
            <span>Care Studio Staff Directory ({staff.length} Active Personnel)</span>
            <span className="tower-badge tower-badge--gold">{role.toUpperCase()} ACCESS</span>
          </div>

          <form onSubmit={handleAddStaff} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <input
              className="tower-input"
              placeholder="Staff member full name..."
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              style={{ flex: 1 }}
              required
            />
            <select
              className="tower-input"
              value={newStaffRole}
              onChange={(e) => setNewStaffRole(e.target.value)}
            >
              <option value="Intake Technician">Intake Technician</option>
              <option value="Garment Specialist">Garment Specialist</option>
              <option value="QA Inspector">QA Inspector</option>
              <option value="Pickup Agent">Pickup Agent</option>
              <option value="Delivery Agent">Delivery Agent</option>
              <option value="Order Coordinator">Order Coordinator</option>
            </select>
            <button type="submit" className="tower-btn">
              + ADD STAFF
            </button>
          </form>

          <table className="tower-table">
            <thead>
              <tr>
                <th>STAFF NAME</th>
                <th>ASSIGNED ROLE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id}>
                  <td style={{ fontWeight: 600 }}>{member.name}</td>
                  <td>{member.role}</td>
                  <td>
                    <span className={`tower-badge ${member.isDisabled ? 'tower-badge--red' : 'tower-badge--green'}`}>
                      {member.isDisabled ? 'OFF-DUTY' : 'ON-DUTY'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="tower-btn tower-btn--outline"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={() =>
                        setStaff(staff.map((s) => (s.id === member.id ? { ...s, isDisabled: !s.isDisabled } : s)))
                      }
                    >
                      {member.isDisabled ? 'Enable' : 'Disable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. STORE OPERATIONS & GARMENT TAG PRINTING */}
      {activeTab === 'operations' && (
        <div className="tower-card">
          <div className="tower-card-title">
            <span>Garment Tag Printing &amp; Studio Intake</span>
            <button
              type="button"
              className="tower-btn"
              onClick={handlePrintAllTags}
              disabled={isPrinting}
            >
              {isPrinting ? 'PRINTING TAGS...' : '🖨️ PRINT ALL PENDING TAGS'}
            </button>
          </div>
          <p style={{ color: '#8f8a82', fontSize: '0.85rem', marginTop: -8 }}>
            Tags auto-generate once an order is checked in at the hub. Attach unique barcode tags
            to garment hangers for RFID tracking.
          </p>

          <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
            <span style={{ color: '#e8c36a', fontSize: '0.85rem', alignSelf: 'center', fontWeight: 600 }}>
              ACTIVE HUB SESSION:
            </span>
            <select
              className="tower-input"
              value={selectedTagOrder}
              onChange={(e) => setSelectedTagOrder(e.target.value)}
            >
              <option value="REH-2904">REH-2904 • Devendra Sharma (4 Garments)</option>
              <option value="REH-3110">REH-3110 • Priya Sundaram (6 Garments)</option>
              <option value="REH-3287">REH-3287 • Arvind Swamy (2 Garments)</option>
            </select>
          </div>

          <table className="tower-table">
            <thead>
              <tr>
                <th>PIECE #</th>
                <th>BARCODE TAG CODE</th>
                <th>GARMENT TYPE</th>
                <th>PRINT STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {garmentTags.map((tag) => (
                <tr key={tag.id}>
                  <td>Piece #{tag.tagNumber}</td>
                  <td style={{ fontFamily: 'monospace', color: '#e8c36a' }}>{tag.tagCode}</td>
                  <td>Suits &amp; Blazers</td>
                  <td>
                    <span className={`tower-badge ${tag.status === 'printed' ? 'tower-badge--green' : 'tower-badge--gold'}`}>
                      {tag.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="tower-btn tower-btn--outline"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={() =>
                        setGarmentTags(garmentTags.map((t) => (t.id === tag.id ? { ...t, status: 'printed' } : t)))
                      }
                    >
                      {tag.status === 'printed' ? 'Reprint Tag' : 'Print Tag'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. CUSTOMER WALLET ADMINISTRATION */}
      {activeTab === 'wallet' && (
        <div className="tower-card">
          <div className="tower-card-title">
            <span>Customer Concierge Wallet &amp; Ledger Administration</span>
            <span className="tower-badge tower-badge--gold">SUPER ADMIN ONLY</span>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <input
              className="tower-input"
              placeholder="Look up customer phone (e.g. 9876543210)..."
              value={walletPhone}
              onChange={(e) => setWalletPhone(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="button" className="tower-btn">
              SEARCH CUSTOMER
            </button>
          </div>

          {walletAccount && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(209,151,55,0.08)', borderRadius: 10, border: '1px solid rgba(209,151,55,0.25)', marginBottom: 20 }}>
                <div>
                  <div style={{ color: '#8f8a82', fontSize: '0.75rem' }}>CUSTOMER ACCOUNT</div>
                  <strong style={{ fontSize: '1.2rem', color: '#ffffff' }}>{walletAccount.customerName}</strong>
                  <div style={{ color: '#8f8a82', fontSize: '0.8rem' }}>Phone: +91 {walletAccount.phone} • ID: {walletAccount.customerId}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#8f8a82', fontSize: '0.75rem' }}>CURRENT WALLET BALANCE</div>
                  <strong style={{ fontSize: '1.6rem', color: '#e8c36a' }}>₹{walletAccount.balanceInr}</strong>
                </div>
              </div>

              <form onSubmit={handleIssueRefund} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <input
                  className="tower-input"
                  placeholder="Refund / Credit Amount (₹)..."
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  style={{ width: 180 }}
                  required
                />
                <input
                  className="tower-input"
                  placeholder="Audit Reason (e.g. Valet Delay Courtesy)..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  style={{ flex: 1 }}
                  required
                />
                <button type="submit" className="tower-btn">
                  CREDIT WALLET
                </button>
              </form>

              <table className="tower-table">
                <thead>
                  <tr>
                    <th>TRANSACTION ID</th>
                    <th>CREDIT / REFUND</th>
                    <th>AUDIT REASON</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {walletAccount.ledger.map((entry) => (
                    <tr key={entry.id}>
                      <td style={{ fontFamily: 'monospace' }}>#{entry.id}</td>
                      <td style={{ color: '#3ddc84', fontWeight: 700 }}>+₹{entry.amountInr}</td>
                      <td>{entry.reason}</td>
                      <td style={{ color: '#8f8a82' }}>{entry.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 4. TIER-2 CACHE MANAGEMENT */}
      {activeTab === 'cache' && (
        <div className="tower-card">
          <div className="tower-card-title">
            <span>Tier-2 Caffeine Microservice Cache Registry</span>
            <button
              type="button"
              className="tower-btn tower-btn--danger"
              onClick={() => handleClearCache()}
            >
              ⚠️ PURGE ALL REGIONS
            </button>
          </div>
          <p style={{ color: '#f38b8b', fontSize: '0.8rem', background: 'rgba(243,139,139,0.08)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(243,139,139,0.2)' }}>
            <strong>Risk Notice:</strong> Flushing in-memory caches forces downstream services to query the PostgreSQL primary database for store tariffs and active promotion cards. No customer PII is stored in cache.
          </p>

          <table className="tower-table" style={{ marginTop: 16 }}>
            <thead>
              <tr>
                <th>REGION KEY</th>
                <th>DESCRIPTION</th>
                <th>CACHED ENTRIES</th>
                <th>HIT / MISS RATIO</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cacheRegions.map((reg) => (
                <tr key={reg.region}>
                  <td style={{ fontFamily: 'monospace', color: '#e8c36a' }}>{reg.region}</td>
                  <td>{reg.description}</td>
                  <td>{reg.entries} items</td>
                  <td>
                    {reg.hitCount} hits / {reg.missCount} misses
                  </td>
                  <td>
                    <button
                      type="button"
                      className="tower-btn tower-btn--outline"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={() => handleClearCache(reg.region)}
                    >
                      Clear Region
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. ESCALATIONS & OVERRIDES */}
      {activeTab === 'escalations' && (
        <div className="tower-card">
          <div className="tower-card-title">
            <span>Damaged Garment &amp; Session Escalation Console</span>
            <span className="tower-badge tower-badge--red">PRIORITY INTERVENTION</span>
          </div>

          {escalationSubmitted && (
            <div style={{ padding: '12px 16px', background: 'rgba(61,220,132,0.12)', color: '#3ddc84', borderRadius: 8, marginBottom: 16 }}>
              ✓ Escalation logged for order #{orderId}. Quality Control Supervisor notified.
            </div>
          )}

          <form onSubmit={handleEscalationSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#8f8a82', fontSize: '0.75rem', marginBottom: 6, fontWeight: 700 }}>
                TARGET ORDER IDENTIFIER
              </label>
              <input className="tower-input" value={orderId} disabled style={{ opacity: 0.8 }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#8f8a82', fontSize: '0.75rem', marginBottom: 6, fontWeight: 700 }}>
                REASON FOR OVERRIDE / EXCEPTION
              </label>
              <textarea
                className="tower-input"
                style={{ width: '100%', minHeight: 90, boxSizing: 'border-box' }}
                placeholder="Describe garment condition, fabric risk, customer hold instruction, or transit exception..."
                value={escalationNote}
                onChange={(e) => setEscalationNote(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="tower-btn">
              SUBMIT OPERATOR ESCALATION
            </button>
          </form>
        </div>
      )}

      {/* 6. EMBEDDED CX */}
      {activeTab === 'cx' && <CustomerExperiencePage />}
    </div>
  );
};
