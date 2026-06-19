import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ thêm sản phẩm
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);

      if (exists) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➕ tăng số lượng
  const increase = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  // ➖ giảm số lượng
  const decrease = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, qty: Math.max(1, i.qty - 1) }
          : i
      )
    );
  };

  // Aliases cho Cart.jsx
  const increaseQty = increase;
  const decreaseQty = decrease;

  // 🗑 xoá
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);