import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();

  const navigate = useNavigate();
  
  const total = cart.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const handleBack = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Giỏ hàng</h1>
        <button style={styles.backBtn} onClick={handleBack}>
          ← Thoát
        </button>
      </div>

      {cart.length === 0 ? (
        <div style={styles.empty}>
          <p>Giỏ hàng trống!</p>
          <button style={styles.continueBtn} onClick={handleBack}>
            ← Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.item}>
              <b>{item.name}</b>

              <div>
                <button onClick={() => decreaseQty(item.id)}> - </button>
                {item.qty}
                <button onClick={() => increaseQty(item.id)}> + </button>
              </div>

              <b>{(item.price * item.qty).toLocaleString()} VNĐ</b>

              <button onClick={() => removeItem(item.id)}>❌</button>
            </div>
          ))}

          <h3 style={{ color: "#0099cc" }}>
            Total: {total.toLocaleString()} VNĐ
          </h3>

          <button
            style={styles.btn}
            onClick={handleCheckout}
          >
            Thanh toán
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  page: { background: "#b5ebff", minHeight: "100vh", padding: 20 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { color: "#0099cc", margin: 0 },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    background: "white",
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#0099cc",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  backBtn: {
    padding: "8px 15px",
    background: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    padding: 30,
    background: "white",
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  continueBtn: {
    padding: "10px 20px",
    background: "#0099cc",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
};