import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../animation.css';
import basketball from '../img/basketball.png';
import football from '../img/football.png';
import volleyball from '../img/volleyball.png';
import human from '../img/human.png';
import cartoon from '../img/cartoon.png';
import logo from '../img/logo.png';
import fieldImage from '../img/field.png'; // Importing field background image

const Animation = () => {
  const [ballImage, setBallImage] = useState(null); // Default to no image (none)
  const [ballSize, setBallSize] = useState(100); // Default size set to 100
  const [speed, setSpeed] = useState(5); // Default speed
  const [running, setRunning] = useState(true); // Start with running set to true
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [rotation, setRotation] = useState(0); // Rotation state for the ball

  const toggleRunning = () => {
    setRunning(!running); // Toggle running state
  };

  // Effect to update the ball's position and rotation when running
  useEffect(() => {
    let animationFrameId;
    const updatePosition = () => {
      setPosition((prevPosition) => {
        const newLeft = prevPosition.left + direction.x * (5 * speed / 10);
        const newTop = prevPosition.top + direction.y * (5 * speed / 10);
        const maxLeft = 760 - ballSize;
        const maxTop = 400 - ballSize;

        // Check for collision with left and right edges
        if (newLeft >= maxLeft) {
          setDirection({ x: -1, y: direction.y }); // Bounce back to left
        } else if (newLeft <= 0) {
          setDirection({ x: 1, y: direction.y }); // Bounce back to right
        }

        // Check for collision with top and bottom edges
        if (newTop >= maxTop) {
          setDirection({ x: direction.x, y: -1 }); // Bounce back up
        } else if (newTop <= 0) {
          setDirection({ x: direction.x, y: 1 }); // Bounce back down
        }

        return {
          left: Math.min(Math.max(newLeft, 0), maxLeft),
          top: Math.min(Math.max(newTop, 0), maxTop),
        };
      });

      setRotation((prevRotation) => prevRotation + 1); // Slow rotation increment for animation

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    if (running) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [running, speed, ballSize, direction]);

  return (
    <div className="Head">
      <header className="header">
        <h1>Animation</h1>
      </header>
    <div id="container">
      <div id="field" style={{ width: 760, height: 400, backgroundImage: `url(${fieldImage})`, backgroundSize: 'cover' }}>
        {ballImage ? (
          <img
            src={ballImage}
            alt="Ball"
            className={`ball ${running ? 'running' : ''}`}
            style={{
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              position: 'absolute',
              left: position.left,
              top: position.top,
              borderRadius: '50%', // Circular shape
              backgroundColor: 'white', // White background for the ball
              transform: `rotate(${rotation}deg)` // Apply rotation
            }}
          />
        ) : (
          <div
            style={{
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              borderRadius: '50%',
              backgroundColor: 'white',
              position: 'absolute',
              left: position.left,
              top: position.top,
              transform: `rotate(${rotation}deg)` // Apply rotation for the circle
            }}
          ></div>
        )}
      </div>
      <div className="controls mt-3">
      <div className="run-btn">
        <button 
          onClick={toggleRunning} 
          className={`btn ${running ? 'btn-success' : 'btn-danger'} me-2`}
        >
          <i className={`bi bi-${running ? 'pause-fill' : 'play-fill'}`}></i> {running ? 'PAUSE' : 'RUN'}
        </button>
        </div>
        <div className="btn-group" role="group">
          <button onClick={() => { setBallImage(null); setBallSize(100); }} className="btn btn-outline-primary">NONE</button>
          <button onClick={() => setBallImage(basketball)} className="btn btn-outline-primary">BASKETBALL</button>
          <button onClick={() => setBallImage(football)} className="btn btn-outline-primary">FOOTBALL</button>
          <button onClick={() => setBallImage(volleyball)} className="btn btn-outline-primary">VOLLEYBALL</button>
          <button onClick={() => setBallImage(human)} className="btn btn-outline-primary">HUMAN</button>
          <button onClick={() => setBallImage(cartoon)} className="btn btn-outline-primary">CARTOON</button>
          <button onClick={() => setBallImage(logo)} className="btn btn-outline-primary">LOGO</button>
        </div>
        <div className="mt-3">
          <label className="form-label">Ball Size:</label>
          <input 
            type="range" 
            className="form-range" 
            min="10" 
            max="200" 
            value={ballSize} 
            onChange={(e) => setBallSize(e.target.value)} 
          />
        </div>
        <div className="mt-2">
          <label className="form-label">Ball Speed:</label>
          <input 
            type="range" 
            className="form-range" 
            min="1" 
            max="10" 
            value={speed} 
            onChange={(e) => setSpeed(e.target.value)} 
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Animation;
