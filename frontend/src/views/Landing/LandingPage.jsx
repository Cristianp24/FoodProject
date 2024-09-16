import React from 'react';

const LandingPage = () => {
    return (
      <div 
        style={{ 
          width: '100vw', 
          height: '100vh', 
          margin: 0,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        
        <img 
          src="/public/landing.jpg" 
          alt="Landing Page" 
          style={{ 
            width: '100vw', 
            height: '100vh', 
            objectFit: 'cover', 
            position: 'relative', 
            top: 0, 
            left: 0 
          }} 
        />
   <div className="navbar-links hidden md:flex">
        <a href="/home" className="mr-4">
          Home
        </a>
      </div>
      </div>
    );
  }
  
  export default LandingPage;
  
  