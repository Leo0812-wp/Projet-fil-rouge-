import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calcul du total HT
  const getTotalHT = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calcul du total TTC avec TVA différenciée
  // TVA 5.5% pour les produits avec SKU commençant par "BEB"
  // TVA 20% pour les autres produits (taux standard en France)
  const getTotalPrice = () => {
    const TVA_REDUITE = 0.055; // 5.5%
    const TVA_STANDARD = 0.20; // 20%

    return cartItems.reduce((total, item) => {
      const itemHT = item.price * item.quantity;
      const sku = item.sku || '';
      const tvaRate = sku.startsWith('BEB') ? TVA_REDUITE : TVA_STANDARD;
      const itemTTC = itemHT * (1 + tvaRate);
      return total + itemTTC;
    }, 0);
  };

  // Calcul du total TVA
  const getTotalTVA = () => {
    return getTotalPrice() - getTotalHT();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalHT,
        getTotalTVA,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

