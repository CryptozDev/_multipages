import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../Carts.css';

const Carts = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useContext(CartContext);

  // ฟังก์ชันรวมจำนวนสินค้าทั้งหมดในตะกร้า
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="Head">
      <header className="header">
        <h1>Carts</h1>
      </header>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>No items in carts</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.price} $</p>
                <p>Quantity: {item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
            {/* แสดงจำนวนสินค้าทั้งหมด */}
            <div className="cart-summary">
              <h3>Total Items: {totalQuantity}</h3>
              {/* แสดงยอดรวมของราคาทั้งหมด */}
              <h3>Total Price: {getTotalPrice()} $</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carts;