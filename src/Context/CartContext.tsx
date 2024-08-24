import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartContextType {
  addToCart: number;
  setAddToCart: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [addToCart, setAddToCart] = useState(0);

  return (
    <CartContext.Provider value={{ addToCart, setAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};
