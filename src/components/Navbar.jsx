import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout, setShowAuthModal, setAuthMode } = useAuth();
  const { count, setIsOpen } = useCart();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoStar}>✦</span>
          <span className={styles.logoText}>Curio</span>
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.greeting}>
                Hi, <strong>{user.name}</strong>
              </span>
              <button className={styles.outlineBtn} onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.outlineBtn}
                onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
              >
                Sign in
              </button>
              <button
                className={styles.solidBtn}
                onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}
              >
                Join
              </button>
            </>
          )}

          <button className={styles.cartBtn} onClick={() => setIsOpen(true)}>
            🛒 Cart
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
