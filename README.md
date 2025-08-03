# 🛒 Crown Jewels Co. - Next.js E-Commerce Platform

Crafted by an experienced team with modern best practices, this project delivers a **highly scalable, performant, and maintainable e-commerce storefront** leveraging Next.js 13 App Router, TypeScript, GraphQL, and an advanced frontend architecture.

## 🚀 Project Vision

> **Deliver a robust, delightful, and developer-friendly shopping platform that showcases excellence in both architecture and user experience, leveraging the full power of the modern React ecosystem.**

## ✨ Key Features & Technical Highlights

- **Next.js 13+ (App Router) & React 18**

  - Server & Client Components, SSR, CSR: performance-first rendering
  - Modular `/app` structure with clear, atomic feature boundaries

- **TypeScript Throughout**

  - Strict typing ensures safety, scalability, and superior IDE support

- **State-of-the-Art State Management**

  - 🔄 Auth state with Redux Toolkit, persisted via localStorage for session continuity
  - 🛒 Cart managed by Redux slice with localStorage sync for cross-session recovery

- **GraphQL API Integration (Apollo Client)**

  - Decoupled queries & mutations, custom React hooks for all data flows
  - Secure, token-based operations including login and order placement

- **UI/UX — Designed From Scratch**

  - Responsive, accessible UI built using Tailwind CSS primitives
  - Toast notifications, loading spinners, and skeletons ensure smooth usability
  - Clear, clean layout for tables, grids, and lists with polished defaults
  - Inline validation and real-time feedback on all forms (checkout, login)

- **Code Quality & Engineering Excellence**
  - Strict ESLint & Prettier configs for consistent code style
  - Atomic, reusable components with co-located styles and types
  - Robust error boundaries and graceful fallback UI

## 🏗️ Solution Architecture

### Modular Organization

```
/app          # Pages: login, product list/detail, cart, checkout, profile
/components   # UI primitives: Card, FormInput, Toast, Buttons, etc.
/Redux        # All Redux slices: user, products, productDetail, cart
/graphql      # Apollo Client setup, queries & mutations
/styles       # Tailwind configuration & theming
/contexts     # React Contexts for Auth and Cart state
/services     # API services and GraphQL hooks
/utils        # Utility functions and helpers
```

### Data and State Flow

- **User/Auth & Cart State:**  
  Synchronized with Redux Toolkit, hydrated from localStorage on app load for seamless session continuity. All sensitive actions guarded with appropriate authentication checks.

- **Data Fetching:**  
  Product data is fetched server-side for all commerce-critical pages for optimal performance and SEO benefits. Mutations (login, order creation) use isolated, reusable GraphQL hooks.

## 🧩 Implemented Functionality

|           Page           | Features                                                                                                        |
| :----------------------: | :-------------------------------------------------------------------------------------------------------------- |
|        **Login**         | Secure login via Redux + persisted token, inline validation, toast feedback                                     |
|  **Product List (PLP)**  | Server-side rendered product grid, error/empty states, ready for filters & pagination                           |
| **Product Detail (PDP)** | Variant selectors, add-to-cart UX, image gallery, pricing & availability info                                   |
|         **Cart**         | Redux-driven cart with quantity updates, removal, subtotal calculations, and persistence                        |
|       **Checkout**       | Multi-field shipping/payment form with client-side validation, GraphQL order mutation, success/failure handling |

> All pages are fully responsive and accessibility-audited, ensuring a seamless UX across devices and users.

## 💡 Senior Engineering Decisions

- **Redux Toolkit for All Persistent State:**  
  Guarantees debuggability, testability, and future scalability in user session and cart state persistence.

- **Apollo Client with Modular Hooks:**  
  Isolates GraphQL logic for minimal coupling between UI and data layer.

- **Balanced SSR & CSR Usage:**  
  Server-side rendering for SEO-critical pages, combined with client-side interactions for responsiveness and UX polish.

- **Atomic, Context-Driven Components:**  
  Enhances maintainability and allows isolated testing and extensibility.

- **Consistent & Overridable UI Components:**  
  Developed atop Tailwind CSS for rapid theming and design adjustments.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to a compatible GraphQL API endpoint

### Installation

```bash
git clone https://github.com/idhavaltank/Crown-Jewels-Co.git
cd Crown-Jewels-Co
npm install
# or
yarn install
```

### Environment Variables (`.env.local`)

```
NEXT_PUBLIC_GRAPHQL_API_URL=https://your-graphql-api-endpoint/graphql
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build & Start

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🧭 How to Use

- Register or login through `/login`.
- Browse products at `/product`.
- View product details and select variants at `/product/[id]`.
- Add products to your cart; manage quantities and items in `/cart`.
- Securely checkout with shipping and payment forms at `/checkout`.
- Receive clear, accessible feedback through toasts and inline messages at every step.

## 📈 Future Enhancements & Roadmap

- Real-time cross-tab sync for auth and cart via localStorage events
- Pagination, infinite scrolling, and advanced filters on product listing
- Optimistic UI updates on cart and orders for enhanced responsiveness
- Advanced checkout validation (input masks, async address verification)
- End-to-end automated testing with Cypress or Playwright
- Server-driven dynamic SEO metadata for all product and category pages

Thank you for visiting **Crown Jewels Co.!**  
This project represents a mature, thoughtfully designed foundation ready for production-grade e-commerce applications. Your feedback and contributions are warmly welcome.

_— Developed and maintained by an experienced team committed to engineering excellence and outstanding user experience_

Feel free to customize or request enhancements tailored to your specific audience or preferences!
