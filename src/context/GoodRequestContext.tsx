// ✅ GoodRequestContext.tsx
import React, { createContext, useContext, useState } from 'react';

const GoodRequestContext = createContext();

export const useGoodRequest = () => useContext(GoodRequestContext);

export const GoodRequestProvider = ({ children }) => {
  const [requestItems, setRequestItems] = useState([]);
  const [showRequestTab, setShowRequestTab] = useState(false);

  const addRequestItem = (productId, quantity) => {
    setRequestItems(prev => {
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

  const updateRequestQuantity = (productId, quantity) => {
    setRequestItems(prev =>
      quantity > 0
        ? prev.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        : prev.filter(item => item.productId !== productId)
    );
  };

  const clearRequests = () => setRequestItems([]);

  return (
    <GoodRequestContext.Provider
      value={{
        requestItems,
        addRequestItem,
        updateRequestQuantity,
        clearRequests,
        showRequestTab,
        setShowRequestTab,
      }}
    >
      {children}
    </GoodRequestContext.Provider>
  );
};
