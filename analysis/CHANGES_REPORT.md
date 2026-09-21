# Rehaboth Customer Experience & Architecture Modernization: Changes Report

**Target Project:** `c:\Users\Mayank\Downloads\rehabooth`  
**Reference Codebase (Read-Only):** `c:\Users\Mayank\Downloads\rehabooth\Rehaboth-full-codebase-no-kotlin-6ebde9a`  
**Active Git Branch:** `feat/adopt-reference-improvements`  
**Date:** September 2026  
**Status:** All Phases (0 through 7) Complete & Verified (Tests: 8/8 suites passing, TypeScript: 0 errors, ESLint: 0 errors)

---

## Executive Summary

This transformation elevated the Rehaboth Expo app from a static demo mockup to a production-grade luxury concierge experience. By selectively adopting architectural strengths from the reference codebase (typed domain contracts, API abstraction layer with resilient mock fallback, multi-language i18n catalogs, and end-to-end customer care workflows), the application now offers a complete digital atelier experience while preserving and celebrating our signature **"Paper, not glass"** design system (`#f8f3ea`, `#3a3128`, Fraunces and Manrope typography, AuraOrb, and FloatingDockNav).

---

## 1. Summary of Changes Per Phase

### Phase 0: Discovery & Implementation Planning
- Inspected both codebases, comparing contract structures, route topologies, styling patterns, and asset configurations.
- Formulated the comprehensive architectural roadmap in [IMPLEMENTATION_PLAN.md](file:///c:/Users/Mayank/Downloads/rehabooth/analysis/IMPLEMENTATION_PLAN.md).

### Phase 1: Foundation & Input Basics (Commit `69dded2`)
- **Interactive Code Input Component:** Built a reusable, accessible, controlled numeric input component supporting:
  - 4-digit and 6-digit pin modes (`length={4 | 6}`)
  - Auto-advancing focus on entry and auto-backtracking on backspace
  - Full clipboard paste handling (slices and populates all digit boxes)
  - Accessible screen-reader labels (`Digit X of Y`) and active focus/error borders
- **True Google Fonts Bundling:**
  - Installed `@expo-google-fonts/fraunces` and `@expo-google-fonts/manrope`.
  - Configured `useFonts` with `SplashScreen.preventAutoHideAsync()` in [src/app/_layout.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/_layout.tsx) to eliminate system font fallbacks.
  - Updated [src/constants/theme.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/constants/theme.ts) with display (`Fraunces_600SemiBold`, `Fraunces_700Bold`) and body (`Manrope_400Regular`, `Manrope_500Medium`, `Manrope_600SemiBold`) typography tokens.
- **Screen Rebuilds:**
  - Rebuilt [src/app/verification.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/verification.tsx) with live countdown resend timer (`01:30`), demo hints (`2194`), and controlled CodeInput.
  - Rebuilt [src/app/secure-handover.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/secure-handover.tsx) with a 4-digit custodian validation code interface.

### Phase 2: Domain Contracts & Business Logic (Commit `3beefd2`)
Created the `src/domain/` module housing strong TypeScript models, domain validators, and pure business calculations:
- [src/domain/auth.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/domain/auth.ts): `AuthUser`, `OtpRequestInput`, `OtpRequestResult`, `AuthSession`
- [src/domain/profile.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/domain/profile.ts): `CustomerProfile`, `MembershipTier`, `ProfileUpdateInput`
- [src/domain/order.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/domain/order.ts): `Order`, `OrderStatus`, `OrderTimelineEvent`, `OrderCreationInput`, `DamagedItemIntake`
- [src/domain/pricing.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/domain/pricing.ts): Pure function `calculateOrderPricing(garmentCount, promoCode?, scentId?)` with tiered pricing rules:
  - Base garment rate: ₹99/garment (Atelier Pressing)
  - Scent fee: Complimentary for signature scents, custom formulation fee calculated if applicable
  - Valet fee: Complimentary doorstep delivery
  - Privilege codes: `STEAMGOLD20` (20% savings), `REHABOTH100` (₹100 flat courtesy for 5+ items), `ATELIER50` (50% intro capped at ₹1,000 for 10+ garments)
- [src/domain/cancellation.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/domain/cancellation.ts): Pure function `calculateRefundAmount(order, reason)` implementing the fair cancellation schedule:
  - `pickup_scheduled`: 100% full refund
  - `valet_assigned` / `in_transit`: 90% refund (₹50 valet logistics fee deducted)
  - `atelier_intake` / `inspection`: 50% refund (materials and handling retained)
  - `steaming` / `dispatched` / `delivered`: 0% refund (service completed)
- [src/domain/validators.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/domain/validators.ts): Pure validators for Indian phone numbers (+91), OTP codes (4/6 digits), PIN codes (6 digits, non-zero starting), email addresses, and Smart Bag seal tags (`RS-XXXXX`).

### Phase 3: Service Layer & Resilient Mock Mode (Commit `7d18ffc`)
- **API Client Architecture (`src/services/api/`):**
  - [client.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/services/api/client.ts): Fetch-based HTTP client supporting configurable timeouts (default 10s), Bearer token injection, normalized `ApiError` handling with user-friendly error codes (`NETWORK_ERROR`, `TIMEOUT_ERROR`, `UNAUTHORIZED`, `SERVER_ERROR`).
  - [tokenStorage.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/services/api/tokenStorage.ts): Encrypted token storage utilizing `expo-secure-store` on native iOS/Android, with graceful fallback to `localStorage` on Web.
  - [mockAdapter.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/services/api/mockAdapter.ts): Full in-memory backend simulation serving all operations (`requestOtp`, `verifyOtp`, `getProfile`, `listOrders`, `getOrderStatus`, `createOrder`, `cancelOrder`, `rateOrder`, `listNotifications`, `claimSmartBag`) with realistic latency (150–350ms).
  - [index.ts](file:///c:/Users/Mayank/Downloads/rehabooth/src/services/api/index.ts): Automatic fallback: if `EXPO_PUBLIC_API_BASE_URL` is unset or blank, the app seamlessly defaults to `MockApiAdapter`.
- **Data Hooks (`src/services/hooks/`):**
  - `useOrders()`: Fetches full past and active orders with loading, error, and refresh triggers.
  - `useOrderStatus(orderId)`: Real-time tracking and cancellation dispatcher for individual orders.
  - `usePricing(count, promo, scent)`: Live pricing breakdown provider.
  - `useNotifications()`: Notification center watcher with unread count computation.
- **Skeletons & Screen Migrations:**
  - Created [src/components/SkeletonLoader.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/components/SkeletonLoader.tsx) with warm paper shimmer animation matching `#f8f3ea`.
  - Refactored [src/app/dashboard.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/dashboard.tsx) to fetch orders, user profile, and notifications via hooks, displaying loading skeletons and dynamic stats.
  - Refactored [src/app/register.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/register.tsx) to use `apiService.requestOtp` with domain validation and loading states.
  - Refactored [src/app/order-status.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/order-status.tsx) to fetch live status by order ID, dynamic cancellation routing, and interactive rating triggers.

### Phase 4: Missing Customer Flow Screens (Commit `16c87d3`)
Completed the complete end-to-end customer care journey in the "Paper, not glass" aesthetic:
1. **Damaged Garment Intake ([src/app/schedule-pickup.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/schedule-pickup.tsx)):** Added pre-pickup condition reporting with checkbox, detailed notes, and multi-photo picker via `expo-image-picker` (with permission handling and thumbnail gallery).
2. **Signature Scent Selection ([src/app/scent-selection.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/scent-selection.tsx)):** Choose between Kashmir Lavender, Fresh Crisp Cotton, Mysore Royal Sandalwood, or Pure Neutral (Hypoallergenic), complete with olfactory notes, a "Save as Default Wardrobe Aroma" toggle, and routing to Payment.
3. **Payment & Settlement ([src/app/payment.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/payment.tsx)):** Live itemized valuation breakdown (`calculateOrderPricing`), interactive promo code application, and payment method selector (UPI/QR, Cards, Net Banking, Pay on Doorstep Valet) powered by an abstracted `IPaymentProvider` interface ([src/services/payment/](file:///c:/Users/Mayank/Downloads/rehabooth/src/services/payment/)).
4. **Order History Ledger ([src/app/order-history.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/order-history.tsx)):** Historical archive listing past orders, garment counts, scent infusions, totals, and direct tap-to-status inspection. Wired to the Orders tab in `BottomTabBar`.
5. **Session Cancellation ([src/app/cancel-order.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/cancel-order.tsx)):** Reason selection, atelier refund schedule table, dynamic refund computation, and confirmation alerts.
6. **Valet Delivery Rating ([src/app/rate-delivery.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/rate-delivery.tsx)):** Interactive 5-star rating with compliment badges (*Immaculate Creases*, *Punctual Valet*, *Signature Fragrance*, *Eco Packaging*) and written feedback.
7. **Free Smart Bag Tracking ([src/app/free-bag-tracking.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/free-bag-tracking.tsx)):** Dispatch timeline for the complimentary antimicrobial Smart Bag, courier tracking ID, and NFC pairing instructions.
8. **Notification Center ([src/app/notifications.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/notifications.tsx)):** Inbox with unread indicators and deep links. Added a live unread bell icon badge (`🔔`) in [src/components/TopHeaderNav.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/components/TopHeaderNav.tsx).

### Phase 5: Multi-Language i18n Catalog & Persistence (Commit `2c98822`)
- Created lightweight i18n system in `src/i18n/` with typed key catalogs:
  - English (`en.ts`), Hindi (`hi.ts`), Tamil (`ta.ts`), and Telugu (`te.ts`).
  - Machine-translated strings are clearly flagged with `// TODO: Human review required for machine-translated strings`.
  - Automatic English fallback for missing keys or undefined values.
- Built [src/i18n/I18nContext.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/i18n/I18nContext.tsx) with persistent locale storage via `tokenStorage.setLocale`.
- Wrapped root layout [src/app/_layout.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/_layout.tsx) in `<I18nProvider>`.
- Connected interactive language chips in `register.tsx` and `profile.tsx` so changing languages instantly updates all UI text and persists across app restarts.

### Phase 6: Comprehensive Automated Test Suite (Commit `ca6d0ed`)
- Configured `jest-expo`, `@react-native/jest-preset`, and `@testing-library/react-native` v14 with React 19 test renderer.
- Created custom `jest.config.js`, `jest.setup.js`, and `jest.setup-env.js` with module mappings for React Native 0.86 environment changes.
- Authored 7 comprehensive test suites covering all required modules:
  1. `__tests__/CodeInput.test.tsx`: 4/6-digit box counts, digit entry, paste handling, controlled updates.
  2. `__tests__/pricing.test.ts`: Base rates, tiered promos (`STEAMGOLD20`, `REHABOTH100`, `ATELIER50`), minimum garment rules.
  3. `__tests__/cancellation.test.ts`: Stage-based refund percentages (100%, 90%, 50%, 0%), deduction calculations.
  4. `__tests__/validators.test.ts`: Indian phone (+91, leading 0), OTPs, pincodes (non-zero leading), Smart Bag seal tags (`RS-`).
  5. `__tests__/apiClient.test.ts`: Mock mode detection, OTP request/verify lifecycle, order CRUD, cancel, rate, normalized network errors.
  6. `__tests__/i18n.test.tsx`: Default English, dynamic switching to HI/TA/TE, missing key fallback to English, raw key fallback.
  7. `__tests__/screens.test.tsx`: Async rendering and interaction tests for `verification.tsx`, `scent-selection.tsx`, `payment.tsx`, and `cancel-order.tsx`.
- Added `"test": "jest"`, `"typecheck": "tsc --noEmit"`, and `"lint": "eslint ."` scripts to `package.json`. Configured ESLint v9 flat config `eslint.config.js`.

### Phase 7: Abstracted Geocoding Address Picker (Commit `dcb2959`)
- Created `src/services/geo/`:
  - `types.ts`: `IGeocodingService`, `GeocodedLocation`, `GeoCoordinates`.
  - `provider.ts`: `MockGeocodingService` (with Bengaluru coverage zones: Indiranagar, Lavelle Road, Koramangala, Whitefield, Sadashivanagar, HSR Layout) and `NominatimGeocodingService` (documenting OpenStreetMap usage policies and production Mapbox/Google guidelines).
- Upgraded [src/app/select-location.tsx](file:///c:/Users/Mayank/Downloads/rehabooth/src/app/select-location.tsx) into an interactive address search screen featuring:
  - Live debounced search with serviceability badges.
  - Paper map canvas preview showing coordinates, radar crosshairs, and distance to the nearest atelier hub.
  - Interactive selection between search suggestions and saved residences/offices.
- Added `__tests__/geocoding.test.ts` (8th test suite).

---

## 2. What Was Deliberately NOT Adopted from the Reference

| Reference Item | Reason for Deliberate Exclusion |
|---|---|
| **Monolithic `App.tsx` String-State Navigation** | The reference app switches views via `currentScreen === 'scent' ? <Scent /> : ...` in one huge component. Our app uses Expo Router's file-based routing (`/schedule-pickup`, `/payment`, `/scent-selection`), which enables clean URL deep linking, back-stack management, and universal web support. |
| **Dark / High-Contrast Gold UI Code** | The reference uses black backgrounds and yellow-gold buttons. Our app adheres strictly to the **"Paper, not glass"** design system (`#f8f3ea` parchment, `#3a3128` rich espresso, terracotta `#c1774f`, Fraunces serif headlines, and warm tactile cards). |
| **Operator Command Tower & Console** | The reference bundles an internal operator dashboard inside the customer mobile app with hardcoded admin credentials. Customer apps must remain clean and decoupled from operational back-office tools. |
| **Hardcoded Windows Paths & Local IPs** | The reference contained hardcoded `D:\...` paths and local IP addresses (`192.168.x.x`). All endpoints in our app use standard `EXPO_PUBLIC_*` variables with safe defaults. |
| **Plain Unencrypted AsyncStorage for Tokens** | The reference stored auth tokens in plain AsyncStorage. We adopted `expo-secure-store` with hardware-backed encryption keychain on iOS and Android Keystore on Android. |
| **Analytics Event Tracker Stubs** | The reference had unfinished analytics stubs. We kept the service layer pure, focusing on domain integrity, typed responses, and deterministic testing. |

---

## 3. Assumptions Made

1. **Backend URL Unset -> Mock Mode:** When `EXPO_PUBLIC_API_BASE_URL` is empty or undefined, the app defaults to `MockApiAdapter`. This allows developers and stakeholders to run and test the complete app without running a local backend server.
2. **Demo OTP Codes:** In mock mode, codes `1234` (or `2194` shown on the screen) and `123456` are treated as valid for instant verification.
3. **Payment Provider:** Payments are processed through the `IPaymentProvider` interface. In development and test environments, `MockPaymentProvider` auto-approves all UPI and Card transactions after a 400ms simulation delay. Razorpay can be activated by providing `EXPO_PUBLIC_RAZORPAY_KEY_ID`.
4. **Primary Coverage Hub:** The initial concierge coverage is focused on Bengaluru (PIN codes starting with `560`), with primary atelier facilities in Indiranagar and Lavelle Road.
5. **Machine Translations:** Non-English catalogs (Hindi, Tamil, Telugu) use culturally appropriate vernacular terms for laundry, steam care, and wardrobe preservation, marked with `// TODO: Human review required for machine-translated strings` for native copywriter audit before production launch.

---

## 4. How to Switch from Mock Mode to a Real Backend

To transition from the built-in mock mode to a live REST API backend:

1. **Set Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set your backend URL:
   ```ini
   EXPO_PUBLIC_API_BASE_URL=https://api.rehaboth.com/v1
   ```

2. **Backend API Contract:**
   Ensure your backend implements the endpoints matching `ApiClient` in `src/services/api/`:
   - `POST /auth/otp/request` -> `{ phone: string, fullName?: string }`
   - `POST /auth/otp/verify` -> `{ phone: string, otp: string }` -> returns `{ token: string, user: AuthUser }`
   - `GET /profile` -> returns `CustomerProfile`
   - `GET /orders` -> returns `Order[]`
   - `GET /orders/:id` -> returns `Order`
   - `POST /orders` -> `{ addressId, pickupDate, timeSlot, garmentCount, scentId, paymentMethod, promoCode, damagedItemIntake }` -> returns `Order`
   - `POST /orders/:id/cancel` -> `{ reason: string }` -> returns `RefundCalculationResult`
   - `POST /orders/:id/rate` -> `{ ratingStars: number, complimentTags?: string[], feedback?: string }`
   - `GET /notifications` -> returns `NotificationItem[]`

3. **Authentication Token Lifecycle:**
   On login, `tokenStorage.setToken(token)` stores the JWT in `expo-secure-store`. All subsequent requests sent by `ApiClient` automatically include the header:
   ```http
   Authorization: Bearer <jwt_token>
   ```

4. **Payment Gateway Integration:**
   To connect Razorpay or Stripe:
   - Create `src/services/payment/RazorpayPaymentProvider.ts` implementing `IPaymentProvider`.
   - Set `EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...` in `.env`.
   - Swap the default export in `src/services/payment/index.ts`.

---

## 5. Items for Decision / Next Steps

1. **Production Geocoder Provider:** We documented and implemented both `MockGeocodingService` and `NominatimGeocodingService` behind `IGeocodingService`. For production scale exceeding OpenStreetMap's 1 req/sec limit, decide whether to plug in Mapbox or Google Places API.
2. **Native Copywriter Review:** Human review of Hindi, Tamil, and Telugu translations in `src/i18n/catalogs/` (all machine-translated strings are flagged with TODOs).
3. **Razorpay Native SDK:** For native UPI intent deep-linking on Android/iOS devices, install `react-native-razorpay` or use Razorpay Standard Web Checkout.

---

## 6. How to Run the App, Tests, and Quality Checks

### Run All Unit & Screen Tests
```bash
npm test
```
*Current status: 8 test suites passed, 43 tests passed, 0 failures.*

### Run TypeScript Typecheck
```bash
npm run typecheck
```
*Current status: 0 TypeScript errors (`tsc --noEmit`).*

### Run ESLint Quality Checks
```bash
npm run lint
```
*Current status: 0 lint errors (`eslint .`).*

### Start the Expo Development Server
```bash
npm start
# or for web preview
npm run web
```
- Press `w` to open in browser.
- Press `a` to open on an Android emulator or scan the QR code with Expo Go on a physical device.

---

## 7. Complete Manifest of Created & Modified Files

### Files Created:
1. `src/components/CodeInput.tsx` (Reusable 4/6 digit controlled input)
2. `src/components/SkeletonLoader.tsx` (Warm paper shimmer loading skeleton)
3. `src/domain/index.ts` (Domain barrel export)
4. `src/domain/auth.ts` (Authentication contracts)
5. `src/domain/profile.ts` (Customer profile contracts)
6. `src/domain/address.ts` (Address contracts)
7. `src/domain/order.ts` (Order status, creation, and damage intake contracts)
8. `src/domain/pricing.ts` (Pricing breakdown and pure discount function)
9. `src/domain/cancellation.ts` (Cancellation reasons and pure refund function)
10. `src/domain/scent.ts` (Signature scent catalog)
11. `src/domain/bag.ts` (Smart Bag tracking contracts)
12. `src/domain/notification.ts` (Notification contracts)
13. `src/domain/rating.ts` (Order rating contracts)
14. `src/domain/payment.ts` (Payment method contracts)
15. `src/domain/validators.ts` (Indian mobile, OTP, pincode, seal code validators)
16. `src/services/api/index.ts` (API service factory with mock toggle)
17. `src/services/api/types.ts` (IApiService interface and ApiError class)
18. `src/services/api/client.ts` (Fetch client with auth headers and timeouts)
19. `src/services/api/tokenStorage.ts` (expo-secure-store with web fallback)
20. `src/services/api/mockAdapter.ts` (In-memory mock backend adapter)
21. `src/services/hooks/index.ts` (Hooks barrel export)
22. `src/services/hooks/useOrders.ts` (Orders list hook)
23. `src/services/hooks/useOrderStatus.ts` (Order status & cancel hook)
24. `src/services/hooks/usePricing.ts` (Dynamic pricing calculation hook)
25. `src/services/hooks/useNotifications.ts` (Notification center hook)
26. `src/services/payment/types.ts` (IPaymentProvider contract)
27. `src/services/payment/provider.ts` (MockPaymentProvider implementation)
28. `src/services/payment/index.ts` (Payment provider export)
29. `src/services/geo/types.ts` (IGeocodingService interface)
30. `src/services/geo/provider.ts` (Mock & Nominatim geocoding services)
31. `src/services/geo/index.ts` (Geo service export)
32. `src/app/scent-selection.tsx` (Signature scent picker screen)
33. `src/app/payment.tsx` (Payment, promo code, and checkout screen)
34. `src/app/order-history.tsx` (Past wardrobe sessions archive)
35. `src/app/cancel-order.tsx` (Cancellation reason & refund schedule screen)
36. `src/app/rate-delivery.tsx` (5-star rating & valet feedback screen)
37. `src/app/free-bag-tracking.tsx` (Smart Bag courier tracking timeline)
38. `src/app/notifications.tsx` (Notification center screen)
39. `src/i18n/index.ts` (i18n barrel export)
40. `src/i18n/types.ts` (i18n types & key definitions)
41. `src/i18n/I18nContext.tsx` (React i18n context provider with persistence)
42. `src/i18n/catalogs/index.ts` (Catalogs barrel export)
43. `src/i18n/catalogs/en.ts` (English catalog)
44. `src/i18n/catalogs/hi.ts` (Hindi catalog)
45. `src/i18n/catalogs/ta.ts` (Tamil catalog)
46. `src/i18n/catalogs/te.ts` (Telugu catalog)
47. `jest.config.js` (Jest test configuration)
48. `jest.setup.js` (Mocks for Expo, SecureStore, Router, SafeArea)
49. `jest.setup-env.js` (React Native 0.86 Jest preset polyfill)
50. `eslint.config.js` (ESLint v9 flat configuration)
51. `__tests__/CodeInput.test.tsx` (CodeInput tests)
52. `__tests__/pricing.test.ts` (Pricing pure function tests)
53. `__tests__/cancellation.test.ts` (Refund calculation tests)
54. `__tests__/validators.test.ts` (Domain validator tests)
55. `__tests__/apiClient.test.ts` (API client & mock adapter tests)
56. `__tests__/i18n.test.tsx` (i18n switching & fallback tests)
57. `__tests__/screens.test.tsx` (Customer screen interaction tests)
58. `__tests__/geocoding.test.ts` (Geocoding & serviceability tests)
59. `analysis/IMPLEMENTATION_PLAN.md` (Initial roadmap)
60. `analysis/CHANGES_REPORT.md` (This document)

### Files Modified:
1. `package.json` (Added dependencies, fonts, test runner, npm scripts)
2. `tsconfig.json` (Added jest types and path mappings)
3. `.env.example` (Added API URL, geocoder, and payment variables)
4. `src/app/_layout.tsx` (Bundled Fraunces/Manrope fonts with splash hold; wrapped in `<I18nProvider>`)
5. `src/constants/theme.ts` (Updated typography tokens to use bundled fonts)
6. `src/components/TopHeaderNav.tsx` (Added live unread notifications bell)
7. `src/components/BottomTabBar.tsx` (Wired Orders tab to `/order-history`)
8. `src/app/verification.tsx` (Rebuilt with CodeInput and countdown timer)
9. `src/app/secure-handover.tsx` (Rebuilt with controlled handover CodeInput)
10. `src/app/register.tsx` (Wired to API service and dynamic language switcher)
11. `src/app/dashboard.tsx` (Wired to data hooks, dynamic stats, and skeleton loaders)
12. `src/app/order-status.tsx` (Wired to live order status hook and cancellation flow)
13. `src/app/schedule-pickup.tsx` (Added damaged garment intake with camera photo picker)
14. `src/app/select-location.tsx` (Upgraded with geocoding service, live search, and map preview)
15. `src/app/profile.tsx` (Connected to live profile and language selector)
