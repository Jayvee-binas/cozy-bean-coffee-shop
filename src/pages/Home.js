import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate('/order');
  };

  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Start Your Day with Coffee</h2>
        <p>Freshly brewed, just for you.</p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
          <button 
            className="btn btn-outline-light btn-lg"
            onClick={handleViewMenu}
          >
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
