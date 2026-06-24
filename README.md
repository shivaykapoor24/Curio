# ✦ Curio

A curated e-commerce storefront built with **React + Vite** — featuring user auth, product filtering, a cart drawer, and a Stripe-ready checkout flow.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, CSS Modules |
| Auth | localStorage (swap for JWT/OAuth) |
| Payments | Stripe-ready |
| Hosting | Netlify |

---

## Features

- Product grid with badges & ratings
- Category filter pills + price range slider
- Sort by price / rating / featured + full-text search
- Slide-in cart drawer with quantity controls
- Sign in / create account modal
- localStorage auth (swap for JWT)
- Checkout flow with order confirmation
- Stripe-ready architecture
- Netlify SPA routing via `netlify.toml`
- Responsive grid layout, CSS Modules

---

## Backend Routes (Node.js + MongoDB)

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create user, hash password |
| POST | `/api/auth/login` | Validate credentials, return JWT |
| GET | `/api/products` | List products from MongoDB |
| POST | `/api/orders` | Create order, charge via Stripe |

---

## Environment Variables

| Key | Value |
|---|---|
| `VITE_STRIPE_PUBLIC_KEY` | `pk_live_...` |
| `VITE_API_URL` | `https://your-backend.onrender.com` |
