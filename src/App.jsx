import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import CartDrawer from "./components/CartDrawer";
import ProductCard from "./components/ProductCard";
import { PRODUCTS, CATEGORIES } from "./data/products";
import styles from "./App.module.css";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState(500);

  let filtered = PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchPrice = p.price <= priceRange;
    return matchSearch && matchCat && matchPrice;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Curated Essentials</p>
        <h1 className={styles.heroHeading}>
          Objects Worth<br />Owning
        </h1>
        <p className={styles.heroSubtext}>
          Thoughtfully sourced goods. No noise — just the things that earn a place in your life.
        </p>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.catPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.catPill} ${category === cat ? styles.catPillActive : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.sortControls}>
          <div className={styles.priceControl}>
            <span className={styles.priceLabel}>Max ${priceRange}</span>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className={styles.priceSlider}
            />
          </div>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className={styles.main}>
        <p className={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {category !== "All" ? ` in ${category}` : ""}
          {search ? ` matching "${search}"` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p className={styles.emptyTitle}>No products found</p>
            <p className={styles.emptyHint}>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerLogo}>✦ Curio</p>
        <p className={styles.footerText}>
          © 2026 · Built with React + Vite · Payments via Stripe · Deployed on Netlify
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className={styles.app}>
          <Navbar />
          <AuthModal />
          <CartDrawer />
          <Shop />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
