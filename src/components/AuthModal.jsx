import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./AuthModal.module.css";

export default function AuthModal() {
  const { login, showAuthModal, setShowAuthModal, authMode, setAuthMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!showAuthModal) return null;

  const handleSubmit = () => {
    setError("");
    const result = login(email, password, name);
    if (result?.error) setError(result.error);
  };

  const handleSwitch = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
    setError("");
  };

  return (
    <div className={styles.backdrop} onClick={() => setShowAuthModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {authMode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <button className={styles.closeBtn} onClick={() => setShowAuthModal(false)}>
            ✕
          </button>
        </div>

        {authMode === "signup" && (
          <input
            className={styles.input}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.submitBtn} onClick={handleSubmit}>
          {authMode === "login" ? "Sign in" : "Create account"}
        </button>

        <p className={styles.switchText}>
          {authMode === "login" ? "New here? " : "Already have an account? "}
          <button className={styles.switchBtn} onClick={handleSwitch}>
            {authMode === "login" ? "Create account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
