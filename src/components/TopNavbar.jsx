import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './TopNavbar.css';

const TopNavbar = ({ onLogout }) => {
  const { cartItems } = useContext(CartContext); // ใช้ useContext เพื่อดึงจำนวนสินค้าจาก CartContext
  const [totalProducts, setTotalProducts] = useState(0); // สร้าง state สำหรับจำนวนสินค้าทั้งหมด

  useEffect(() => {
    // Fetch ข้อมูลสินค้าทั้งหมดจาก API เพื่อดึงจำนวนสินค้าทั้งหมด
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setTotalProducts(data.products.length))
      .catch(err => console.error('Error fetching total products:', err));
  }, []);

  return (
    <nav className="top-navbar netflix-navbar">
      <ul className="navbar-links">
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/calculator" activeClassName="active">Calculator</NavLink>
        </li>
        <li>
          <NavLink to="/animation" activeClassName="active">Animation</NavLink>
        </li>
        <li>
          <NavLink to="/components" activeClassName="active">Components</NavLink>
        </li>
        <li>
          <NavLink to="/todo" activeClassName="active">Todo</NavLink>
        </li>
        <li>
          {/* แสดงจำนวนสินค้าทั้งหมดใน Products */}
          <NavLink to="/products" activeClassName="active">Products({totalProducts})</NavLink>
        </li>
        <li>
          {/* แสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
          <NavLink to="/carts" activeClassName="active">Carts({cartItems.length})</NavLink>
        </li>
      </ul>
      <div className="user-section">
        <NavLink exact to="/" activeClassName="active">
          <img
            src="https://img2.pic.in.th/pic/IMG_3435d66d554b677652ee.jpg"
            alt="User Badge"
            className="user-badge"
          />
        </NavLink>
        <button className="logout-button" onClick={onLogout}>
          ออกจากระบบ
        </button>
      </div>
      <div className="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default TopNavbar;