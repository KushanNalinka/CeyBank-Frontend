import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [statusTab, setStatusTab] = useState(false);

  const addToCart = (productId, quantity) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { productId, quantity }];
      }
    });
  };

  const changeQuantity = (productId, quantity) => {
    setItems(prev =>
      quantity > 0
        ? prev.map(item => item.productId === productId ? { ...item, quantity } : item)
        : prev.filter(item => item.productId !== productId)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, changeQuantity, clearCart, statusTab, setStatusTab }}>
      {children}
    </CartContext.Provider>
  );
};
