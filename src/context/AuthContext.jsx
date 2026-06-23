import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const login = useCallback(
    (email, password, name) => {
      if (!email || !password) return { error: "All fields required" };

      const stored = JSON.parse(localStorage.getItem("curio_users") || "[]");

      if (authMode === "signup") {
        if (!name) return { error: "Name is required" };
        if (stored.find((u) => u.email === email))
          return { error: "Email already registered" };
        const newUser = { id: Date.now(), email, name, password };
        localStorage.setItem("curio_users", JSON.stringify([...stored, newUser]));
        setUser(newUser);
      } else {
        const found = stored.find(
          (u) => u.email === email && u.password === password
        );
        if (!found) return { error: "Invalid email or password" };
        setUser(found);
      }

      setShowAuthModal(false);
      return { success: true };
    },
    [authMode]
  );

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, showAuthModal, setShowAuthModal, authMode, setAuthMode }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
