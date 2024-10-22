import React, { useEffect, useState, useContext } from 'react';
import '../Products.css';
import { CartContext } from '../context/CartContext';

const Products = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ฟังก์ชันสำหรับการสุ่มข้อมูล
  const getRandomProducts = (productList, limit) => {
    const shuffled = [...productList].sort(() => 0.5 - Math.random()); // สุ่มรายการสินค้า
    return shuffled.slice(0, limit); // เลือก 50 สินค้า
  };

  useEffect(() => {
    // Fetch ข้อมูลสินค้าจาก API
    fetch('https://dummyjson.com/products?limit=100') // ดึงข้อมูลสินค้า 100 รายการมาเพื่อทำการสุ่ม
      .then(response => response.json())
      .then(data => {
        const randomProducts = getRandomProducts(data.products, 50); // เลือกสินค้า 50 รายการแบบสุ่ม
        setProducts(randomProducts);
        const uniqueCategories = ['all', ...new Set(randomProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        setLoading(false); // หยุดการโหลดเมื่อข้อมูลถูกดึงมาแล้ว
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // ฟังก์ชันตรวจสอบว่าสินค้าอยู่ในตะกร้าหรือไม่
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // ฟังก์ชันกรองสินค้าตามหมวดหมู่ที่เลือก
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return <div>Loading...</div>; // แสดง Loading ระหว่างการดึงข้อมูล
  }

  if (error) {
    return <div>{error}</div>; // แสดงข้อผิดพลาดถ้ามี
  }

  return (
    <div className="Head">
      <header className="header">
        <h1>Product</h1>
      </header>
      {/* Dropdown สำหรับเลือกหมวดหมู่ */}
      <div className="categories-selection">
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)} {/* ทำตัวอักษรแรกของหมวดหมู่เป็นตัวพิมพ์ใหญ่ */}
            </option>
          ))}
        </select>
      </div>
      <div className="products-container">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price} $</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
              disabled={isInCart(product.id)} // ปิดปุ่มถ้าสินค้าอยู่ในตะกร้าแล้ว
            >
              {isInCart(product.id) ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;