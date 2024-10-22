import React, { useState, useEffect, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Animation from './pages/animation';
import ComponentsPage from './pages/Components';
import Todo from './pages/Todo';
import Products from './pages/Products';
import Carts from './pages/Carts';
import Footer from './pages/Footer';
import Login from './pages/Login'; // นำเข้าไฟล์ Login.jsx
import './App.css';
import { CartProvider, CartContext } from "./context/CartContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // ตรวจสอบสถานะการล็อกอินจาก localStorage
  useEffect(() => {
    const token = localStorage.getItem('loggedIn');
    setLoggedIn(!!token); // แปลงเป็น Boolean
  }, []);

  // ฟังก์ชันการล็อกอิน
  const handleLogin = (user) => {
    localStorage.setItem('loggedIn', user.token);
    setLoggedIn(true);
  };

  // ฟังก์ชันการล็อกเอาต์
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router basename="/">
        <div className="app-container">
          {loggedIn && <TopNavbar onLogout={handleLogout} />} {/* แสดง TopNavbar เฉพาะเมื่อผู้ใช้ล็อกอินแล้ว */}
          <div className="main-layout">
            <div className="content">
            <Routes>
              <Route path="/login" element={!loggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
              <Route exact path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="/calculator" element={loggedIn ? <Calculator /> : <Navigate to="/login" />} />
              <Route path="/components" element={loggedIn ? <ComponentsPage /> : <Navigate to="/login" />} />
              <Route path="/todo" element={loggedIn ? <Todo /> : <Navigate to="/login" />} />
              <Route path="/products" element={loggedIn ? <ProductsPage /> : <Navigate to="/login" />} />
              <Route path="/carts" element={loggedIn ? <Carts /> : <Navigate to="/login" />} />
              <Route path="/animation" element={loggedIn ? <Animation /> : <Navigate to="/login" />} />
            </Routes>

            </div>
          </div>
          {loggedIn && <Footer />} {/* แสดง Footer เฉพาะเมื่อผู้ใช้ล็อกอินแล้ว */}
        </div>
      </Router>
    </CartProvider>
  );
}

const ProductsPage = () => {
  const { addToCart } = useContext(CartContext); // ใช้ addToCart จาก context
  return <Products addToCart={addToCart} />;
};

export default App;