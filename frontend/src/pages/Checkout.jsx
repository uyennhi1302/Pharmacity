import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const total = cart.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePay = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    alert(
      `Thanh toán thành công!\n
👤 Người nhận: ${form.name}
📞 SĐT: ${form.phone}
📍 Địa chỉ: ${form.address}
💳 Thanh toán: ${
        form.payment === "cash"
          ? "Tiền mặt (COD)"
          : "Ví điện tử"
      }
💰 Tổng: ${total.toLocaleString()} VNĐ`
    );

    clearCart();
    navigate("/");
  };

  const handleBack = () => {
    navigate("/cart");
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h1 style={styles.title}> Thanh Toán</h1>
          <button style={styles.backBtn} onClick={handleBack}>
            ← Thoát
          </button>
        </div>

        {/* CART */}
        <div style={styles.cartBox}>
          {cart.map((i) => (
            <div key={i.id} style={styles.item}>
              <span>
                {i.name} x {i.qty}
              </span>
              <b>
                {(i.price * i.qty).toLocaleString()} VNĐ
              </b>
            </div>
          ))}

          <h3 style={{ color: "#0099cc" }}>
            Tổng: {total.toLocaleString()} VNĐ
          </h3>
        </div>

        {/* FORM */}
        <input
          name="name"
          placeholder="Tên người nhận"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="address"
          placeholder="Địa chỉ nhận hàng"
          value={form.address}
          onChange={handleChange}
          style={styles.input}
        />

        {/* PAYMENT */}
        <div style={styles.paymentBox}>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={form.payment === "cash"}
              onChange={handleChange}
            />
            💵 Tiền mặt (COD)
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="wallet"
              checked={form.payment === "wallet"}
              onChange={handleChange}
            />
            📱 Ví điện tử
          </label>
        </div>

        <button onClick={handlePay} style={styles.btn}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}

/* STYLE - MÀU CHỦ ĐẠO XANH */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#b5ebff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  box: {
    width: 450,
    background: "white",
    padding: 25,
    borderRadius: 15,
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    color: "#0099cc",
  },
  cartBox: {
    background: "#f0fbff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  paymentBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
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
};