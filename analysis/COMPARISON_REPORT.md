# Architectural & Codebase Audit: Rehaboth Reference vs. Current Implementation

**Date:** September 21, 2026  
**Auditor:** Senior Full-Stack Engineer & Mobile Solutions Architect  
**Scope:** Full-fidelity comparative analysis between:
- **Reference Project:** `Rehaboth-full-codebase-no-kotlin-6ebde9a` (Enterprise Migration Monorepo, Kotlin native code excluded)
- **My Project:** `c:\Users\Mayank\Downloads\rehabooth` (Expo SDK 57 Universal App + React 18 Web Showcase)

---

## 1. Executive Summary

This audit compares the enterprise migration monorepo (`Rehaboth-full-codebase-no-kotlin-6ebde9a`) against the current application codebase (`c:\Users\Mayank\Downloads\rehabooth`). The reference project is a deeply specified, multi-surface system spanning a 32-screen React Native state machine, a feature-sliced React web portal with an enterprise Operator Command Tower, typed domain contracts (`@rehaboth/contracts`), a full REST client (`@rehaboth/api-client`), a 4-language i18n catalog, and automated test suites. However, its mobile client suffers from an unmaintainable 1,429-line monolithic `App.tsx` lacking native navigation, alongside hardcoded local developer paths (`C:\Users\rajeshjd\...`) that break CI builds. In contrast, "My Project" delivers a vastly superior aesthetic ("Paper, not glass" editorial design, Fraunces/Manrope typography, dynamic conic-gradient aura orbs, and interactive 3D physics on web) and leverages modern Expo Router 57 file-based routing. However, it is currently a 100% disconnected frontend mock with zero test coverage, non-interactive static OTP displays, and no API or contract layer.

---

## 2. Deep-Dive Understanding: Project Profiles

### 2.1 Reference Project (`Rehaboth-full-codebase-no-kotlin-6ebde9a`)

#### 1. Purpose & Target Users
Rehaboth is an ultra-premium garment care and valet pressing service operating in metropolitan India (Bengaluru hub `HUB-BLR-01`). The platform targets two distinct user groups:
- **Affluent Wardrobe Owners (B2C):** High-net-worth customers scheduling doorstep valets for luxury garments (silks, tweeds, suits), configuring fragrance infusions (Lavender, Sandalwood, Cotton), custody-tracking NFC/QR Smart Bags, and receiving PIN-verified handovers.
- **Operations & Studio Staff (B2B/Internal):** Store managers, custodians, valets, and platform super-admins utilizing the "Command Tower" workspace to monitor multi-store intake, advance garment custody stages, assign tasks, print laundry tags, adjust rate cards, and configure promotions.

#### 2. Tech Stack & Dependencies
- **Languages:** TypeScript (~5.5 to ~6.0.3), Node.js, HTML5/CSS3.
- **Mobile Client (`apps/mobile-react-native`):** React Native `0.86.3`, React `19.2.3`, Expo SDK `^57.0.0` (bare-minimum runtime without Expo Router), `@expo-google-fonts/ysabeau` (`^0.4.2`), `@expo-google-fonts/ysabeau-sc` (`^0.4.2`), `@react-native-async-storage/async-storage` (`2.2.0`), `expo-location` (`~57.0.17`), `react-native-webview` (`13.16.1`), `metro` bundler (`metro.config.js`).
- **Web Client (`apps/web-react`):** React `^18.3.1`, React DOM `^18.3.1`, React Router DOM `^6.26.0`, Vite `^5.4.0`, `@fontsource-variable/bricolage-grotesque` (`^5.3.0`), `@fontsource/palanquin` (`^5.3.0`), `@fontsource/ubuntu` (`^5.3.0`).
- **Shared Packages (`packages/*`):**
  - `@rehaboth/contracts`: Pure TypeScript type definitions (`auth.ts`, `customer-api.ts`, `order-status.ts`, `wallet.ts`, etc.).
  - `@rehaboth/api-client`: Universal HTTP client with custom React hooks (`usePromotions`, `useOrderPricing`).
  - `@rehaboth/design-tokens`: Shared core tokens (`colors`, `spacing`).
  - `@rehaboth/i18n`: Locale catalog (English, Hindi, Tamil, Kannada) with React Context and language switchers.
  - `@rehaboth/validation`: Minimal validation utilities (`isNonEmpty`).
- **Tools (`tools/*`):**
  - `tools/e2e-capture.mjs`: Headless Chrome CDP automation script.
  - `tools/i18n-server`: Standalone Node.js HTTP server for dynamic phrase delivery.
  - `tools/react-migration-mcp-server`: Custom Model Context Protocol server scaffolding migration tasks.
- **Excluded Baseline:** Kotlin 1.9+, Android SDK 35 (Jetpack Compose Material 3 BOM), Ktor 2.3+ HTTP Server (formerly in `apps/mobile`, `apps/web-landing`, and `services/api`).

#### 3. Folder Structure & Architecture
The project is organized as a Gradle-rooted monorepo with nested npm packages:
```text
Rehaboth-full-codebase-no-kotlin-6ebde9a/
├── apps/
│   ├── mobile-react-native/    # Offline showcase RN app (monolithic App.tsx)
│   ├── web-react/              # Feature-sliced React SPA (Vite + React Router)
│   ├── mobile/                 # Kotlin Android app shell (native code excluded)
│   └── web-landing/            # Ktor SSR landing resources (Kotlin code excluded)
├── packages/
│   ├── api-client/             # Typed API client + React hooks
│   ├── contracts/              # Shared TypeScript schemas & interfaces
│   ├── design-tokens/          # Basic colors and spacing
│   ├── i18n/                   # Multi-language catalog and provider
│   └── validation/             # Client-side validation primitives
├── docs/                       # Comprehensive SRS, STS, cybersecurity & handoff specs
├── qa-artifacts/               # Screenshot diffs, render benchmarks, test results
├── tools/                      # MCP server, e2e capture script, i18n server
└── gradle/                     # Gradle wrapper and global properties
```

- **Architecture Style:** Monorepo with a modular frontend web app (`apps/web-react/src/features/*`), but an anti-pattern monolithic mobile app (`apps/mobile-react-native/App.tsx`).
- **State Management:** Local React `useState` hooks, custom React Context (`LocaleProvider`, `ThemeProvider`), and hook-based cache layers (`usePromotions`, `useOrderPricing`).
- **Routing:** 
  - Web: Declarative path routing via React Router DOM 6 in `apps/web-react/src/App.tsx`.
  - Mobile: Custom imperative state machine in `apps/mobile-react-native/App.tsx` (`type Screen = "splash" | "login" | ...` with 32 screens rendered conditionally inside one component).

#### 4. Entry Points & Build Commands
- **Web:** `apps/web-react/src/main.tsx` → `index.html`. Run: `cd apps/web-react && npm run dev` (Vite dev server at `http://localhost:5173`). Build: `npm run build`. Test: `npm run test` (Vitest).
- **Mobile:** `apps/mobile-react-native/App.tsx` → `node_modules/expo/AppEntry.js`. Run: `cd apps/mobile-react-native && npx expo start`. Android build: `npx expo run:android` (targets local emulator).
- **Automation/Capture:** `node tools/e2e-capture.mjs`.

#### 5. Config, Environment & Third-Party Services
- **Environment Handling:** No `.env` files. Base URLs are hardcoded in code:
  - `apps/mobile-react-native/App.tsx` (lines 28–30): `Platform.select({ android: "http://10.0.2.2:8090", default: "http://localhost:8090" })`.
  - `apps/mobile-react-native/OperatorDashboard.tsx` (line 9): `Platform.select({ android: "http://192.168.88.6:8090", default: "http://localhost:8090" })`.
- **Third-Party Services:**
  - **OpenFreeMap & Leaflet:** In-app interactive mapping via WebView vector tiles (`LeafletMapView.tsx`, `LiveMapPanel.tsx`).
  - **OpenStreetMap Nominatim:** Reverse geocoding and address searching (`mapGeocoding.ts`).
  - **Razorpay (Sandbox):** Payment gateway contract shapes (`PaymentPromoParity.tsx`).
  - **Expo Location:** Device GPS permissions and coordinate fetching.

#### 6. Platforms Targeted
- **Mobile:** Android and iOS via React Native bare workflow + Expo runtime.
- **Web:** Desktop and tablet customer portal + full-width Operator Command Tower via Vite SPA.
- **Native Android Baseline:** Formerly targeted via Jetpack Compose (`apps/mobile`).

---

### 2.2 My Project (`c:\Users\Mayank\Downloads\rehabooth`)

#### 1. Purpose & Target Users
Rehaboth Steam is an ultra-luxury, editorial garment-care service emphasizing textile preservation, artisanal finishing, and sustainable Smart Bag custody. Target users are high-end fashion and couture owners who demand an elevated, tactile digital experience mirroring a physical luxury atelier.

#### 2. Tech Stack & Dependencies
- **Languages:** TypeScript `~6.0.3` (root) & `^5.7.3` (web), React `19.2.3` (root) & `18.3.1` (web).
- **Core Mobile / Universal App (`rehabooth` root):** Expo SDK `~57.0.16`, Expo Router `~57.0.16` (file-based routing), React Native `0.86.2`, `react-native-safe-area-context` (`~5.7.0`), `react-native-screens` (`~4.26.0`), `react-native-web` (`~0.21.0`), `react-native-gesture-handler` (`~2.32.0`), `expo-glass-effect` (`~57.0.1`), `expo-symbols` (`~57.0.2`), `expo-splash-screen` (`~57.0.8`).
- **Dedicated Web Subproject (`rehabooth/web`):** Vite `^6.0.7`, React `^18.3.1`, React Router DOM `^6.28.1`, `framer-motion` (`^11.18.2`).
- **Backend / Database:** None currently implemented. 100% client-side prototype.

#### 3. Folder Structure & Architecture
```text
rehabooth/
├── src/
│   ├── app/                    # Expo Router 57 file-based screen routes (15 screens)
│   │   ├── _layout.tsx         # Root Stack layout, ThemeProvider, ResponsiveContainer
│   │   ├── index.tsx           # Luxury Welcome / Social Splash
│   │   ├── register.tsx        # Registration form with language chips
│   │   ├── verification.tsx    # 4-box OTP verification UI
│   │   ├── dashboard.tsx       # Home dashboard, services, recent garments
│   │   ├── claim-bag.tsx       # New member gift claim
│   │   ├── smart-bag-details.tsx# Signature Smart Bag showcase & Aura Hero
│   │   ├── secure-bag.tsx      # QR / Seal code manual entry
│   │   ├── schedule-pickup.tsx # Date chips, slot picker, garment stepper
│   │   ├── select-location.tsx # Map preview graphic card & address list
│   │   ├── order-status.tsx    # 6-step progress timeline & courier badge
│   │   ├── secure-handover.tsx # 4-digit handover PIN screen
│   │   ├── profile.tsx         # Member profile, dark/light switch, preferences
│   │   ├── concierge-bot.tsx   # Real-time conversational AI chat interface
│   │   └── help-center.tsx     # Accordion FAQs, WhatsApp & Live Chat CTAs
│   ├── components/             # Reusable UI components (AuraOrb, BottomTabBar, etc.)
│   └── constants/              # theme.ts (oklch-derived palette, DemoData)
├── web/                        # Parallel Vite + React 18 web application
│   ├── src/
│   │   ├── components/         # 3D Tilt Cards, Bento Grid, Garment Visualizer
│   │   ├── pages/              # 11 React Router pages
│   │   └── data/               # demoData.ts
│   └── package.json            # Vite 6 + React 18 + Framer Motion
├── assets/                     # Icons, splash screens, adaptive icons
├── app.json                    # Expo config with React Compiler & Typed Routes
├── eas.json                    # EAS build profiles for APK & production
└── netlify.toml                # Netlify SPA deployment config for web/
```

- **Architecture Style:** Dual-project hybrid. Root contains an Expo Router universal mobile/web app; `web/` contains a specialized marketing & desktop showcase SPA.
- **State Management:** React Context (`ThemeContext.tsx` with light/dark persistence) and local component `useState`. Static demo data isolated in `src/constants/theme.ts` (`DemoData`).
- **Routing:** 
  - Root: Native file-based navigation via Expo Router 57 (`<Stack>` in `src/app/_layout.tsx`).
  - Web: React Router DOM 6 with `AnimatePresence` page transitions in `web/src/App.tsx`.

#### 4. Entry Points & Build Commands
- **Expo Universal App:** `src/app/_layout.tsx` (via `expo-router/entry`). Run: `npm run start` (`npx expo start`), `npm run android`, `npm run web`. Production build: `eas build -p android --profile preview`.
- **Web App:** `web/src/main.tsx` → `web/index.html`. Run: `cd web && npm run dev`. Build: `cd web && npm run build` (outputs to `web/dist`).

#### 5. Config, Environment & Third-Party Services
- **Configuration:** `app.json` configures Expo SDK 57 experiments (`typedRoutes: true`, `reactCompiler: true`), EAS project ID (`67074e8b-e9f5-4e9a-aeac-f9dd6f4f2538`).
- **Netlify:** `netlify.toml` publishes `web/dist` with `/* -> /index.html 200` rewrite rule.
- **Third-Party APIs:** Zero external network calls. No geocoding API, payment gateway, or analytics SDK integrated.

#### 6. Platforms Targeted
- **Mobile:** iOS and Android via Expo Prebuild / EAS Build.
- **Web:** Desktop web via both Expo Web and dedicated Vite React application.

---

## 3. Side-by-Side Architectural Comparison

| Architectural Area | Reference Project (`Rehaboth-full-codebase-no-kotlin-6ebde9a`) | My Project (`rehabooth`) | Verdict |
|---|---|---|---|
| **Architecture & Structure** | Monorepo: Gradle root, 2 frontend apps, 5 shared TS packages, tools | Hybrid Expo project: Universal mobile app in `src/` + separate Vite web SPA in `web/` | **Reference wins on modularity/contracts; Mine wins on mobile file-based routing** |
| **Mobile Routing** | Monolithic `useState("splash")` string state machine inside 1,429-line `App.tsx` | Native Expo Router 57 file-based routing (`src/app/*.tsx`) with hardware back support | **Mine is vastly superior** |
| **UI Design System** | Industrial Gold/Dark Charcoal palette (`#0D0D0D`, `#B87900`), dense tables | "Paper, not glass" cream (`#f8f3ea`), warm espresso, Fraunces serif, Aura Orb | **Mine is far more premium and editorial** |
| **Animation & Micro-interactions** | Basic CSS transitions and React Native opacity fades | Framer Motion 11 on web, 3D tilt cards, custom Aura Orb conic gradients | **Mine is significantly more engaging** |
| **Backend & Contracts** | Full `@rehaboth/contracts` (17 domains) and `@rehaboth/api-client` (32 endpoints) | Zero contracts or API client; hardcoded static data in `theme.ts` | **Reference is production-ready; Mine is a mock** |
| **Authentication Flow** | OTP request/verify contract with Bearer token storage and dev OTP fallback | Social buttons (Google/Apple) + pre-filled static OTP boxes (`2 1 9 4`) | **Reference has real auth lifecycle; Mine is purely visual** |
| **Localization (i18n)** | Shared `@rehaboth/i18n` package with 4 locales (`en`, `hi`, `ta`, `kn`) + Termbase Console | UI language chips (English, Hindi, Tamil, Telugu) in local state; no catalog | **Reference has true i18n infrastructure** |
| **Map & Geocoding** | Leaflet / OpenFreeMap WebView vector map + Nominatim geocoding | Stylized static CSS mock card with hardcoded Indiranagar coordinates | **Reference has functional mapping** |
| **Operator / Admin Tooling** | Multi-role Command Tower (order tracker, staff assignments, tag printing, rate cards) | No operator portal | **Reference only** |
| **Automated Testing** | Vitest + React Testing Library suites across 17 web features and integration flows | Zero tests, no test framework configured | **Reference has robust QA baseline; Mine has none** |
| **DevOps & Build Hygiene** | Broken hardcoded Windows user paths (`C:\Users\rajeshjd\...`) in Gradle files | Clean EAS Build config (`eas.json`) + Netlify deployment config (`netlify.toml`) | **Mine has functional cloud build configs** |
| **Code Maintainability** | High in `web-react` and `packages/`; disastrously monolithic in `mobile-react-native` | Excellent modularity across screens and components; dual web subfolder creates redundancy | **Tie (each has distinct anti-patterns)** |

---

## 4. Deep Domain Comparison

### 4.1 Features & User Flows

| Feature / Screen Flow | Reference Status | My Project Status | Classification & Gap |
|---|---|---|---|
| **Welcome / Brand Splash** | Present (`Splash` state in `App.tsx`) | Present (`src/app/index.tsx`) | **Both, implemented differently:** Reference uses dark theme with gold brand lockup; Mine features social auth buttons (Google/Apple/Email) and artistic doodles. |
| **User Registration / Auth** | Present (`Login` state) | Present (`src/app/register.tsx`) | **Both, implemented differently:** Reference validates phone and sends API request; Mine provides language pills and pre-filled inputs. |
| **OTP Verification** | Present (`VerifyOtp` state) | Present (`src/app/verification.tsx`) | **Both, implemented differently:** Reference has functional numeric input matching server OTP; Mine renders uneditable static text boxes (`2 1 9 4`). |
| **Home / Status Dashboard** | Present (`Status` state) | Present (`src/app/dashboard.tsx`) | **Both, implemented differently:** Reference displays active care cards, order ID, and service tiles; Mine includes recent garments (Armani blazer, raw silk kurta) and quick actions. |
| **Free Smart Bag Claim** | Present (`ClaimSmartBag` state) | Present (`src/app/claim-bag.tsx`) | **Both, implemented differently:** Reference enforces address selection before claiming; Mine displays promo card with ₹0 price breakdown. |
| **Smart Bag Shipment Tracking** | Present (`FreeBagTrackingScreen.tsx`) | Missing | **Only in Reference:** Tracks carrier delivery events for complimentary bags. |
| **Smart Bag Details / Vault** | Present (`BagOrder` state) | Present (`src/app/smart-bag-details.tsx`) | **Both, implemented differently:** Mine features the signature 176px Aura Orb puck with standards list; Reference uses standard card layouts. |
| **RFID / Seal Tag Registration** | Present (`SecureBag` state) | Present (`src/app/secure-bag.tsx`) | **Both, implemented differently:** Reference calls `registerSealTag` API; Mine updates local text state. |
| **Pickup Scheduling** | Present (`PickupSchedule` state) | Present (`src/app/schedule-pickup.tsx`) | **Both, implemented differently:** Reference supports damaged garment notes, photos, and slot validation; Mine offers date chips and a garment counter. |
| **Scent Selection Screen** | Present (`ScentSelection` state) | Missing as a dedicated screen | **Only in Reference:** 4 fragrance profiles with dedicated artwork and "save as default" preference. |
| **Checkout & Payment** | Present (`PaymentScreen.tsx`, Razorpay) | Missing as a dedicated screen | **Only in Reference:** Price breakdown, promo code application, card ending in 4821, and Razorpay sandbox handoff. |
| **Order Placed Confirmation** | Present (`OrderPlaced` state) | Missing | **Only in Reference:** Confirmation screen routing to Order Status or Home. |
| **Order Status & Timeline** | Present (`OrderStatus` state) | Present (`src/app/order-status.tsx`) | **Both, implemented differently:** Reference renders interactive Leaflet map; Mine displays an artisan 6-step timeline and custodian card. |
| **Order History** | Present (`OrderHistory` state) | Missing | **Only in Reference:** Past order log with garment counts, scent tags, and amounts. |
| **Order Cancellation & Policy** | Present (`cancelConfirm`, `cancelPolicy`) | Missing | **Only in Reference:** Cancellation reasons, refund calculations, and policy details. |
| **Replacement Bag Flow** | Present (`ReplacementBagScreen.tsx`) | Missing | **Only in Reference:** Workflow for ordering replacement bags with payment. |
| **Location & Address Selector** | Present (`LocationTracker`, `Address`) | Present (`src/app/select-location.tsx`) | **Both, implemented differently:** Reference uses real OpenStreetMap geocoding; Mine renders a stylized mock map graphic. |
| **Secure Handover Verification** | Present (`SecureHandover` state) | Present (`src/app/secure-handover.tsx`) | **Both, implemented differently:** Reference validates custody code via API; Mine displays static code `4 9 2 1`. |
| **Delivery Completion & Rating** | Present (`DeliveryComplete` state) | Missing | **Only in Reference:** 5-star rating submission and customer feedback loop. |
| **In-App Notification Center** | Present (`NotificationCenter.tsx`) | Missing | **Only in Reference:** Bell icon with unread count and real-time order alerts. |
| **AI Concierge Bot** | Rudimentary text field in `Concierge` | Present (`src/app/concierge-bot.tsx`) | **Mine is vastly superior:** Fully interactive chat UI with auto-reply simulation, message history, and quick inquiry pills. |
| **Help Center & FAQs** | Basic links to support | Present (`src/app/help-center.tsx`) | **Mine is vastly superior:** Accordion FAQ drawer, direct WhatsApp integration, and live concierge links. |
| **Operator Command Tower** | Full multi-store workspace | Missing | **Only in Reference:** Enterprise staff management, custody tracking, and rate card controls. |
| **Customer Experience Analytics** | Analytics dashboard & tracker | Missing | **Only in Reference:** Pageview/click tracking and system health metrics. |
| **Termbase Admin Console** | Localization management console | Missing | **Only in Reference:** Phrase translation workflow across 4 languages. |
| **Desktop Web Interactive Showcase** | Basic static web landing | Present (`web/` subfolder) | **Only in Mine:** 3D tilt cards, bento collage, garment customizer, and app store banners. |

---

### 4.2 UI/UX, Design System & Aesthetics

```text
[Reference: Industrial Dark / Gold]          [My Project: Warm Paper Editorial]
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│  REHABOTH COMMAND TOWER              │     │  ♨ REHABOTH STEAM                    │
│  Background: #0D0D0D (Deep Black)    │     │  Background: #F8F3EA (Warm Cream)    │
│  Card: #141414 (Dark Charcoal)       │     │  Card: #FFFDF9 (Soft White Surface)  │
│  Accent: #B87900 (Metallic Gold)     │     │  Primary: #C1774F (Warm Terracotta)  │
│  Typography: Ysabeau / Palanquin     │     │  Typography: Fraunces / Manrope      │
│  Hero: Text-heavy density & tables   │     │  Hero: Iridescent Conic Aura Orb     │
└──────────────────────────────────────┘     └──────────────────────────────────────┘
```

- **Color Palettes:**
  - *Reference:* Dark mode by default (`#0D0D0D`, `#141414`) with dark gold accents (`#B87900`, `#A56500`). Functional but visually heavy and utilitarian.
  - *Mine:* Defined in `design.md` and `src/constants/theme.ts`. Grounded in tactile cream paper (`#f8f3ea`), warm espresso text (`#3a3128`), and terracotta rust (`#c1774f`). Conveys bespoke garment tailoring.
- **Typography:**
  - *Reference:* Mobile uses Ysabeau / Ysabeau SC loaded via `@expo-google-fonts/ysabeau`. Web uses Palanquin and Bricolage Grotesque.
  - *Mine:* Specified as Fraunces (variable display serif) and Manrope in `design.md`. In React Native code (`src/constants/theme.ts`, lines 78–89), it falls back to system serif/Georgia and sans-serif. Google Fonts need to be explicitly bundled.
- **Visual Gestures & Hero Elements:**
  - *Reference:* Dense KPI cards, tables, and standard PNG images.
  - *Mine:* Features the signature `AuraOrb.tsx`—a conic-gradient visual element with diffuse blurs that sits behind card pucks (`smart-bag-details.tsx`), establishing a distinct brand identity.
- **Navigation Chrome:**
  - *Reference:* Web uses a desktop sidebar (`apps/web-react/src/features/OperatorDashboard/index.tsx`). Mobile lacks any persistent bottom tab bar.
  - *Mine:* Features `BottomTabBar.tsx` / `FloatingDockNav.tsx`—a floating pill container with custom geometric vector icons, active indicator pills, and safe-area insets.
- **Animations:**
  - *Reference:* Minimal CSS transitions.
  - *Mine:* `FluidMotion.tsx` page wrappers, `CurtainPullOverlay.tsx`, and Framer Motion 11 3D tilt cards on web.

---

### 4.3 Frontend Code Architecture & State Management

- **Mobile State Management:**
  - *Reference (`apps/mobile-react-native/App.tsx`):* Extreme anti-pattern. Lines 1–1429 contain 32 screens inside a single React component, managing dozens of top-level state hooks (`screen`, `customer`, `address`, `pickup`, `authToken`, `registeredBag`, etc.). Navigating between screens involves mutating string state (`setScreen("scentSelection")`), destroying scroll position and preventing native gesture navigation.
  - *Mine (`src/app/*`):* Clean modularization. Every screen is an independent file-based route under `src/app/` using Expo Router 57 (`<Stack>` in `_layout.tsx`). Component state is encapsulated within each screen.
- **Forms & Input Handling:**
  - *Reference:* Proper two-way controlled inputs across all forms, with input validation (Indian 10-digit phone regex, numeric OTP checking).
  - *Mine:* Inputs are largely pre-filled with demo values (`DemoData` in `theme.ts`). In `verification.tsx` and `secure-handover.tsx`, digits are static non-editable `Text` components.
- **Component Reusability:**
  - *Reference:* Reusable UI components are scattered. Shared tokens exist in `packages/design-tokens`, but styling is duplicated across feature CSS files.
  - *Mine:* Dedicated reusable component library in `src/components/` (`TopHeaderNav`, `GoldButton`, `AuraOrb`, `BottomTabBar`, `ResponsiveContainer`).

---

### 4.4 Backend, API & Data Contracts

- **Contracts (`packages/contracts`):**
  - *Reference:* Outstanding enterprise TypeScript contracts across 17 files:
    - `auth.ts`: `OtpRequestResult`, `CustomerRecord`, `OtpVerifyResult`, `ApiError`.
    - `customer-api.ts`: Full data structures for `AddressRequest`, `AddressRecord`, `SmartBagRecord`, `BagClaimRecord`, `OrderRequest`, `OrderRecord`, `OrderStatusHistoryRecord`.
    - `rate-card.ts`, `wallet.ts`, `garment-tag.ts`, `payment.ts`.
  - *Mine:* Zero contracts. Data shapes are implicit in hardcoded JSX strings and `DemoData` (`src/constants/theme.ts`).
- **HTTP Client (`packages/api-client`):**
  - *Reference:* Production-ready HTTP client in `packages/api-client/src/index.ts` (458 lines) exposing 32 typed async methods (`requestOtp`, `verifyOtp`, `listAddresses`, `saveAddress`, `createOrder`, `cancelOrder`, `confirmPayment`, etc.). Includes authorization header injection (`Authorization: Bearer <token>`) and custom React hooks (`usePromotions`, `useOrderPricing`).
  - *Mine:* No networking layer. Grep searches confirm zero occurrences of `fetch`, `axios`, or HTTP calls in `src/` or `web/`.

---

### 4.5 Database, Persistence & Storage

- **Local Storage:**
  - *Reference:* Utilizes `@react-native-async-storage/async-storage` (`localeStorage` in `apps/mobile-react-native/App.tsx`, line 23) to persist language choices, auth tokens, and dark/light theme state across app restarts. Web utilizes `localStorage.getItem("rehoboth-theme")`.
  - *Mine:* Theme state is persisted via React Context, but no AsyncStorage is installed at root. App reloads reset all screen modifications to demo defaults.
- **Backend Persistence:**
  - *Reference:* Designed to interface with Ktor backend in-memory/UAT SQLite stores (models mirrored in contracts).
  - *Mine:* No database integration.

---

### 4.6 Security & Secrets Audit

```text
CRITICAL AUDIT FINDINGS:
1. Reference: Hardcoded local developer path in gradle.properties (Line 4):
   org.gradle.java.home=C:\\Users\\rajeshjd\\.jdks\\ms-jdk-21-extract\\jdk-21.0.12+8
2. Reference: Hardcoded local autolinking paths in settings.gradle (Lines 8-9):
   includeBuild("C:/Users/rajeshjd/source/Rehaboth/apps/mobile-react-native/...")
3. Reference: Hardcoded private IP in OperatorDashboard.tsx (Line 9):
   http://192.168.88.6:8090
4. Reference: Hardcoded administrative auth headers in WorkspacePanel.tsx (Line 7):
   headers: { "X-Operator-Key": "demo-operator-key", "X-Operator-Role": "super_admin" }
5. Mine: Hardcoded demo credentials and OTP in theme.ts (Lines 91-99):
   DemoData.user = { phoneNumber: '98765 43210', otp: '2 1 9 4' }
```

- **Secrets Handling:**
  - *Reference:* Contains dangerous machine-specific paths and demo keys hardcoded in client source files. Client role switching (`role === "super_admin"`) is handled purely in React state without backend token validation.
  - *Mine:* No API keys or tokens are present because no external services are wired. `app.json` includes public EAS project ID `67074e8b-e9f5-4e9a-aeac-f9dd6f4f2538`.
- **Input Sanitization & OWASP:**
  - *Reference:* Has dedicated cybersecurity requirements (`docs/CYBERSECURITY_SRS_STS.md`), but `packages/validation` only implements `isNonEmpty()`. Web inputs use basic HTML5 pattern matching (`pattern="[A-Za-z][A-Za-z0-9_]*"`).
  - *Mine:* Inputs perform no regex sanitization (e.g., mobile number accepts arbitrary text if not constrained by the OS keyboard).

---

### 4.7 Testing & Quality Assurance

- **Reference Coverage:**
  - Extensive automated test suite in `apps/web-react/src/qa/` and `features/*/*.test.tsx`.
  - Includes `react-flow.integration.test.ts`, `react-components.test.tsx`, `react-secondary-components.test.tsx`, and component tests for 14 individual screens.
  - Test stack: Vitest `^2.0.5`, `@testing-library/react` `^16.3.3`, `@testing-library/jest-dom` `^7.0.1`, `jsdom` `^29.1.1`.
  - Automated visual capture script: `tools/e2e-capture.mjs`.
- **My Project Coverage:**
  - Zero test files. No test runner configured in `package.json`. No CI test script.

---

### 4.8 DevOps, Build System & Hygiene

- **Reference Project:**
  - Root relies on Gradle (`gradlew`, `gradlew.bat`), but lacks a root `package.json` with npm workspaces.
  - Hardcoded absolute paths belonging to user `rajeshjd` break Android compilation on any other workstation or CI agent.
  - No Dockerfiles or cloud deployment workflows.
- **My Project:**
  - Clean Expo SDK 57 setup with `eas.json` defining `development`, `preview` (outputs `.apk`), and `production` build profiles.
  - Netlify configuration (`netlify.toml`) automating continuous deployment of `web/` with SPA fallback redirects.
  - Working Git repository (`.git`).

---

## 5. Gaps Caused by Excluded Kotlin Code

Because the reference archive (`Rehaboth-full-codebase-no-kotlin-6ebde9a`) specifically excludes all Kotlin files, the following referenced components could not be directly audited:
1. **`apps/mobile/src/main/kotlin/`:** The original Jetpack Compose native Android customer application referenced in `CUSTOMER_FLOW_PARITY.md`. Only `AndroidManifest.xml` and resource XMLs remain.
2. **`apps/web-landing/src/main/kotlin/`:** The Ktor SSR server and lead-generation endpoint referenced in `README.md`. Only `logback.xml` and static assets remain.
3. **`services/api/`:** The core backend microservice referenced throughout `PRODUCT_HANDOFF.md` (`AuthRoutes.kt`, `AddressRoutes.kt`, `BagRoutes.kt`, `OrderRoutes.kt`, `CommercialRoutes.kt`, `PaymentRoutes.kt`). The entire directory was omitted.
4. **`libs/common-security/`:** The JVM PII redaction and validation library (`com.rehoboth.security.*`) referenced in `AGENTS.md` and `SRS.md`.
5. **`libs/common-design/`:** The Kotlin multiplatform brand tokens (`com.rehoboth.design.BrandTokens`) and native localization strings.

*Note: In accordance with audit rules, the absence of these Kotlin files is documented as context and is NOT counted as a defect of the reference project.*

---

## 6. Detailed Inventory of Strengths

### 6.1 Things Done Better in the Reference Project
1. **Full Domain Lifecycle:** Covers every real-world edge case (damaged garment photo intake, replacement bags, lost bag claims, order cancellations with partial refunds, 5-star delivery ratings).
2. **Typed Contracts (`@rehaboth/contracts`):** Eliminates guesswork between frontend and backend. Provides strict request/response interfaces for all 17 domains.
3. **API Client & Hooks (`@rehaboth/api-client`):** Clean separation of network concerns from UI code. Provides centralized error handling, token injection, and reactive pricing hooks (`useOrderPricing`).
4. **Internationalization (`@rehaboth/i18n`):** True enterprise localization covering 4 regional languages (`en`, `hi`, `ta`, `kn`) with a shared translation catalog and language switchers.
5. **Operator Command Tower:** A fully realized administrative dashboard for store managers and platform admins to manage store intake, staff assignments, garment tag printing, and live pricing.
6. **Automated Testing Suite:** 17 Vitest test suites verifying screen rendering, form submissions, and integration contracts.

### 6.2 Things Done Better in My Project (My Strengths)
1. **Modern Navigation Architecture:** Leverages Expo Router 57 file-based routing (`src/app/*.tsx`), enabling native stack transitions, deep linking, and hardware back button handling.
2. **Editorial Luxury Aesthetic:** The "Paper, not glass" design language (`#f8f3ea`, Fraunces serif, warm espresso) looks like a world-class luxury brand rather than an internal admin portal.
3. **Visual Identity & The Aura Orb:** Custom-engineered mathematical conic-gradient hero element (`AuraOrb.tsx`) gives the product instant visual recognition.
4. **Interactive AI Concierge:** Features an active, conversational concierge chat interface (`src/app/concierge-bot.tsx`) with auto-responses, quick inquiry pills, and message state.
5. **Floating Dock Navigation:** `BottomTabBar.tsx` provides a polished, floating pill dock with custom vector geometry that stays accessible across primary screens.
6. **Interactive Desktop Web Subproject:** `web/` provides a desktop-grade acquisition showcase with 3D card tilt physics, interactive garment visualizers, and bento grid layouts.
7. **Cloud Build Readiness:** Configured with `eas.json` for cloud APK generation and `netlify.toml` for automated static deployments.

---

## 7. Prioritized Recommendations for My Project

Ranked by **Effort** vs. **Impact**:

| Priority | Recommendation | Impact | Effort | Rationale |
|---|---|---|---|---|
| **HIGH** | **Import `@rehaboth/contracts` into My Project** | Maximum | Low | Establishes strict data models for orders, addresses, bags, and user profiles, replacing hardcoded strings. |
| **HIGH** | **Import & Integrate `@rehaboth/api-client`** | Maximum | Medium | Replaces hardcoded `DemoData` with real HTTP calls, authentication token storage, and pricing hooks. |
| **HIGH** | **Make Form Inputs Truly Interactive** | High | Low | Replace static `Text` boxes in `verification.tsx` and `secure-handover.tsx` with functional, controlled `TextInput`s. |
| **HIGH** | **Add Missing Customer Screens: Scent Selection & Payment** | Maximum | Medium | Adopting the reference's Scent Selection and Payment screens closes the gap between scheduling a pickup and tracking an order. |
| **MEDIUM** | **Adopt `@rehaboth/i18n` Translation Catalog** | High | Medium | Wire the language chips in `register.tsx` and `profile.tsx` to the shared catalog so UI labels dynamically render in Hindi, Tamil, or Telugu. |
| **MEDIUM** | **Add Order History & Cancellation Flows** | Medium | Medium | Implements customer account management and order cancellation policies. |
| **MEDIUM** | **Configure Automated Testing (Vitest + RTL)** | High | Medium | Introduce Vitest and React Native Testing Library to verify screens and prevent regressions. |
| **LOW** | **Port the Operator Command Tower as a Web Sub-route** | Medium | High | Re-host the reference project's `OperatorDashboard` under `web/src/pages/admin/` for internal store management. |
| **LOW** | **Consolidate Web Redundancy** | Medium | Medium | Unify the root Expo web build and the nested `web/` Vite app to eliminate dual-maintenance overhead. |

---

## 8. Step-by-Step Action Plan to Close the Gaps

### Phase 1: Foundation & Contracts (Days 1–2)
1. **Extract Packages:** Copy `packages/contracts` and `packages/api-client` from the reference project into `c:\Users\Mayank\Downloads\rehabooth\packages\`.
2. **Configure Monorepo Workspaces:** Update root `package.json` in `rehabooth` to include `"workspaces": ["packages/*"]` and link `@rehaboth/contracts` and `@rehaboth/api-client`.
3. **Install Storage:** Install `@react-native-async-storage/async-storage` to enable token and preference persistence.

### Phase 2: Form Interactivity & Authentication (Days 3–4)
1. **Fix OTP Inputs (`src/app/verification.tsx`):** Replace static digit boxes with an accessible 4-digit numeric input supporting auto-focus and clipboard paste.
2. **Wire Auth Client:** Connect `register.tsx` to `apiClient.requestOtp()` and `verification.tsx` to `apiClient.verifyOtp()`, storing the returned Bearer token in AsyncStorage.

### Phase 3: Complete the Customer Order Flow (Days 5–7)
1. **Create Scent Selection Route (`src/app/scent-selection.tsx`):** Port the 4-fragrance selection grid from the reference project, styling it with the warm paper design system and linking it from `schedule-pickup.tsx`.
2. **Create Payment & Checkout Route (`src/app/payment.tsx`):** Port `PaymentPromoParity.tsx` from the reference, allowing promo code entry (`STEAMGOLD20`), subtotal calculation via `useOrderPricing`, and Razorpay mock checkout.
3. **Create Order History Route (`src/app/order-history.tsx`):** Add historical order tracking accessible from `dashboard.tsx` and `profile.tsx`.

### Phase 4: Localization & Quality Assurance (Days 8–10)
1. **Wire i18n Catalog:** Copy `packages/i18n`, wrap `src/app/_layout.tsx` with `LocaleProvider`, and replace static strings with `t("BrandName")`, `t("ServiceName")`, etc.
2. **Setup Vitest:** Configure Vitest and React Testing Library to test all primary customer screens.
3. **Fix Fonts:** Explicitly bundle `@expo-google-fonts/fraunces` and `@expo-google-fonts/manrope` in `_layout.tsx` to eliminate fallback system fonts.

---

*Report compiled and verified against source files in both codebases.*
