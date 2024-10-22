
import React from 'react';
import '../Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Phone</h4>
          <p>080-684-2786</p>
        </div>
        <div className="footer-section contact-info">
          <h4>Email</h4>
          <p>jarukit.lob@spumail.net</p>
        </div>
        <div className="footer-section social-media">
          <h4>Follow Me</h4>
          <a href="https://www.instagram.com/jarukit_lths/"><img src="https://img2.pic.in.th/pic/ig20060512644bc49b.png" alt="Instagram" /></a>
          <a href="https://www.facebook.com/Jarukitlths"><img src="https://img5.pic.in.th/file/secure-sv1/fbf0935bb1a9472935.png" alt="Facebook" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 By Jarukit Lobthaisong. CSI-205 Lab Project</p>
      </div>
    </footer>
  );
};

export default Footer;
