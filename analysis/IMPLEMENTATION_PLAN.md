# Rehaboth: Reference Improvements Implementation Plan

**Branch:** `feat/adopt-reference-improvements`  
**Date:** September 21, 2026  
**Goal:** Selectively adopt the reference app's strengths (typed contracts, real OTP lifecycle, domain service layer with mock adapter, missing customer flows, i18n, and test suites) while strictly preserving our app's superior features (Expo Router 57 file-based routing, "Paper, not glass" editorial design system, Fraunces/Manrope aesthetic, AuraOrb, and floating navigation dock).

---

## Proposed Architecture & File Tree

```text
src/
├── app/
│   ├── _layout.tsx                     # [MODIFY] Font loading with splash hold, I18nProvider
│   ├── index.tsx                       # [MODIFY] i18n strings, routes
│   ├── register.tsx                    # [MODIFY] Connected language switcher, real requestOtp hook
│   ├── verification.tsx                # [REBUILD] Real interactive CodeInput, resend timer, verifyOtp
│   ├── dashboard.tsx                   # [MODIFY] useOrders / useProfile hooks, skeleton states
│   ├── schedule-pickup.tsx             # [MODIFY] Damaged garments intake (notes + photos), routes to scent
│   ├── scent-selection.tsx             # [NEW] 4 fragrance profiles, notes, save-as-default toggle
│   ├── payment.tsx                     # [NEW] Price breakdown, promo code validator, payment method
│   ├── order-status.tsx                # [MODIFY] useOrderStatus hook, cancel button, timeline
│   ├── order-history.tsx               # [NEW] Order history list with status badges and details link
│   ├── cancel-order.tsx                # [NEW] Cancellation reason, policy terms, computed refund
│   ├── rate-delivery.tsx               # [NEW] 5-star experience rating and feedback tags
│   ├── free-bag-tracking.tsx           # [NEW] Complimentary bag shipment tracking timeline
│   ├── notifications.tsx               # [NEW] In-app notification center
│   ├── secure-handover.tsx             # [MODIFY] Interactive CodeInput verification
│   └── profile.tsx                     # [MODIFY] Connected language selector, order history link
├── components/
│   ├── CodeInput.tsx                   # [NEW] Reusable 4/6 digit interactive input (paste, auto-advance)
│   ├── TopHeaderNav.tsx                # [MODIFY] Notification bell with live unread count
│   ├── SkeletonLoader.tsx              # [NEW] Elegant cream-palette shimmer skeleton
│   ├── AuraOrb.tsx                     # [EXISTING]
│   ├── BottomTabBar.tsx                # [MODIFY] Navigation to new order history route
│   └── ...                             # [EXISTING]
├── domain/                             # [NEW] Clean architecture domain models & pure business logic
│   ├── auth.ts                         # User, credentials, tokens
│   ├── profile.ts                      # Customer profile
│   ├── address.ts                      # Address records & validation
│   ├── order.ts                        # Order request, order status, stages
│   ├── pricing.ts                      # Rate cards, promo codes, calculateOrderPricing()
│   ├── cancellation.ts                 # Cancellation reasons, calculateRefundAmount()
│   ├── payment.ts                      # Payment methods & transactions
│   ├── scent.ts                        # Scent options & default fragrance
│   ├── bag.ts                          # Smart Bag & shipment tracking
│   ├── rating.ts                       # Rating & feedback
│   ├── notification.ts                 # In-app notifications
│   ├── validators.ts                   # Phone, OTP, PIN code pure validators
│   └── index.ts                        # Barrel export
├── services/
│   ├── api/
│   │   ├── types.ts                    # IApiService contract interface
│   │   ├── client.ts                   # Fetch-based API client with timeout & headers
│   │   ├── storage.ts                  # Secure token storage (expo-secure-store + web fallback)
│   │   ├── mockAdapter.ts              # In-memory realistic mock adapter with simulated latency
│   │   └── index.ts                    # Factory returning real or mock client
│   └── hooks/
│       ├── useOrders.ts                # Active and past orders hook
│       ├── useOrderStatus.ts           # Order timeline & stage progression hook
│       ├── usePricing.ts               # Subtotal and promo code calculation hook
│       ├── useNotifications.ts         # Unread count & notification items hook
│       └── useProfile.ts               # Profile data hook
├── i18n/                               # [NEW] Lightweight type-safe localization
│   ├── locales/
│   │   ├── en.ts                       # English catalog
│   │   ├── hi.ts                       # Hindi catalog
│   │   ├── ta.ts                       # Tamil catalog
│   │   └── te.ts                       # Telugu catalog
│   ├── types.ts                        # Typed key unions
│   ├── I18nContext.tsx                 # I18nProvider, useTranslation(), locale persistence
│   └── index.ts                        # Barrel export
└── constants/
    └── theme.ts                        # [MODIFY] Font family tokens with Fraunces / Manrope
```

---

## Phase-by-Phase Plan

### Phase 1: Fix the Basics
1. **Interactive CodeInput Component:**
   - Create `src/components/CodeInput.tsx`: Accepts `length` (4 or 6), handles keyboard input, auto-focus, backspace navigation, auto-advance, full code clipboard paste, error styling, disabled states, and accessibility labels.
   - Refactor `src/app/verification.tsx` to use `<CodeInput length={4} />` with active resend countdown timer (90s countdown), error messaging, and validation.
   - Refactor `src/app/secure-handover.tsx` to use controlled code input.
2. **Typography Bundling:**
   - Install `@expo-google-fonts/fraunces` and `@expo-google-fonts/manrope`.
   - Update `src/app/_layout.tsx` to load fonts via `useFonts()` and hold the splash screen with `SplashScreen.preventAutoHideAsync()` until fonts are ready.
   - Update `src/constants/theme.ts` to reference the loaded font families with sensible system fallbacks.

### Phase 2: Domain Types & Business Logic
1. Create `src/domain/` with TypeScript interfaces and strict contracts matching our app's architecture.
2. Implement pure domain functions:
   - `calculateOrderPricing(garmentCount, promoCode, rateCard)`: Computes subtotal, applies discount percentage, handles caps and validation.
   - `calculateRefundAmount(order, cancellationReason, currentStage)`: Computes eligible refund amount based on garment custody stage (100% before studio intake, 50% during inspection, 0% during active steam finishing).
3. Implement pure input validators: `validateIndianMobile`, `validateOtp`, `validatePincode`, `validateSealCode`.

### Phase 3: Service Layer & Mock Adapter
1. Create `src/services/api/`:
   - `types.ts`: Define `IApiService` with methods `requestOtp`, `verifyOtp`, `getProfile`, `listOrders`, `getOrderStatus`, `createOrder`, `getPricing`, `applyPromo`, `cancelOrder`, `rateOrder`, `listNotifications`.
   - `storage.ts`: Persistent auth token management using `expo-secure-store` with web localStorage fallback.
   - `client.ts`: Fetch HTTP client pointing to `EXPO_PUBLIC_API_BASE_URL`.
   - `mockAdapter.ts`: Deterministic mock adapter that stores in-memory state, adds 350ms simulated network delay, and supports placing/cancelling orders, verifying OTP, and tracking notifications.
   - `index.ts`: Automatic switcher (uses real client if `EXPO_PUBLIC_API_BASE_URL` is set, otherwise mock adapter).
2. Create React hooks in `src/services/hooks/`: `useOrders`, `useOrderStatus`, `usePricing`, `useNotifications`, `useProfile`.
3. Create `src/components/SkeletonLoader.tsx` with warm cream shimmer for loading states.
4. Refactor `register.tsx`, `dashboard.tsx`, and `order-status.tsx` to use the new hooks instead of static `DemoData`.
5. Add `.env.example`.

### Phase 4: Missing Customer Screens (In "Paper, Not Glass" Design)
1. Complete booking pipeline: `schedule-pickup` -> `scent-selection` -> `payment` -> `order-status`.
2. Create `src/app/scent-selection.tsx`: Selection card for Kashmir Lavender, Fresh Cotton, Royal Sandalwood, and Unscented, with notes, price, and "Save as Default" checkbox.
3. Create `src/app/payment.tsx`: Itemized invoice, promo code input powered by `calculateOrderPricing`, payment method selection (Card, UPI, NetBanking), and test checkout button.
4. Create `src/app/order-history.tsx`: List of active and historical orders, status tags, garment count, and navigation to order status.
5. Create `src/app/cancel-order.tsx`: Cancellation reasons, policy summary, calculated refund breakdown, confirmation modal.
6. Create `src/app/rate-delivery.tsx`: 5-star rating with compliment tags and feedback comment box.
7. Update `src/app/schedule-pickup.tsx`: Add damaged garment intake section (checkbox, note textarea, photo upload button using `expo-image-picker`).
8. Create `src/app/free-bag-tracking.tsx`: Multi-stage carrier timeline for complimentary bag claim.
9. Create `src/app/notifications.tsx`: In-app notification center.
10. Update `src/components/TopHeaderNav.tsx`: Add notification bell icon with dynamic unread counter badge.

### Phase 5: Real Internationalization (i18n)
1. Implement `src/i18n/` with typed key unions and string catalogs for:
   - English (`en`)
   - Hindi (`hi`)
   - Tamil (`ta`)
   - Telugu (`te`)
2. Provide `I18nProvider` in `_layout.tsx` that persists chosen language via storage.
3. Wire language selector chips in `register.tsx` and `profile.tsx` to change locale in real time.
4. Replace hardcoded strings in core screens with `t('...')` translation calls with English fallback.

### Phase 6: Automated Test Suite & CI Readiness
1. Install and configure `jest`, `jest-expo`, and `@testing-library/react-native`.
2. Write unit tests for:
   - Pure domain functions (`pricing.test.ts`, `cancellation.test.ts`, `validators.test.ts`).
   - `CodeInput.test.tsx`: Typing, auto-advancing, paste, backspace.
   - API client & Mock adapter: Success, error simulation, timeout.
   - i18n: Language switching and fallbacks.
   - Integration & render tests: `verification`, `scent-selection`, `payment`, `cancel-order`.
3. Add npm scripts: `"test"`, `"typecheck"`, `"lint"`.

### Phase 7: Address Picker with Map Preview (Bonus)
1. Implement `src/components/AddressPicker.tsx` with map preview and geocoding abstraction.

---

## Verification & Quality Gates
- TypeScript typecheck (`npx tsc --noEmit`) clean across all phases.
- ESLint checks clean.
- Unit and component tests passing.
- Expo bundler starts cleanly (`npx expo start --web`).
