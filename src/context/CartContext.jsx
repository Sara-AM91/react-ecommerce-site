import React, { createContext, useContext, useState, useEffect } from "react";

//Create a Context for the cart
const CartContext = createContext();

//Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    //Initialize cart state from local storage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    //Update local storage whenever the cart changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Function to add a product to the cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  //Function to remove a product from the cart
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart.quantity === 1) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

//Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
