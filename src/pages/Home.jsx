import React from 'react';
import '../Home.css';

function Home() {
  return (
    <div className="home">
      
     <header className="header">
        <h1>HOME</h1>
        <p>Jarukit Lobthaisong</p>
      </header> 
      <section className="about">
        <img src="https://img2.pic.in.th/pic/IMG_3435d66d554b677652ee.jpg" alt="Jarukit" className="profile-image" />
        <h2>About Me</h2>
        <p>Hello! My name is Jarukit and I am a student at SPU , Computer Science and Software Development Innovation.</p>
        <p>I am passionate about continuous self-improvement through new challenges and learning.</p>
      </section>
      
      <section className="resume">
        <h2>Skills & Expertise</h2>
        <div className="skills-grid">
          <div className="skill">
            <img src="https://img2.pic.in.th/pic/htmlb6330e615bee7c46.png" alt="HTML Icon" />
            <p>HTML</p>
          </div>
          <div className="skill">
            <img src="https://img5.pic.in.th/file/secure-sv1/css.png" alt="CSS Icon" />
            <p>CSS</p>
          </div>
          <div className="skill">
            <img src="https://img5.pic.in.th/file/secure-sv1/js1a843f5bdc153c5b.png" alt="JavaScript Icon" />
            <p>JavaScript</p>
          </div>
          <div className="skill">
            <img src="https://img5.pic.in.th/file/secure-sv1/lua.png" alt="Lua Icon" />
            <p>Lua</p>
          </div>
          <div className="skill">
            <img src="https://img5.pic.in.th/file/secure-sv1/react1aefc09e9ffa9299.png" alt="React Icon" />
            <p>React</p>
          </div>
        </div>
      </section>

      <section className="languages">
        <h2>Languages</h2>
        <div className="languages-grid">
          <div className="language">
            <p>• Thai</p>
          </div>
          <div className="language">
            <p>• English</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;