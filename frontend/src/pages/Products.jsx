import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { addToCart, cart } = useCart();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [qty, setQty] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Lấy sản phẩm từ API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://pharmacity.onrender.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
      // Dữ liệu mặc định nếu API chưa sẵn
      setProducts([
        { id: 1, name: "Paracetamol 500mg", price: 25000, description: "Giảm đau, hạ sốt", image: 'paracetamol.jpg' },
        { id: 2, name: "Amoxicillin 500mg", price: 45000, description: "Kháng sinh", image: 'amoxicillin.jpg' },
        { id: 3, name: "Vitamin C 1000mg", price: 120000, description: "Bổ sung vitamin", image: 'vitamin-c.jpg' },
      ]);
    }
  };
  const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Thêm sản phẩm mới
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Vui lòng nhập tên và giá!");
      return;
    }

    if (!user || user.role !== "admin") {
      alert("Chỉ admin mới có thể thêm sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseInt(newProduct.price),
          description: newProduct.description || "",
          image: newProduct.image || "",
          userId: user.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Thêm sản phẩm thành công!");
        setNewProduct({ name: "", price: "", description: "", image: "" });
        setShowForm(false);
        fetchProducts(); // Refresh danh sách
      } else {
        alert(data.message || "Thêm sản phẩm thất bại!");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      alert("Lỗi khi thêm sản phẩm!");
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

  return (
    <div style={styles.page}>
      <h1 style={styles.title}> Cửa Hàng Thuốc</h1>
    <div style={styles.searchContainer}>
  <input
    type="text"
    placeholder="🔍 Tìm kiếm thuốc..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={styles.searchInput}
  />
</div>
      {/* FORM THÊM SẢN PHẨM - CHỈ ADMIN */}
      {user && user.role === "admin" && (
        <>
          <button
            style={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "❌ Đóng" : "➕ Thêm Sản Phẩm"}
          </button>

          {showForm && (
            <div style={styles.formBox}>
              <h3>Thêm Sản Phẩm Mới</h3>
              <form onSubmit={handleAddProduct}>
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  style={styles.input}
                />
                
                <input
                  type="number"
                  placeholder="Giá (VNĐ)"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="URL ảnh (link)"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  style={styles.input}
                />
                <button
                  type="submit"
                  style={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Thêm"}
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {/* DANH SÁCH SẢN PHẨM */}
     <div style={styles.grid}>
  {filteredProducts.length === 0 ? (
    <div style={styles.noResult}>
      ❌ Không tìm thấy sản phẩm
    </div>
  ) : (
    filteredProducts.map((p) => (
          <div key={p.id} style={styles.card}>
            {/* ẢNH SẢN PHẨM */}
           <div style={styles.imageContainer}>
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                style={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/no-image.jpg";
                }}
              />
            ) : (
              <div style={styles.noImage}>
                Không có ảnh
              </div>
            )}
          </div>
            <h3>{p.name}</h3>
            <p style={styles.price}>
              {Number(p.price).toLocaleString("vi-VN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                 })} VNĐ
            </p>
            <p style={{ fontSize: 12, color: "#666" }}>
              {p.description}
            </p>

            {/* QUANTITY */}
            <div style={styles.qtyBox}>
              <button onClick={() => decrease(p.id)}>-</button>

              <input
              type="text"
              value={qty[p.id] || 1}
              style={styles.qtyInput}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setQty((prev) => ({
                  ...prev,
                  [p.id]: value === "" ? 1 : Number(value),
                }));
              }}
            />

              <button onClick={() => increase(p.id)}>+</button>
            </div>
            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                onClick={() => handleAdd(p)}
                style={styles.btn}
              >
                🛒 Thêm
              </button>

              <button
                onClick={() => toggleFav(p.id)}
                style={{
                  ...styles.btn,
                  background: favorites.includes(p.id)
                    ? "#ff4d4d"
                    : "#ccc",
                }}
              >
                ❤️
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

/* STYLE */
const styles = {
  page: {
    backgroundColor: "#b5ebff",
    minHeight: "100vh",
    padding: 30,
  },

  title: {
    textAlign: "center",
    color: "#0099cc",
    fontSize: 32,
    marginBottom: 10,
  },

  user: {
    textAlign: "center",
    color: "#0077aa",
    marginBottom: 20,
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
  maxWidth: "250px",
  margin: "0 auto",
  },
  
 imageContainer: {
  width: "170px",
  height: "170px",
  margin: "0 auto 15px",
  background: "#fafafa",
  borderRadius: "12px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

image: {
  maxWidth: "90%",
  maxHeight: "90%",
  objectFit: "contain",
},
  
  price: {
    color: "#0099cc",
    fontWeight: "bold",
  },

  qtyBox: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  marginTop: 10,
},
qtyInput: {
  width: "60px",
  textAlign: "center",
  border: "1px solid #ccc",
  borderRadius: 6,
  padding: "5px",
  fontSize: 14,
},
noResult: {
  gridColumn: "1 / -1",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ff4d4f",
  padding: "40px",
},
qtyBtn: {
  width: "30px",
  height: "30px",
  border: "none",
  borderRadius: "50%",
  background: "#0099cc",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
},

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  btn: {
    flex: 1,
    padding: 8,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    background: "#0099cc",
    color: "white",
    fontWeight: "bold",
  },

  addBtn: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },

  formBox: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    maxWidth: 400,
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: 14,
    boxSizing: "border-box",
  },
  searchContainer: {
  display: "flex",
  justifyContent: "center",
  marginBottom: 25,
},

searchInput: {
  width: "400px",
  maxWidth: "90%",
  padding: "12px",
  border: "2px solid #0099cc",
  borderRadius: "30px",
  fontSize: "16px",
  outline: "none",
},
  submitBtn: {
    width: "100%",
    padding: 10,
    background: "#0099cc",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
};