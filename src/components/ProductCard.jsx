import { useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "./ProductCard.module.css";

const BADGE_COLORS = {
  New: "#3B82F6",
  Bestseller: "#8B5CF6",
  Sale: "#EF4444",
};

function StarRating({ rating }) {
  const full = Math.round(rating);
  return (
    <span className={styles.stars}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <span className={styles.emoji}>{product.image}</span>
        {product.badge && (
          <span
            className={styles.badge}
            style={{ background: BADGE_COLORS[product.badge] }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>

        <div className={styles.ratingRow}>
          <StarRating rating={product.rating} />
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
