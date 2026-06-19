import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function AppContent() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>PharmaShop</h2>

        <div style={styles.menu}>
          <Link style={styles.link} to="/home">
            Trang chủ
          </Link>

          <Link style={styles.link} to="/">
            Sản phẩm
          </Link>

          <Link style={styles.link} to="/cart">
            Giỏ hàng ({cartCount})
          </Link>

          <Link style={styles.link} to="/checkout">
            Thanh toán
          </Link>

          {user ? (
            <>
              <span style={{ ...styles.link, cursor: "default" }}>
                👤 {user.email}
              </span>
              <button
                onClick={logout}
                style={{
                  ...styles.link,
                  background: "#ff4d4d",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link style={styles.link} to="/login">
                Login
              </Link>

              <Link style={styles.link} to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ROUTES */}
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

/* STYLE */
const styles = {
  nav: {
    background: "#0099cc",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
  },

  logo: {
    color: "white",
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
  },

  menu: {
    display: "flex",
    gap: "15px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "0.3s",
  },
};