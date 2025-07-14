import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const OutputPage = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(true);

  // Show logout button only when scrollY is 0 (at the top)
  const handleScroll = () => {
    if (window.scrollY === 0) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Scroll page to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Delay logout navigation to allow scroll up
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/');
    }, 500); // 500ms delay to finish scroll animation
  };

  return (
    <>
      {showLogout && (
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <div className="app">
        <h1 className="heading">CryptoTrack</h1>
        {/* Your coin details and other content here */}
        <div style={{ height: '1500px' }}>
          {/* Just a big container to allow scrolling */}
        </div>
      </div>
    </>
  );
};

export default OutputPage;
