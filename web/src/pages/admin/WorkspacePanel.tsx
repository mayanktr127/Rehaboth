import React, { useState, useEffect } from 'react';
import { MetricStatCard } from '../../components/admin/MetricStatCard';
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
  garmentType: string;
  fabricCare: string;
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
  // Global message toast
  const [message, setMessage] = useState('');

  // 1. Tag Printing State
  const [selectedTagOrder, setSelectedTagOrder] = useState('REH-2904');
  const [garmentTags, setGarmentTags] = useState<GarmentTag[]>([
    {
      id: 'tag_1',
      orderId: 'REH-2904',
      tagNumber: 1,
      tagCode: 'TAG-2904-01-SILK',
      garmentType: 'Charcoal Wool & Silk Blazer',
      fabricCare: 'French Lavender Steam • Low Pressure',
      status: 'printed',
    },
    {
      id: 'tag_2',
      orderId: 'REH-2904',
      tagNumber: 2,
      tagCode: 'TAG-2904-02-WOOL',
      garmentType: 'Tailored Merino Trousers',
      fabricCare: 'Hand Reset Crease • No Iron Plate',
      status: 'printed',
    },
    {
      id: 'tag_3',
      orderId: 'REH-2904',
      tagNumber: 3,
      tagCode: 'TAG-2904-03-LINEN',
      garmentType: 'Crisp Linen Dinner Shirt',
      fabricCare: 'Moisture Restoration • 130°C Steam',
      status: 'pending',
    },
    {
      id: 'tag_4',
      orderId: 'REH-2904',
      tagNumber: 4,
      tagCode: 'TAG-2904-04-COTTON',
      garmentType: 'Heavy Egyptian Cotton Kurta',
      fabricCare: 'Botanical Sandalwood Infusion',
      status: 'pending',
    },
  ]);
  const [selectedPreviewTag, setSelectedPreviewTag] = useState<GarmentTag>(garmentTags[0]);
  const [isPrinting, setIsPrinting] = useState(false);

  // 2. Staff Directory State
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
  const [staffSearch, setStaffSearch] = useState('');

  // 3. Customer Wallet State
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

  // 4. Cache Management State
  const [cacheRegions, setCacheRegions] = useState<CacheRegion[]>([
    { region: 'store-catalog', description: 'Atelier studio locations and hub operating hours', entries: 4, hitCount: 1420, missCount: 12 },
    { region: 'rate-cards', description: 'Garment pressing rates and luxury treatment tariffs', entries: 18, hitCount: 3890, missCount: 24 },
    { region: 'promotions-active', description: 'Public marketing coupon codes and membership discounts', entries: 3, hitCount: 840, missCount: 5 },
    { region: 'pincode-serviceability', description: 'Bengaluru coverage zones and delivery corridors', entries: 42, hitCount: 2100, missCount: 18 },
  ]);

  // 5. Escalation State
  const [escalationHoldActive, setEscalationHoldActive] = useState(true);
  const [escalationNote, setEscalationNote] = useState('');
  const [escalationCategory, setEscalationCategory] = useState('Pre-existing Fabric Tear');
  const [escalationSeverity, setEscalationSeverity] = useState('High');

  // Load backend staff if available
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

  const showToast = (txt: string) => {
    setMessage(txt);
    setTimeout(() => setMessage(''), 4000);
  };

  // Handlers
  const handlePrintAllTags = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setGarmentTags(garmentTags.map((t) => ({ ...t, status: 'printed' })));
      setIsPrinting(false);
      showToast('All 4 garment tags marked as PRINTED and ready for RFID tracking.');
    }, 600);
  };

  const handleToggleSingleTag = (tagId: string) => {
    setGarmentTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, status: t.status === 'printed' ? 'pending' : 'printed' } : t))
    );
    showToast(`Garment tag status updated.`);
  };

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
    showToast(`Staff member '${newMember.name}' enrolled into ${newMember.role}.`);
  };

  const handleIssueRefund = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(refundAmount);
    if (isNaN(amt) || amt <= 0 || !walletAccount) return;

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
    showToast(`₹${amt} courtesy credit successfully deposited to ${walletAccount.customerName}'s wallet.`);
  };

  const handleClearCache = (regionName?: string) => {
    const target = regionName || 'ALL REGIONS';
    if (regionName) {
      setCacheRegions(
        cacheRegions.map((r) => (r.region === regionName ? { ...r, entries: 0, hitCount: 0 } : r))
      );
    } else {
      setCacheRegions(cacheRegions.map((r) => ({ ...r, entries: 0, hitCount: 0 })));
    }
    showToast(`Tier-2 Caffeine cache for [${target}] flushed successfully.`);
  };

  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalationNote.trim()) return;
    showToast(`Escalation ticket dispatched for ${orderId}. QC Supervisor on duty notified.`);
    setEscalationNote('');
  };

  const handleReleaseHold = () => {
    setEscalationHoldActive(false);
    showToast(`Order #${orderId} damaged item hold cleared. Garment released for steam processing.`);
  };

  const printedCount = garmentTags.filter((t) => t.status === 'printed').length;
  const pendingCount = garmentTags.filter((t) => t.status === 'pending').length;
  const onDutyCount = staff.filter((s) => !s.isDisabled).length;
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.role.toLowerCase().includes(staffSearch.toLowerCase())
  );

  return (
    <div style={{ width: '100%' }}>
      {/* Toast Notice */}
      {message && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#fdf6ec',
            border: '1.5px solid #ebd0ba',
            color: 'var(--color-primary, #b86538)',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(184, 101, 56, 0.08)',
          }}
        >
          <span>✓</span>
          <span>{message}</span>
        </div>
      )}

      {/* ====================================================================
          1. TAG PRINTING & HUB INTAKE (activeTab === 'operations')
          ==================================================================== */}
      {activeTab === 'operations' && (
        <>
          {/* Subpage Header */}
          <div className="tower-subpage-header">
            <div className="tower-subpage-title-group">
              <h2 className="tower-subpage-title">Garment Tag Printing &amp; Studio Intake</h2>
              <p className="tower-subpage-desc">
                Generate encrypted RFID hanger barcode tags and manage chain of custody verification across Indiranagar atelier stations.
              </p>
            </div>
            <div className="tower-subpage-actions">
              <select
                className="tower-select"
                value={selectedTagOrder}
                onChange={(e) => setSelectedTagOrder(e.target.value)}
                style={{ width: '260px' }}
              >
                <option value="REH-2904">REH-2904 • Devendra Sharma (4 Garments)</option>
                <option value="REH-3110">REH-3110 • Priya Sundaram (6 Garments)</option>
                <option value="REH-3287">REH-3287 • Arvind Swamy (2 Garments)</option>
              </select>
              <button
                type="button"
                className="tower-btn"
                onClick={handlePrintAllTags}
                disabled={isPrinting || pendingCount === 0}
              >
                {isPrinting ? 'PRINTING TAGS...' : '🖨️ Print All Pending Tags'}
              </button>
            </div>
          </div>

          {/* 4-Card Stat Row */}
          <div className="tower-stat-row-4">
            <MetricStatCard
              icon="🏷️"
              label="Total Batch Tags"
              value={garmentTags.length}
              trend={{ text: 'Indiranagar Hub', isNeutral: true }}
            />
            <MetricStatCard
              icon="🖨️"
              label="Printed &amp; Attached"
              value={printedCount}
              trend={{ text: `${Math.round((printedCount / garmentTags.length) * 100)}% attached`, isUp: true }}
            />
            <MetricStatCard
              icon="⏳"
              label="Pending Print"
              value={pendingCount}
              trend={{ text: pendingCount > 0 ? 'Immediate action' : 'All cleared', isWarning: pendingCount > 0, isUp: pendingCount === 0 }}
            />
            <MetricStatCard
              icon="📦"
              label="Batch Custody"
              value="Batch #TAG-0922"
              trend={{ text: 'RFID Active', isNeutral: true }}
            />
          </div>

          {/* 2-Column Content Grid */}
          <div className="tower-subpage-grid">
            {/* Left: Garment Tags Table */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Active Batch Garment Tags</h3>
                  <span className="tower-panel-sub">Order #{selectedTagOrder} • Click tag to inspect preview</span>
                </div>
                <span className="tower-badge tower-badge--neutral">{garmentTags.length} ITEMS</span>
              </div>

              <div className="tower-table-responsive">
                <table className="tower-data-table">
                  <thead>
                    <tr>
                      <th>PIECE #</th>
                      <th>BARCODE TAG CODE</th>
                      <th>GARMENT DESCRIPTION</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {garmentTags.map((tag) => (
                      <tr
                        key={tag.id}
                        className={`tower-data-row ${selectedPreviewTag.id === tag.id ? 'tower-data-row--selected' : ''}`}
                        onClick={() => setSelectedPreviewTag(tag)}
                      >
                        <td style={{ fontWeight: 700 }}>Piece #{tag.tagNumber}</td>
                        <td>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 800,
                              color: 'var(--color-primary, #b86538)',
                              backgroundColor: '#faf5ee',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              border: '1px solid var(--color-border, #e6dcce)',
                            }}
                          >
                            {tag.tagCode}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{tag.garmentType}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)' }}>
                            {tag.fabricCare}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`tower-status-pill ${
                              tag.status === 'printed'
                                ? 'tower-status-pill--completed'
                                : 'tower-status-pill--steam'
                            }`}
                          >
                            <span className="tower-status-dot" />
                            {tag.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="tower-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSingleTag(tag.id);
                            }}
                          >
                            {tag.status === 'printed' ? 'Reprint Tag' : 'Print Tag'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Live Hanger Tag Replica Preview */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Physical Hanger Tag Preview</h3>
                  <span className="tower-panel-sub">Authentic thermal hanger tag attached to garment</span>
                </div>
                <span className="tower-badge tower-badge--gold">ATELIER STANDARD</span>
              </div>

              {/* Physical Tag Replica */}
              <div className="tower-hanger-tag">
                <div className="tower-hanger-hole" />
                <div className="tower-hanger-emblem">REHABOTH STEAM</div>
                <div className="tower-hanger-sub">Atelier Chain of Custody</div>

                <div className="tower-hanger-barcode-box">
                  {/* SVG Barcode Graphic */}
                  <svg className="tower-hanger-barcode-svg" viewBox="0 0 200 40">
                    <rect x="0" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="6" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="15" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="21" y="0" width="9" height="40" fill="#1a1714" />
                    <rect x="33" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="39" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="48" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="54" y="0" width="12" height="40" fill="#1a1714" />
                    <rect x="69" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="75" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="84" y="0" width="9" height="40" fill="#1a1714" />
                    <rect x="96" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="102" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="111" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="117" y="0" width="12" height="40" fill="#1a1714" />
                    <rect x="132" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="141" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="147" y="0" width="9" height="40" fill="#1a1714" />
                    <rect x="159" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="168" y="0" width="3" height="40" fill="#1a1714" />
                    <rect x="174" y="0" width="6" height="40" fill="#1a1714" />
                    <rect x="183" y="0" width="9" height="40" fill="#1a1714" />
                    <rect x="195" y="0" width="3" height="40" fill="#1a1714" />
                  </svg>
                  <div className="tower-hanger-code-text">{selectedPreviewTag.tagCode}</div>
                </div>

                <div className="tower-hanger-meta-grid">
                  <div>
                    <div className="tower-hanger-meta-lbl">Piece Number</div>
                    <div className="tower-hanger-meta-val">#{selectedPreviewTag.tagNumber} of {garmentTags.length}</div>
                  </div>
                  <div>
                    <div className="tower-hanger-meta-lbl">Custody Order</div>
                    <div className="tower-hanger-meta-val">{selectedPreviewTag.orderId}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div className="tower-hanger-meta-lbl">Garment &amp; Diagnostics</div>
                    <div className="tower-hanger-meta-val">{selectedPreviewTag.garmentType}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div className="tower-hanger-meta-lbl">Care Treatment</div>
                    <div className="tower-hanger-meta-val" style={{ color: 'var(--color-primary, #b86538)' }}>
                      {selectedPreviewTag.fabricCare}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="tower-btn tower-btn--outline"
                style={{ width: '100%' }}
                onClick={() => handleToggleSingleTag(selectedPreviewTag.id)}
              >
                🖨️ {selectedPreviewTag.status === 'printed' ? 'Reprint This Tag' : 'Print Hanger Tag Now'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ====================================================================
          2. STAFF DIRECTORY & ASSIGNMENTS (activeTab === 'staff')
          ==================================================================== */}
      {activeTab === 'staff' && (
        <>
          {/* Subpage Header */}
          <div className="tower-subpage-header">
            <div className="tower-subpage-title-group">
              <h2 className="tower-subpage-title">Care Studio Staff Directory</h2>
              <p className="tower-subpage-desc">
                Roster management for artisan steam technicians, garment intake specialists, and white-glove valet dispatchers.
              </p>
            </div>
            <div className="tower-subpage-actions">
              <span className="tower-badge tower-badge--gold">{role.toUpperCase()} ACCESS</span>
            </div>
          </div>

          {/* 4-Card Stat Row */}
          <div className="tower-stat-row-4">
            <MetricStatCard
              icon="👥"
              label="Total Personnel"
              value={staff.length}
              trend={{ text: 'Full studio roster', isNeutral: true }}
            />
            <MetricStatCard
              icon="🛡️"
              label="On-Duty Technicians"
              value={onDutyCount}
              trend={{ text: `${Math.round((onDutyCount / staff.length) * 100)}% active shift`, isUp: true }}
            />
            <MetricStatCard
              icon="👔"
              label="Studio Roles"
              value="05"
              trend={{ text: 'Intake, QA, Steam, Valet', isNeutral: true }}
            />
            <MetricStatCard
              icon="📍"
              label="Station Coverage"
              value="100%"
              trend={{ text: 'Indiranagar Atelier', isUp: true }}
            />
          </div>

          {/* 2-Column Content Grid */}
          <div className="tower-subpage-grid--split">
            {/* Left: Staff Table */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Active Personnel Roster</h3>
                  <span className="tower-panel-sub">Assigned studio duties &amp; active shift status</span>
                </div>
                <input
                  type="text"
                  className="tower-input"
                  placeholder="Filter personnel..."
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  style={{ width: '180px', padding: '6px 12px', fontSize: '0.78rem' }}
                />
              </div>

              <div className="tower-table-responsive">
                <table className="tower-data-table">
                  <thead>
                    <tr>
                      <th>PERSONNEL</th>
                      <th>ASSIGNED ROLE</th>
                      <th>SHIFT STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((member) => {
                      const initials = member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2);

                      return (
                        <tr key={member.id} className="tower-data-row">
                          <td>
                            <div className="tower-customer-cell-wrapper">
                              <div className="tower-customer-avatar">{initials}</div>
                              <div>
                                <div style={{ fontWeight: 700 }}>{member.name}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)' }}>
                                  ID: {member.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="tower-badge tower-badge--neutral">{member.role}</span>
                          </td>
                          <td>
                            <span
                              className={`tower-status-pill ${
                                member.isDisabled ? 'tower-status-pill--intake' : 'tower-status-pill--completed'
                              }`}
                            >
                              <span className="tower-status-dot" />
                              {member.isDisabled ? 'OFF-DUTY' : 'ON-DUTY'}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="tower-action-btn"
                              onClick={() =>
                                setStaff(
                                  staff.map((s) => (s.id === member.id ? { ...s, isDisabled: !s.isDisabled } : s))
                                )
                              }
                            >
                              {member.isDisabled ? 'Activate' : 'Handoff'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Add Personnel & Station Summary */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Enroll New Staff Member</h3>
                  <span className="tower-panel-sub">Add personnel to Indiranagar roster</span>
                </div>
              </div>

              <form onSubmit={handleAddStaff} style={{ marginBottom: '24px' }}>
                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">Staff Member Full Name</label>
                  <input
                    className="tower-input"
                    placeholder="e.g. Anand Mahindra"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label className="tower-label">Studio Duty Assignment</label>
                  <select
                    className="tower-select"
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="Intake Technician">Intake Technician</option>
                    <option value="Garment Specialist">Garment Specialist</option>
                    <option value="QA Inspector">QA Inspector</option>
                    <option value="Pickup Agent">Pickup Agent</option>
                    <option value="Delivery Agent">Delivery Agent</option>
                    <option value="Order Coordinator">Order Coordinator</option>
                  </select>
                </div>

                <button type="submit" className="tower-btn" style={{ width: '100%' }}>
                  + Enroll Personnel
                </button>
              </form>

              {/* Station Summary */}
              <div style={{ borderTop: '1px solid var(--color-border, #e6dcce)', paddingTop: '18px' }}>
                <h4 style={{ fontFamily: "var(--font-serif, 'Fraunces', serif)", fontSize: '1rem', margin: '0 0 12px 0' }}>
                  Station Allocation
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#faf5ee', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Diagnostics &amp; Hub Intake</span>
                    <strong style={{ color: 'var(--color-primary, #b86538)' }}>2 Technicians</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#faf5ee', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Master Lavender Steam Press</span>
                    <strong style={{ color: 'var(--color-primary, #b86538)' }}>1 Artisan</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#faf5ee', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Quality Assurance Inspection</span>
                    <strong style={{ color: 'var(--color-primary, #b86538)' }}>1 Inspector</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#faf5ee', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>White-Glove Valet Couriers</span>
                    <strong style={{ color: 'var(--color-primary, #b86538)' }}>2 Agents</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ====================================================================
          3. CUSTOMER CONCIERGE WALLET (activeTab === 'wallet')
          ==================================================================== */}
      {activeTab === 'wallet' && (
        <>
          {/* Subpage Header */}
          <div className="tower-subpage-header">
            <div className="tower-subpage-title-group">
              <h2 className="tower-subpage-title">Customer Concierge Wallet &amp; Ledger</h2>
              <p className="tower-subpage-desc">
                Audit patron credit balances, issue courtesy goodwill refunds, and maintain immutable custody ledgers.
              </p>
            </div>
            <div className="tower-subpage-actions">
              <input
                className="tower-input"
                placeholder="Lookup phone (e.g. 9876543210)..."
                value={walletPhone}
                onChange={(e) => setWalletPhone(e.target.value)}
                style={{ width: '220px' }}
              />
              <button type="button" className="tower-btn">
                🔍 Find Account
              </button>
            </div>
          </div>

          {/* 4-Card Stat Row */}
          <div className="tower-stat-row-4">
            <MetricStatCard
              icon="💳"
              label="Available Balance"
              value={`₹${walletAccount?.balanceInr || 0}`}
              trend={{ text: 'Available credit', isUp: true }}
            />
            <MetricStatCard
              icon="🎁"
              label="Courtesy Credits"
              value={walletAccount?.ledger.length || 0}
              trend={{ text: '2 goodwill vouchers', isUp: true }}
            />
            <MetricStatCard
              icon="₹"
              label="Total Courtesy Given"
              value="₹450"
              trend={{ text: 'Atelier satisfaction guarantee', isNeutral: true }}
            />
            <MetricStatCard
              icon="👑"
              label="Patron Tier"
              value="Private Reserve"
              trend={{ text: 'Priority valet dispatch', isUp: true }}
            />
          </div>

          {/* 2-Column Content Grid */}
          <div className="tower-subpage-grid">
            {/* Left: Customer Profile & Ledger */}
            <div className="tower-panel">
              {walletAccount && (
                <>
                  {/* Customer Card */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      backgroundColor: '#faf5ee',
                      borderRadius: '14px',
                      border: '1px solid var(--color-border, #e6dcce)',
                      marginBottom: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: '#f2e8dc',
                          border: '1.5px solid var(--color-border, #e6dcce)',
                          color: 'var(--color-primary, #b86538)',
                          fontSize: '18px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        DS
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--color-foreground, #1a1714)' }}>
                            {walletAccount.customerName}
                          </h3>
                          <span className="tower-badge tower-badge--gold">PRIVATE RESERVE</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-foreground, #7d7265)', marginTop: '2px' }}>
                          +91 {walletAccount.phone} • ID: {walletAccount.customerId}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-muted-foreground, #7d7265)', letterSpacing: '0.5px' }}>
                        ACTIVE WALLET
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-serif, 'Fraunces', serif)",
                          fontSize: '1.9rem',
                          fontWeight: 700,
                          color: 'var(--color-primary, #b86538)',
                          lineHeight: 1.1,
                        }}
                      >
                        ₹{walletAccount.balanceInr}
                      </div>
                    </div>
                  </div>

                  {/* Ledger Table */}
                  <div className="tower-panel-header">
                    <div>
                      <h4 className="tower-panel-title">Audit Ledger Transactions</h4>
                      <span className="tower-panel-sub">Immutable transaction audit trail for customer</span>
                    </div>
                  </div>

                  <div className="tower-table-responsive">
                    <table className="tower-data-table">
                      <thead>
                        <tr>
                          <th>TX ID</th>
                          <th>AMOUNT</th>
                          <th>AUDIT REASON</th>
                          <th>TIMESTAMP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {walletAccount.ledger.map((entry) => (
                          <tr key={entry.id} className="tower-data-row">
                            <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>#{entry.id}</td>
                            <td>
                              <span
                                style={{
                                  fontWeight: 800,
                                  color: '#2e7d32',
                                  backgroundColor: '#e8f5e9',
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                }}
                              >
                                +₹{entry.amountInr}
                              </span>
                            </td>
                            <td style={{ fontWeight: 600 }}>{entry.reason}</td>
                            <td style={{ color: 'var(--color-muted-foreground, #7d7265)', fontSize: '0.76rem' }}>
                              {entry.createdAt}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* Right: Issue Credit / Refund Form */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Issue Concierge Courtesy Credit</h3>
                  <span className="tower-panel-sub">Instantly credit patron wallet for studio exceptions</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <label className="tower-label">Select Courtesy Preset</label>
              <div className="tower-preset-group">
                {['100', '250', '350', '500', '1000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`tower-preset-btn ${refundAmount === amt ? 'tower-preset-btn--active' : ''}`}
                    onClick={() => setRefundAmount(amt)}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleIssueRefund}>
                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">Custom Credit Amount (₹)</label>
                  <input
                    type="number"
                    className="tower-input"
                    placeholder="Enter amount (e.g. 450)..."
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label className="tower-label">Audit Courtesy Reason</label>
                  <select
                    className="tower-select"
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="Customer Courtesy Credit">Customer Courtesy Credit</option>
                    <option value="Goodwill Credit - Rescheduled Slot">Goodwill Credit - Rescheduled Slot</option>
                    <option value="Atelier Steam Quality Guarantee">Atelier Steam Quality Guarantee</option>
                    <option value="Private Reserve Loyalty Reward">Private Reserve Loyalty Reward</option>
                    <option value="Damaged Item Goodwill Voucher">Damaged Item Goodwill Voucher</option>
                  </select>
                </div>

                <button type="submit" className="tower-btn" style={{ width: '100%' }}>
                  💳 Deposit Courtesy Credit
                </button>
              </form>

              <div style={{ marginTop: '20px', padding: '14px', backgroundColor: '#faf5ee', borderRadius: '10px', fontSize: '0.76rem', color: 'var(--color-muted-foreground, #7d7265)', lineHeight: 1.4 }}>
                <strong>Policy Guarantee:</strong> Wallet credits auto-apply to the patron's next atelier wardrobe delivery checkout. Courtesy credits never expire.
              </div>
            </div>
          </div>
        </>
      )}

      {/* ====================================================================
          4. TIER-2 CACHE REGISTRY (activeTab === 'cache')
          ==================================================================== */}
      {activeTab === 'cache' && (
        <>
          {/* Subpage Header */}
          <div className="tower-subpage-header">
            <div className="tower-subpage-title-group">
              <h2 className="tower-subpage-title">Tier-2 Caffeine Microservice Cache Registry</h2>
              <p className="tower-subpage-desc">
                In-memory caching cluster for atelier studio tariffs, active promotions, and delivery corridor serviceability.
              </p>
            </div>
            <div className="tower-subpage-actions">
              <button
                type="button"
                className="tower-btn tower-btn--danger"
                onClick={() => handleClearCache()}
              >
                ⚠️ Purge All Regions
              </button>
            </div>
          </div>

          {/* 4-Card Stat Row */}
          <div className="tower-stat-row-4">
            <MetricStatCard
              icon="🔄"
              label="Active Regions"
              value={cacheRegions.length}
              trend={{ text: 'In-memory operational', isNeutral: true }}
            />
            <MetricStatCard
              icon="💾"
              label="Cached Entries"
              value={cacheRegions.reduce((acc, r) => acc + r.entries, 0)}
              trend={{ text: 'Hot keys cached', isNeutral: true }}
            />
            <MetricStatCard
              icon="🎯"
              label="Cache Hit Ratio"
              value="99.2%"
              trend={{ text: '8,250 total hits', isUp: true }}
            />
            <MetricStatCard
              icon="⚡"
              label="Cache Misses"
              value="59"
              trend={{ text: '0.8% miss frequency', isUp: true }}
            />
          </div>

          {/* Risk Notice Callout */}
          <div className="tower-callout tower-callout--warning">
            <span className="tower-callout-icon">⚠️</span>
            <div className="tower-callout-content">
              <strong>Cache Eviction Policy &amp; Security Notice:</strong>
              Flushing in-memory caches forces downstream microservices to query the PostgreSQL primary database for store tariffs and serviceability boundaries. No customer PII is stored in memory.
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="tower-subpage-grid--split">
            {/* Left: Cache Regions Table */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">In-Memory Cache Regions</h3>
                  <span className="tower-panel-sub">Live telemetry for microservice cache partitions</span>
                </div>
              </div>

              <div className="tower-table-responsive">
                <table className="tower-data-table">
                  <thead>
                    <tr>
                      <th>REGION KEY</th>
                      <th>DESCRIPTION</th>
                      <th>ENTRIES</th>
                      <th>HIT / MISS RATIO</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cacheRegions.map((reg) => {
                      const total = reg.hitCount + reg.missCount;
                      const hitPercent = total > 0 ? Math.round((reg.hitCount / total) * 100) : 0;

                      return (
                        <tr key={reg.region} className="tower-data-row">
                          <td>
                            <span
                              style={{
                                fontFamily: 'monospace',
                                fontWeight: 800,
                                color: 'var(--color-primary, #b86538)',
                                backgroundColor: '#faf5ee',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                border: '1px solid var(--color-border, #e6dcce)',
                              }}
                            >
                              {reg.region}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.78rem', color: 'var(--color-foreground, #1a1714)' }}>
                            {reg.description}
                          </td>
                          <td style={{ fontWeight: 700 }}>{reg.entries} items</td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ color: '#2e7d32', fontWeight: 700 }}>{hitPercent}% Hits</span>
                                <span style={{ color: 'var(--color-muted-foreground, #7d7265)' }}>{reg.missCount} Misses</span>
                              </div>
                              <div style={{ height: '5px', borderRadius: '4px', backgroundColor: '#f2e8dc', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${hitPercent}%`, backgroundColor: '#2e7d32' }} />
                              </div>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="tower-action-btn"
                              onClick={() => handleClearCache(reg.region)}
                            >
                              Flush
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Diagnostics & Memory */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Microservice Health</h3>
                  <span className="tower-panel-sub">Cluster memory and eviction diagnostics</span>
                </div>
                <span className="tower-badge tower-badge--green">HEALTHY</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '12px 14px', backgroundColor: '#faf5ee', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 700 }}>
                    ALLOCATED HEAP MEMORY
                  </div>
                  <div style={{ fontFamily: "var(--font-serif, 'Fraunces', serif)", fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-foreground, #1a1714)', marginTop: '2px' }}>
                    14.2 MB <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-muted-foreground, #7d7265)' }}>/ 128 MB</span>
                  </div>
                </div>

                <div style={{ padding: '12px 14px', backgroundColor: '#faf5ee', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 700 }}>
                    EVICTION STRATEGY
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-foreground, #1a1714)', marginTop: '2px' }}>
                    Least Recently Used (LRU) + TTL 3600s
                  </div>
                </div>

                <div style={{ padding: '12px 14px', backgroundColor: '#faf5ee', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 700 }}>
                    UPSTREAM DATABASE LATENCY
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2e7d32', marginTop: '2px' }}>
                    1.8 ms (PostgreSQL Primary Cluster)
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="tower-btn tower-btn--outline"
                style={{ width: '100%' }}
                onClick={() => showToast('Cache cluster connectivity and TTL health validated.')}
              >
                ⚡ Run Freshness Benchmark
              </button>
            </div>
          </div>
        </>
      )}

      {/* ====================================================================
          5. ESCALATIONS & QA (activeTab === 'escalations')
          ==================================================================== */}
      {activeTab === 'escalations' && (
        <>
          {/* Subpage Header */}
          <div className="tower-subpage-header">
            <div className="tower-subpage-title-group">
              <h2 className="tower-subpage-title">Damaged Garment &amp; QA Escalation Console</h2>
              <p className="tower-subpage-desc">
                Direct quality interventions, customer hold protocols, and fabric exceptions logged before steam finishing.
              </p>
            </div>
            <div className="tower-subpage-actions">
              <span className="tower-badge tower-badge--red">PRIORITY INTERVENTION</span>
            </div>
          </div>

          {/* 4-Card Stat Row */}
          <div className="tower-stat-row-4">
            <MetricStatCard
              icon="⚠️"
              label="Active Holds"
              value={escalationHoldActive ? '1' : '0'}
              trend={{
                text: escalationHoldActive ? 'Requires customer call' : 'All holds cleared',
                isWarning: escalationHoldActive,
                isUp: !escalationHoldActive,
              }}
            />
            <MetricStatCard
              icon="✅"
              label="Resolved Today"
              value={escalationHoldActive ? '3' : '4'}
              trend={{ text: 'QC Supervisor signed off', isUp: true }}
            />
            <MetricStatCard
              icon="⏱️"
              label="Avg Response"
              value="< 15m"
              trend={{ text: 'Studio standard', isUp: true }}
            />
            <MetricStatCard
              icon="🛡️"
              label="QC Supervisors"
              value="02"
              trend={{ text: 'Rajesh V on active duty', isNeutral: true }}
            />
          </div>

          {/* 2-Column Content Grid */}
          <div className="tower-subpage-grid">
            {/* Left: Active Escalations List */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Active Quality Exception Queue</h3>
                  <span className="tower-panel-sub">Orders flagged for pre-existing fabric damage</span>
                </div>
                <span className={`tower-badge ${escalationHoldActive ? 'tower-badge--red' : 'tower-badge--green'}`}>
                  {escalationHoldActive ? '1 ACTION NEEDED' : 'QUEUE CLEAR'}
                </span>
              </div>

              {escalationHoldActive ? (
                <div
                  style={{
                    backgroundColor: '#fff9e6',
                    border: '1.5px solid #ffe082',
                    borderRadius: '14px',
                    padding: '20px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.05rem', color: '#b76400' }}>
                          #REH-2904
                        </span>
                        <span className="tower-badge tower-badge--gold">DAMAGED HOLD</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6d4200', marginTop: '2px', fontWeight: 600 }}>
                        Customer: Devendra Sharma (4 Garments) • +91 9876543210
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#8d5600', fontWeight: 700 }}>
                      48 mins ago
                    </span>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #ffe082', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b76400', letterSpacing: '0.5px' }}>
                      INSPECTOR OBSERVATION &amp; INTAKE PHOTOGRAPHY
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-foreground, #1a1714)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                      "Tear on left lapel of charcoal wool blazer. Customer must confirm pre-existing status before organic steam relaxation begins."
                    </p>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-foreground, #7d7265)', marginTop: '8px' }}>
                      Logged by: <strong>Rajesh V (QA Inspector)</strong> • Station: Intake Diagnostics Bay #2
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="tower-btn"
                      style={{ flex: 1, backgroundColor: '#b76400' }}
                      onClick={() => showToast('Opening customer contact modal for +91 9876543210...')}
                    >
                      📞 Call Patron (+91 9876543210)
                    </button>
                    <button
                      type="button"
                      className="tower-btn tower-btn--outline"
                      style={{ flex: 1 }}
                      onClick={handleReleaseHold}
                    >
                      ✓ Release Hold &amp; Proceed
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    backgroundColor: '#faf5ee',
                    borderRadius: '12px',
                    border: '1px dashed var(--color-border, #e6dcce)',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>✨</div>
                  <h4 style={{ fontFamily: "var(--font-serif, 'Fraunces', serif)", fontSize: '1.1rem', margin: '0 0 4px 0' }}>
                    All Quality Holds Resolved
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-muted-foreground, #7d7265)', margin: 0 }}>
                    Every intake garment has passed master inspections. Zero active holds.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Log New Escalation Form */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Log Studio Override / Exception</h3>
                  <span className="tower-panel-sub">Flag garment exceptions or transit anomalies</span>
                </div>
              </div>

              <form onSubmit={handleEscalationSubmit}>
                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">Target Custody Order</label>
                  <input
                    className="tower-input"
                    value={orderId}
                    disabled
                    style={{ width: '100%', opacity: 0.85 }}
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">Exception Category</label>
                  <select
                    className="tower-select"
                    value={escalationCategory}
                    onChange={(e) => setEscalationCategory(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="Pre-existing Fabric Tear">Pre-existing Fabric Tear / Hole</option>
                    <option value="Color Bleed Risk">Color Bleed / Dye Fragility</option>
                    <option value="Hardware / Button Missing">Hardware / Button Missing</option>
                    <option value="Customer Special Instruction">Customer Special Instruction</option>
                    <option value="Transit Delay Exception">Transit Delay Exception</option>
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">Severity Level</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['Low', 'Medium', 'High'].map((sev) => (
                      <button
                        key={sev}
                        type="button"
                        className={`tower-preset-btn ${escalationSeverity === sev ? 'tower-preset-btn--active' : ''}`}
                        onClick={() => setEscalationSeverity(sev)}
                        style={{ flex: 1 }}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label className="tower-label">Detailed Fabric Condition Notes</label>
                  <textarea
                    className="tower-textarea"
                    style={{ width: '100%', minHeight: '90px' }}
                    placeholder="Describe specific garment damage, fabric risk, or inspection requirements..."
                    value={escalationNote}
                    onChange={(e) => setEscalationNote(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="tower-btn" style={{ width: '100%' }}>
                  🚨 Dispatch QC Escalation Ticket
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* ====================================================================
          6. BRAND TERMBASE & LOCALIZATION (activeTab === 'termbase')
          ==================================================================== */}
      {activeTab === 'termbase' && (
        <>
          {/* Subpage Header */}
          <div className="tower-subpage-header">
            <div className="tower-subpage-title-group">
              <h2 className="tower-subpage-title">Brand Termbase &amp; Regional Localization</h2>
              <p className="tower-subpage-desc">
                Authoritative brand terminology, localized phrasing, and dialect glossaries shared across web and mobile valet clients.
              </p>
            </div>
            <div className="tower-subpage-actions">
              <span className="tower-badge tower-badge--gold">VERSION 15 ACTIVE</span>
            </div>
          </div>

          {/* 4-Card Stat Row */}
          <div className="tower-stat-row-4">
            <MetricStatCard
              icon="Aa"
              label="Active Phrases"
              value="06"
              trend={{ text: 'Core vocabulary', isNeutral: true }}
            />
            <MetricStatCard
              icon="🌐"
              label="Regional Locales"
              value="03"
              trend={{ text: 'Hindi, Tamil, Telugu', isUp: true }}
            />
            <MetricStatCard
              icon="🛡️"
              label="Fallback Integrity"
              value="100%"
              trend={{ text: 'English baseline verified', isUp: true }}
            />
            <MetricStatCard
              icon="⚡"
              label="Termbase Sync"
              value="v15"
              trend={{ text: 'Production synced', isUp: true }}
            />
          </div>

          {/* 2-Column Content Grid */}
          <div className="tower-subpage-grid--split">
            {/* Left: Terminology Table */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Approved Atelier Phrasing</h3>
                  <span className="tower-panel-sub">Standardized UI copy and regional translations</span>
                </div>
              </div>

              <div className="tower-table-responsive">
                <table className="tower-data-table">
                  <thead>
                    <tr>
                      <th>KEY IDENTIFIER</th>
                      <th>ENGLISH SOURCE TEXT</th>
                      <th>HINDI / TAMIL / TELUGU</th>
                      <th>CONTEXT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tower-data-row">
                      <td>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: 'var(--color-primary, #b86538)',
                            backgroundColor: '#faf5ee',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--color-border, #e6dcce)',
                          }}
                        >
                          welcome_title
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>Welcome to Rehaboth</td>
                      <td>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-foreground, #1a1714)' }}>Rehaboth में आपका स्वागत है</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)' }}>Rehaboth-க்கு வரவேற்கிறோம்</div>
                      </td>
                      <td>
                        <span className="tower-badge tower-badge--neutral">Splash / Onboarding</span>
                      </td>
                    </tr>

                    <tr className="tower-data-row">
                      <td>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: 'var(--color-primary, #b86538)',
                            backgroundColor: '#faf5ee',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--color-border, #e6dcce)',
                          }}
                        >
                          get_started
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>GET STARTED</td>
                      <td>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-foreground, #1a1714)' }}>शुरू करें</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)' }}>தொடங்குங்கள்</div>
                      </td>
                      <td>
                        <span className="tower-badge tower-badge--neutral">Primary CTA</span>
                      </td>
                    </tr>

                    <tr className="tower-data-row">
                      <td>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: 'var(--color-primary, #b86538)',
                            backgroundColor: '#faf5ee',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--color-border, #e6dcce)',
                          }}
                        >
                          signature_scents
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>Signature Aromas</td>
                      <td>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-foreground, #1a1714)' }}>सिग्नेचर सुगंध</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)' }}>தனித்துவமான நறுமணங்கள்</div>
                      </td>
                      <td>
                        <span className="tower-badge tower-badge--neutral">Botanical Aroma Carousel</span>
                      </td>
                    </tr>

                    <tr className="tower-data-row">
                      <td>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: 'var(--color-primary, #b86538)',
                            backgroundColor: '#faf5ee',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--color-border, #e6dcce)',
                          }}
                        >
                          hold_damaged_items
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>Hold Damaged Items</td>
                      <td>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-foreground, #1a1714)' }}>क्षतिग्रस्त वस्तुओं को रोकें</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground, #7d7265)' }}>சேதமடைந்த பொருட்களை நிறுத்தி</div>
                      </td>
                      <td>
                        <span className="tower-badge tower-badge--gold">Intake Protocol</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Add Brand Phrase */}
            <div className="tower-panel">
              <div className="tower-panel-header">
                <div>
                  <h3 className="tower-panel-title">Add Brand Phrase</h3>
                  <span className="tower-panel-sub">Register key for multi-lingual propagation</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('New brand terminology string registered into catalog.');
                }}
              >
                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">Key Identifier (snake_case)</label>
                  <input
                    className="tower-input"
                    placeholder="e.g. valet_dispatch_window"
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="tower-label">English Master Source Text</label>
                  <input
                    className="tower-input"
                    placeholder="e.g. Morning Doorstep Valet (08:00 - 11:00)"
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label className="tower-label">UI Context / Surface</label>
                  <input
                    className="tower-input"
                    placeholder="e.g. Booking dispatch picker modal"
                    style={{ width: '100%' }}
                  />
                </div>

                <button type="submit" className="tower-btn" style={{ width: '100%' }}>
                  + Save Termbase Key
                </button>
              </form>

              <div style={{ marginTop: '20px', padding: '14px', backgroundColor: '#faf5ee', borderRadius: '10px', fontSize: '0.76rem', color: 'var(--color-muted-foreground, #7d7265)', lineHeight: 1.4 }}>
                <strong>Localization Sync:</strong> Saved phrases automatically compile into runtime language dictionaries during mobile client hydration.
              </div>
            </div>
          </div>
        </>
      )}

      {/* ====================================================================
          7. EMBEDDED CX / JOURNEY ANALYTICS (activeTab === 'cx')
          ==================================================================== */}
      {activeTab === 'cx' && <CustomerExperiencePage />}
    </div>
  );
};
