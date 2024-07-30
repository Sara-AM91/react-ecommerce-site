// src/utils/cartUtils.js
import { useState, useEffect } from "react";

export const useCart = () => {
  // Initialize cart state from local storage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Loaded cart from localStorage:", savedCart); // Debugging line
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update local storage whenever the cart changes
  useEffect(() => {
    console.log("Updating localStorage with cart:", cart); // Debugging line
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      console.log("Current cart state:", prevCart); // Debugging line
      const itemInCart = prevCart.find((item) => item.id === product.id);
      console.log("item", itemInCart);
      if (itemInCart) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log("Inside if, Cart after adding:", updatedCart); // Debugging line
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity }];
        console.log("Cart after adding:", updatedCart); // Debugging line
        return updatedCart;
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart.quantity === 1) {
        const updatedCart = prevCart.filter((item) => item.id !== product.id);
        console.log("Cart after removing:", updatedCart); // Debugging line
        return updatedCart;
      } else {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        console.log("Cart after removing:", updatedCart); // Debugging line
        return updatedCart;
      }
    });
  };

  return { cart, addToCart, removeFromCart };
};
