// CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import cartApi from '../utils/cartApi';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Assume you get userId from somewhere

  // Fetch cart items from server when user ID changes
  useEffect(() => {
    if (userId) {
      cartApi.getUserCartItems(userId)
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch cart items', error);
        });
    }
  }, [userId]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => [...prevItems, item]);

    if (userId) {
      cartApi.addToCart(userId, item)
        .catch(error => {
          console.error('Failed to add item to cart', error);
        });
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));

    if (userId) {
      cartApi.deleteCartItem(userId, id)
        .catch(error => {
          console.error('Failed to remove item from cart', error);
        });
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
