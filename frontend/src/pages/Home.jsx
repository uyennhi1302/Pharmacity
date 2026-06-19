import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  // Sản phẩm sale trong tuần (ID: 1, 2, 3)
  const SALE_PRODUCTS = [1, 2, 3];
  const SALE_PERCENT = 20; // 20% giảm

  // Lấy sản phẩm từ API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ tăng số lượng
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // ➖ giảm số lượng
  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  // 🛒 add cart kèm qty
  const handleAdd = (p) => {
    addToCart({ ...p, qty: qty[p.id] || 1 });
    alert(`Đã thêm ${qty[p.id] || 1} ${p.name} vào giỏ hàng!`);
  };

  // ❤️ yêu thích
  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // Tính giá sale
  const getSalePrice = (id, originalPrice) => {
    if (SALE_PRODUCTS.includes(id)) {
      return originalPrice - (originalPrice * SALE_PERCENT) / 100;
    }
    return originalPrice;
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <h2 style={{ textAlign: "center" }}>Đang tải...</h2>
      </div>
    );
  }

  // Sản phẩm sale
  const saleProducts = products.filter((p) =>
    SALE_PRODUCTS.includes(p.id)
  );

  // Sản phẩm không sale
  const regularProducts = products.filter(
    (p) => !SALE_PRODUCTS.includes(p.id)
  );

  return (
    <div style={styles.page}>
      {/* 🎉 SALE SECTION */}
      <div style={styles.saleSection}>
        <h2 style={styles.sectionTitle}>🎉 SALE ĐẶC BIỆT TRONG TUẦN</h2>
        <div style={styles.saleInfo}>
          Giảm {SALE_PERCENT}% cho tất cả sản phẩm sale
        </div>

        <div style={styles.saleGrid}>
          {saleProducts.map((p) => {
            const salePrice = getSalePrice(p.id, p.price);
            const discount = p.price - salePrice;

            return (
              <div key={p.id} style={styles.saleCard}>
                {/* Badge Sale */}
                <div style={styles.saleBadge}>{SALE_PERCENT}% OFF</div>

                {/* ẢNH SẢN PHẨM */}
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={styles.image}
                  />
                )}

                <h3>{p.name}</h3>
                <p style={styles.description}>{p.description}</p>

                {/* Giá */}
                <div style={styles.priceBox}>
                  <span style={styles.originalPrice}>
                    {p.price.toLocaleString()} VNĐ
                  </span>
                  <span style={styles.salePrice}>
                    {salePrice.toLocaleString()} VNĐ
                  </span>
                </div>

                <p style={styles.saveMoney}>
                  Tiết kiệm: {discount.toLocaleString()} VNĐ
                </p>

                {/* QUANTITY */}
                <div style={styles.qtyBox}>
                  <button onClick={() => decrease(p.id)}>-</button>
                  <span>{qty[p.id] || 1}</span>
                  <button onClick={() => increase(p.id)}>+</button>
                </div>

                {/* ACTIONS */}
                <div style={styles.actions}>
                  <button
                    onClick={() => handleAdd(p)}
                    style={styles.addBtn}
                  >
                    🛒 Thêm
                  </button>

                  <button
                    onClick={() => toggleFav(p.id)}
                    style={{
                      ...styles.favBtn,
                      background: favorites.includes(p.id)
                        ? "#ff4d4d"
                        : "#ccc",
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📦 PRODUCTS SECTION */}
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>📦 TẤT CẢ SẢN PHẨM</h2>

        <div style={styles.grid}>
          {regularProducts.map((p) => (
            <div key={p.id} style={styles.card}>
              {/* ẢNH SẢN PHẨM */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  style={styles.image}
                />
              )}

              <h3>{p.name}</h3>
              <p style={styles.description}>{p.description}</p>

              <p style={styles.price}>
                {p.price.toLocaleString()} VNĐ
              </p>

              {/* QUANTITY */}
              <div style={styles.qtyBox}>
                <button onClick={() => decrease(p.id)}>-</button>
                <span>{qty[p.id] || 1}</span>
                <button onClick={() => increase(p.id)}>+</button>
              </div>

              {/* ACTIONS */}
              <div style={styles.actions}>
                <button
                  onClick={() => handleAdd(p)}
                  style={styles.addBtn}
                >
                  🛒 Thêm
                </button>

                <button
                  onClick={() => toggleFav(p.id)}
                  style={{
                    ...styles.favBtn,
                    background: favorites.includes(p.id)
                      ? "#ff4d4d"
                      : "#ccc",
                  }}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLE */
const styles = {
  page: {
    backgroundColor: "#b5ebff",
    minHeight: "100vh",
    padding: 20,
  },

  saleSection: {
    background: "linear-gradient(135deg, #ff6b6b, #ff8c42)",
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    color: "white",
  },

  sectionTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },

  saleInfo: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    opacity: 0.95,
  },

  saleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },

  saleCard: {
    background: "white",
    padding: 15,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    position: "relative",
    transform: "scale(1)",
    transition: "transform 0.3s",
  },

  saleBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "#ff4d4d",
    color: "white",
    padding: "6px 12px",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 12,
  },

  priceBox: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    marginBottom: 8,
  },

  originalPrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: 14,
  },

  salePrice: {
    color: "#ff4d4d",
    fontWeight: "bold",
    fontSize: 18,
  },

  saveMoney: {
    color: "#28a745",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 12,
  },

  productsSection: {
    marginTop: 30,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 20,
  },

  card: {
    background: "white",
    padding: 15,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },

  price: {
    color: "#0099cc",
    fontWeight: "bold",
    marginBottom: 10,
  },

  qtyBox: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  addBtn: {
    flex: 1,
    padding: 8,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    background: "#0099cc",
    color: "white",
    fontWeight: "bold",
  },

  favBtn: {
    flex: 0.5,
    padding: 8,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
};
