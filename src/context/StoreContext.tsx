// StoreContext.tsx
import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [storeItems, setStoreItems] = useState([]);
  const [storeStatusTab, setStoreStatusTab] = useState(false);

  const addToStore = (productId, quantity) => {
    setStoreItems(prev => {
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

  const updateStoreQuantity = (productId, quantity) => {
    setStoreItems(prev =>
      quantity > 0
        ? prev.map(item => item.productId === productId ? { ...item, quantity } : item)
        : prev.filter(item => item.productId !== productId)
    );
  };

  const clearStore = () => setStoreItems([]);

  return (
    <StoreContext.Provider value={{
      storeItems,
      addToStore,
      updateStoreQuantity,
      clearStore,
      storeStatusTab,
      setStoreStatusTab
    }}>
      {children}
    </StoreContext.Provider>
  );
};
