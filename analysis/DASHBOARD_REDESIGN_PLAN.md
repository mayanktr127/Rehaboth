# Operator Command Tower Dashboard — Information Architecture Redesign Plan

This plan restructures the web Operator Command Tower to adopt the information architecture and structural layout of the reference ("Harbor") dashboard, while retaining 100% of Rehaboth Steam's visual identity (cream paper background, warm espresso text, terracotta accents, Fraunces serif headings, Manrope body text, and hairline borders) and operational domain data.

---

## 1. Page Inventory & Structural Pattern Assignment

| # | Page / Workspace Area | Structural Patterns Applied | One-Line Rationale |
|---|---|---|---|
| **1** | **Main Dashboard (Active Wardrobe Custody)** | • Collapsible Sidebar with Search, Numeric Badges & Pinned Studios<br>• Top Bar with Personalized Greeting, Scope Selector, Alerts Bell & Action CTA<br>• 4 Metric Stat Cards + 1 Radial Goal Gauge (On-Time Delivery %)<br>• Middle Row: Left Throughput Line Chart + Right Custody Stage Breakdown with Progress Bars & Footer Stats<br>• Bottom Row: Left Top Fragrances List + Right Active Sessions Table | Serves as the primary studio operations tower requiring high-level pulse metrics, time-series volume, progression status, and itemized active orders. |
| **2** | **Tag Printing & Hub Intake** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Total Tags, Printed Tags, Pending Print, Active Hub Orders)<br>• Hub Session Selector + Barcode Piece Tag Table with Status Pills & Print Actions | Operational staging area for physical garment tagging; needs clear inventory counts and tag tables, with no artificial time-series chart. |
| **3** | **Staff Directory & Shifts** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Total Roster, On-Duty Staff, Off-Duty Staff, Studio Roles Assigned)<br>• Add Staff Action Form + Staff Roster Table with Avatar Circles, Role Tags, Duty Status Pills & Toggle Controls | Personnel roster requiring quick capacity overview and member state toggles; charts omitted as shift rosters are static lists. |
| **4** | **Customer Wallet & Courtesy Ledger** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Active Customer Balance, Courtesy Credits Issued, Total Refunded, Membership Tier)<br>• Customer Phone Search + Account Summary Card + Credit Action Form + Transaction Audit Table | Financial ledger requiring balance verification and clear transaction logs; charts omitted as customer ledger is an audit trail. |
| **5** | **Cache Registry (Tier-2 Caffeine)** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Active Cache Regions, In-Memory Entries, Total Cache Hits, Cache Misses)<br>• Risk Notice Callout + Bulk Purge Action + Cache Region Table with Hit/Miss Ratios & Eviction Controls | Systems telemetry requiring cache key inspection and cache hit-ratio monitoring; chart omitted as real-time regional tables are standard. |
| **6** | **Escalations & Quality Control** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Open Escalations, Priority Holds, QC Supervisors On-Duty, Resolved Today)<br>• Priority Intervention Banner + Order Exception Dispatch Form + Active Escalations Table | Incident queue where technicians submit garment risk overrides; needs urgency stats and ticket tables, not analytical charts. |
| **7** | **Brand Termbase Console** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Total Brand Terms, Supported Locales [EN/HI/TA/TE], Missing Translations, Sync Status)<br>• Search & Filter Toolbar + Add Term Form + Multi-lingual Translation Card List | Lexicon dictionary console requiring term lookup and inline translation editing; no proportional or time-series data exists. |
| **8** | **Journey Analytics & Telemetry** | • Shared Sidebar & Top Bar<br>• 4-Card Stat Row (Website Visitors, Play Store Installs, App Store Installs, Active Sessions)<br>• Live Health Ping Monitors + Funnel Breakdown with Progress Bars + Section Engagement Heatmap | Dedicated telemetry surface; appropriately incorporates proportional conversion funnels and ping latency meters. |

---

## 2. Design System Alignment (Hard Rule Compliance)

- **Canvas & Surfaces**: Warm cream pressed paper (`#faf6ef`), card surfaces (`#ffffff`), secondary surfaces (`#f2e8dc`).
- **Typography**:
  - Headings & Numerals: **Fraunces** (300/400/500/700 variable serif) with subtle italic accents.
  - Body, Buttons, Navigation, Labels: **Manrope** (400/500/600/700/800 sans).
- **Brand Accents**: Terracotta rust (`#b86538` / `#a2552c`), gold accents (`#d4af37`), muted espresso text (`#1a1714` / `#7d7265`), hairline borders (`#e6dcce`).
- **Punctuation & Copy Discipline**: Zero em-dashes (`—`) across all headers, badges, and tables. Zero e-commerce jargon (no revenue, average order value, conversion rate).
- **Data Integrity**: 100% real domain fields (garments, studio sessions, technicians, custody stages, fragrances, on-time delivery %).

---

## 3. Implementation Workflow & Branching Strategy

1. **Branch Creation**: `feat/operator-dashboard-restructure` created from current clean branch.
2. **Phase 1 (Typography & Layout Foundations)**:
   - Update `web/index.html` to load Google Fonts **Fraunces** & **Manrope**.
   - Update `web/src/styles/theme.css` and `web/src/styles/admin/operator-dashboard.css` with Fraunces & Manrope font variables and Harbor layout grid structures.
3. **Phase 2 (Shared Sidebar & Top Bar Components)**:
   - Create `OperatorSidebar.tsx`: Collapsible header, search input, nav list with live numeric badges, pinned studio shortcuts, user profile card at bottom.
   - Create `OperatorTopBar.tsx`: Personalized time-aware greeting ("Good Afternoon, Devendra"), current date, scope selector dropdown, notification popover bell with active hold alerts, primary action button.
4. **Phase 3 (Main Dashboard Layout Overhaul)**:
   - Refactor `OperatorDashboardPage.tsx`:
     - 4 Stat cards + 1 SVG radial gauge (96% On-Time Delivery).
     - Middle row: Throughput Line Chart + Custody Progression Breakdown with progress bars & footer stats (`96% on-time delivery`, `24h avg turnaround`).
     - Bottom row: Top Botanical Fragrances list + Restyled Active Wardrobe Sessions table with avatar circles, status pills, and inspect/advance actions.
5. **Phase 4 (Workspace Panels Alignment)**:
   - Refactor `WorkspacePanel.tsx` (Tag Printing, Staff Directory, Customer Wallet, Cache Registry, Escalations).
   - Refactor `TermbasePage.tsx` and `CustomerExperiencePage.tsx` to adopt the shared shell and page-specific stat rows.
6. **Phase 5 (Verification & Final Report)**:
   - Typecheck with `npx tsc --noEmit`.
   - Production bundle test with `npm run build`.
   - Browser subagent visual verification and recording.
   - Generate `./analysis/DASHBOARD_REDESIGN_REPORT.md`.
