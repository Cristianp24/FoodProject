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
                    position: 'absolute', 
                    top: 0, 
                    left: 0 
                }} 
            />
            <div 
                style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '20px', 
                    background: 'rgba(0, 0, 0, 0.5)', 
                    padding: '10px', 
                    borderRadius: '5px'
                }}
            >
                <a 
                    href="/home" 
                    style={{ 
                        color: '#fff', 
                        textDecoration: 'none', 
                        fontSize: '18px' 
                    }}
                >
                    Home
                </a>
            </div>
        </div>
    );
};

export default LandingPage;
