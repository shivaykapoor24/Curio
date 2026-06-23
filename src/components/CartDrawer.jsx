import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { cart, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setIsOpen(false);
      setShowAuthModal(true);
      return;
    }
    setCheckedOut(true);
  };

  const handleContinue = () => {
    clearCart();
    setCheckedOut(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Your Cart ({count})</h3>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {checkedOut ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✅</div>
            <h3 className={styles.successTitle}>Order Confirmed!</h3>
            <p className={styles.successText}>
              In a live deployment, Stripe processes your{" "}
              <strong style={{ color: "#F5A623" }}>${total.toFixed(2)}</strong>{" "}
              payment securely. Order confirmed for{" "}
              <strong style={{ color: "#F8F6F1" }}>{user?.email}</strong>.
            </p>
            <button className={styles.primaryBtn} onClick={handleContinue}>
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛒</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImage}>{item.image}</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>${item.price}</p>
                    <div className={styles.qtyRow}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className={styles.qty}>{item.qty}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className={styles.lineTotal}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Shipping</span>
                <span className={styles.free}>Free</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span className={styles.totalAmount}>${total.toFixed(2)}</span>
              </div>
              <button className={styles.primaryBtn} onClick={handleCheckout}>
                {user ? "Proceed to Checkout →" : "Sign in to Checkout →"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
