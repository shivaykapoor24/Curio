# ✦ Curio — E-Commerce Storefront

A curated e-commerce storefront built with **React + Vite**, featuring user authentication, product filtering, a cart drawer, and a Stripe-ready checkout flow.

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | React 18, Vite 5, CSS Modules     |
| Auth        | localStorage (swap for JWT/OAuth) |
| Payments    | Stripe-ready (see below)          |
| Hosting     | Netlify                           |

---

## Project Structure

```
curio/
├── index.html                  # Vite HTML entry
├── vite.config.js              # Vite config
├── netlify.toml                # Netlify build + redirect rules
├── package.json
├── .gitignore
└── src/
    ├── main.jsx                # React DOM mount
    ├── index.css               # Global reset + scrollbar styles
    ├── App.jsx                 # Root layout, shop logic
    ├── App.module.css
    ├── data/
    │   └── products.js         # Product catalogue + categories
    ├── context/
    │   ├── AuthContext.jsx     # User auth state + localStorage
    │   └── CartContext.jsx     # Cart state (add/remove/qty/total)
    └── components/
        ├── Navbar.jsx          # Sticky nav, auth buttons, cart icon
        ├── Navbar.module.css
        ├── ProductCard.jsx     # Product tile with add-to-cart
        ├── ProductCard.module.css
        ├── CartDrawer.jsx      # Slide-in cart, checkout flow
        ├── CartDrawer.module.css
        ├── AuthModal.jsx       # Sign in / Create account modal
        └── AuthModal.module.css
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 3. Build for production

```bash
npm run build
```

Output goes to `dist/`.

---

## Deploy to Netlify

### Option A — Netlify CLI (recommended)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option B — Netlify Dashboard (drag & drop)

1. Run `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page

### Option C — GitHub Auto-Deploy

1. Push this repo to GitHub
2. In Netlify: **Add new site → Import from Git**
3. Set build command: `npm run build`, publish dir: `dist`
4. Every push to `main` auto-deploys

The `netlify.toml` already handles SPA routing (404 → index.html).

---

## Adding Stripe Payments

### 1. Install Stripe

```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

### 2. Set your publishable key

Create `.env.local`:

```
VITE_STRIPE_PUBLIC_KEY=pk_live_your_key_here
```

### 3. Wrap checkout with Stripe Elements

```jsx
// src/main.jsx
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

<Elements stripe={stripePromise}>
  <App />
</Elements>
```

### 4. Add CardElement to CartDrawer checkout step

```jsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripe = useStripe()
const elements = useElements()

const handlePay = async () => {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement(CardElement),
  })
  // Send paymentMethod.id + total to your backend
}
```

---

## Adding a Real Backend (Node.js + MongoDB)

```bash
# In a separate /server directory
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

Key routes to implement:

| Method | Route             | Description              |
|--------|-------------------|--------------------------|
| POST   | /api/auth/signup  | Create user, hash password |
| POST   | /api/auth/login   | Validate, return JWT     |
| GET    | /api/products     | List products from MongoDB |
| POST   | /api/orders       | Create order, charge Stripe |

Deploy the backend on **Render** (free tier) or **Railway**, then set:

```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Environment Variables (Netlify Dashboard)

Go to **Site settings → Environment variables** and add:

| Key                    | Value                    |
|------------------------|--------------------------|
| VITE_STRIPE_PUBLIC_KEY | pk_live_...              |
| VITE_API_URL           | https://your-backend.com |

---

## Features

- ✅ Product grid with emoji images, badges, ratings
- ✅ Category filter pills
- ✅ Price range slider
- ✅ Sort by price / rating / featured
- ✅ Full-text search
- ✅ Slide-in cart drawer
- ✅ Quantity controls, remove item, running total
- ✅ Sign in / Create account modal
- ✅ localStorage-based auth (swap for JWT)
- ✅ Checkout flow with order confirmation
- ✅ Stripe-ready architecture
- ✅ Netlify SPA routing via `netlify.toml`
- ✅ CSS Modules — no global style conflicts
- ✅ Responsive grid layout
