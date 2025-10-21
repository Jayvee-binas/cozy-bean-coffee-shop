import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 mb-4" style={{color: '#8b5a3c', fontFamily: 'Playfair Display, serif'}}>
            About The Cozy Bean
          </h1>
          <p className="lead mb-4">
            Welcome to The Cozy Bean, where every cup tells a story of passion, quality, and community.
          </p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title" style={{color: '#8b5a3c'}}>
                <i className="fas fa-coffee me-2"></i>
                Our Story
              </h3>
              <p className="card-text">
                Founded in 2020, The Cozy Bean began as a small dream to bring exceptional coffee 
                to our community. We source the finest beans from sustainable farms around the world, 
                ensuring every cup meets our high standards of quality and taste.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title" style={{color: '#8b5a3c'}}>
                <i className="fas fa-heart me-2"></i>
                Our Mission
              </h3>
              <p className="card-text">
                We believe coffee is more than just a beverage—it's a moment of comfort, 
                a catalyst for conversation, and a daily ritual that brings people together. 
                Our mission is to create that perfect moment for every customer.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-lg-4 mb-4">
          <div className="text-center">
            <div className="mb-3">
              <i className="fas fa-leaf fa-3x" style={{color: '#e6b17a'}}></i>
            </div>
            <h4 style={{color: '#8b5a3c'}}>Sustainable Sourcing</h4>
            <p>We partner with ethical coffee farms that prioritize environmental sustainability and fair trade practices.</p>
          </div>
        </div>
        
        <div className="col-lg-4 mb-4">
          <div className="text-center">
            <div className="mb-3">
              <i className="fas fa-fire fa-3x" style={{color: '#e6b17a'}}></i>
            </div>
            <h4 style={{color: '#8b5a3c'}}>Fresh Roasting</h4>
            <p>Our beans are roasted in small batches to ensure maximum freshness and flavor in every cup.</p>
          </div>
        </div>
        
        <div className="col-lg-4 mb-4">
          <div className="text-center">
            <div className="mb-3">
              <i className="fas fa-users fa-3x" style={{color: '#e6b17a'}}></i>
            </div>
            <h4 style={{color: '#8b5a3c'}}>Community Focus</h4>
            <p>We're more than a coffee shop—we're a gathering place for friends, families, and neighbors.</p>
          </div>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-lg-10 mx-auto">
          <div className="card bg-light">
            <div className="card-body text-center p-5">
              <h3 className="mb-3" style={{color: '#8b5a3c'}}>Visit Us Today</h3>
              <p className="lead mb-4">
                Experience the warmth of our community and the richness of our coffee. 
                We're open daily from 6 AM to 10 PM.
              </p>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Address:</strong><br />
                  123 Coffee Street<br />
                  Manila, Philippines
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Hours:</strong><br />
                  Monday - Sunday<br />
                  6:00 AM - 10:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
