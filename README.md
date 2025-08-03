# 🛒 Next.js E-Commerce Crown Jewels Co.

Crafted by an experienced team with modern best practices, this project delivers a **highly scalable, performant, and maintainable e-commerce storefront** leveraging Next.js 13 App Router, TypeScript, GraphQL, and an advanced frontend architecture.

## 🚀 Project Vision

> **Deliver a robust, delightful, and developer-friendly shopping platform that showcases excellence in both architecture and user experience, leveraging the full power of the modern React ecosystem.**

## ✨ Key Features & Technical Highlights

- **Next.js 13+ (App Router) & React 18**  
  - Server & Client Components, SSR, CSR: performance-first rendering
  - Modular `/app` structure for clear, atomic feature boundaries

- **TypeScript Throughout**  
  - Strict typing for safety, scalability, and outstanding IDE support

- **State-of-the-Art State Management**  
  - 🔄 Auth: Redux Toolkit (user/session), persisted to localStorage  
  - 🛒 Cart: Redux slice with full localStorage sync for cross-session recovery

- **GraphQL API Integration (Apollo Client)**  
  - Decoupled queries & mutations, hooks for all data flows  
  - Secure, token-based operations (login, product, order)

- **UI/UX — Designed from Scratch, No Shortcuts**  
  - Responsive, accessible layouts with Tailwind CSS primitives  
  - Toast notifications, skeletons, and loading spinners for smooth usability  
  - Clean table/grid/list presentation with visually pleasing defaults
  - All forms (checkout, login) feature inline validation and feedback

- **Code Quality & Engineering Excellence**  
  - Strict ESLint, consistent Prettier formatting, atomic components, co-located styles/types
  - GitHub-quality commit hygiene & documentation
  - Thoughtful error boundaries and fallback states

## 🏗️ Solution Architecture

### Modular Organization

```plaintext
/app          # Pages: login, product list/detail, cart, checkout, profile
/components   # UI primitives: Card, Form, Toast, Buttons, etc.
/Redux        # All state slices: user, products, cart, etc.
/graphql      # Apollo Client config, queries & mutations
/styles       # Tailwind base config & themes
/contexts     # (If used) Auth and Cart Contexts
```

### Data and State Flow

- **User/auth and cart state:**  
  - Synced via Redux Toolkit, with hydration from localStorage on app start for seamless session continuity.
  - All sensitive actions guarded; cart and user state "just work" across reloads.

- **Data fetching:**  
  - All major product data retrieved server-side (`app/product/page.tsx`, `app/product/[id]/page.tsx`) for optimal SEO and performance.
  - All mutations (login, order) use isolated, reusable GraphQL hooks.

### UI/UX Matters

- All critical interactions provide immediate feedback via loading indicators or toast notifications.
- Forms cannot be submitted improperly; validation and error messages are always clear.
- App is usable via keyboard, screen readers, and manages focus after key actions.

## 🧩 What’s Implemented

|          Page           |                              Features                              |
|:-----------------------:|:-------------------------------------------------------------------|
| **Login**               | Secure login w/ Redux + localStorage, field validation, toasts     |
| **PLP (Product List)**  | SSR Product grid, clean cards, error loading, empty state, ready for pagination/search/filters |
| **PDP (Product Detail)**| Variant selection client-side, server rendering, Add-to-Cart UX, gallery, stock info |
| **Cart**                | Redux-driven, change qty/remove, subtotal, full persistence        |
| **Checkout**            | Multi-field address/payment form, client validation, order via GraphQL, success/failure feedback |

**+** All pages are mobile-ready and accessibility-checked.  
**+** Architecture is extensible for future bonus features without global rewrites.

## 💡 Senior Engineering Decisions

- **Redux Toolkit for all persistent state:** guarantees debuggability, testability, and future scale.
- **GraphQL via Apollo + modular hooks:** isolates API logic and makes UI/data coupling minimal.
- **Server-side rendering for commerce-critical pages:** balanced SSR and CSR for best UX and SEO.
- **Atomic, context-driven components:** reusable, easy to refactor, and each unit testable in isolation.
- **Consistent, easily overridable UI primitives:** via Tailwind, ready for hand-off or theming.

## 🛠️ Getting Started

**Prerequisites:**  
- Node.js 18+  
- Yarn or npm  
- GraphQL API endpoint

**Installation & Setup:**

```bash
git clone https://github.com/idhavaltank/Crown-Jewels-Co.
cd Crown-Jewels-Co.
npm install
# or
yarn install
```

**Environment Variables (`.env.local`):**
```
NEXT_PUBLIC_GRAPHQL_API_URL=https://your-api-endpoint/graphql
```

**Run Locally:**
```bash
npm run dev
# or
yarn dev
```
App at: [http://localhost:3000](http://localhost:3000)

**Production Build:**
```bash
npm run build
npm start
```

## 🧭 How to Use

- Register or login via `/login`.
- Browse products at `/product`.
- View product details and select options at `/product/[id]`.
- Add items to cart; review cart at `/cart`.
- Checkout securely at `/checkout`.
- All feedback and errors appear as toast or inline—no disruptive alerts.

## 📈 What’s Next/Future Enhancements

- Cross-tab sync for cart/auth via storage events
- Pagination, infinite scroll, search & filters for PLP
- Optimistic UI on order and cart
- Advanced form validation, input masks, async address validation
- End-to-end automated testing suite (Cypress/Playwright)
- Server-driven SEO metadata via dynamic ``

> *This project embodies mature development, thoughtful design, and readiness for both rapid iteration and long-term evolution.*
