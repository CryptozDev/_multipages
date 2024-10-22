import React, { useState } from 'react';
import '../Login.css';
import { verifyUser } from '../context/users';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = verifyUser(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <i className="bi bi-person-circle user-icon"></i> {/* ไอคอนผู้ใช้ */}
        <h2>ยินดีต้อนรับ</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;