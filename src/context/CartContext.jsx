import React, { createContext, useState } from 'react';

// สร้าง Context สำหรับ Cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // สร้าง state เพื่อเก็บสินค้าที่อยู่ในตะกร้า
  const [cartItems, setCartItems] = useState([]);

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า โดยตรวจสอบสินค้าที่ซ้ำกัน
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find(item => item.id === product.id);
      if (isItemInCart) {
        // หากสินค้าซ้ำให้เพิ่มจำนวนสินค้า
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // หากไม่ซ้ำให้เพิ่มสินค้าลงในตะกร้าพร้อมกับค่าเริ่มต้น quantity = 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // ฟังก์ชันนำสินค้าทิ้งออกจากตะกร้า โดยใช้ id เพื่อลบสินค้า
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // ฟังก์ชันคำนวณยอดรวมราคาในตะกร้า
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Return ค่า Context.Provider และส่งค่าไปให้ component ลูก
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};