import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderName: '',
    orderPhone: '',
    orderEmail: '',
    orderType: '',
    orderSize: '',
    orderQuantity: 1,
    orderMilk: 'regular',
    orderSugar: 'normal',
    orderNotes: '',
    pickupTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.orderName || !formData.orderPhone || !formData.orderEmail || 
        !formData.orderType || !formData.orderSize || !formData.pickupTime) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(formData.orderEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      // Save to database
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          orderDate: new Date().toISOString(),
          status: 'pending'
        }),
      });

      if (response.ok) {
        alert('Order placed successfully! We\'ll prepare it for pickup.');
        setFormData({
          orderName: '',
          orderPhone: '',
          orderEmail: '',
          orderType: '',
          orderSize: '',
          orderQuantity: 1,
          orderMilk: 'regular',
          orderSugar: 'normal',
          orderNotes: '',
          pickupTime: ''
        });
        navigate('/');
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section className="order-form-section" style={{
      padding: '4rem 2rem', 
      background: 'linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 style={{
            color: '#8b5a3c', 
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.8rem',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(139, 90, 60, 0.1)'
          }}>
            Quick Order Form
          </h2>
          <p style={{
            color: '#5a5a5a',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Place your coffee order and we'll have it ready for pickup. 
            All fields marked with * are required.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg" style={{
              borderRadius: '20px',
              border: '1px solid rgba(230, 177, 122, 0.1)',
              overflow: 'hidden'
            }}>
              <div className="card-body p-5" style={{background: 'white'}}>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-name" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-user me-2"></i>Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="order-name"
                        name="orderName"
                        value={formData.orderName}
                        onChange={handleChange}
                        required
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-phone" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-phone me-2"></i>Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="order-phone"
                        name="orderPhone"
                        value={formData.orderPhone}
                        onChange={handleChange}
                        required
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-email" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-envelope me-2"></i>Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="order-email"
                        name="orderEmail"
                        value={formData.orderEmail}
                        onChange={handleChange}
                        required
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-type" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-coffee me-2"></i>Coffee Type *
                      </label>
                      <select
                        className="form-select"
                        id="order-type"
                        name="orderType"
                        value={formData.orderType}
                        onChange={handleChange}
                        required
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Select coffee</option>
                        <option value="espresso">☕ Espresso</option>
                        <option value="americano">🇺🇸 Americano</option>
                        <option value="latte">🥛 Latte</option>
                        <option value="cappuccino">☁️ Cappuccino</option>
                        <option value="flat-white">🤍 Flat White</option>
                        <option value="mocha">🍫 Mocha</option>
                        <option value="macchiato">🎯 Macchiato</option>
                        <option value="cold-brew">❄️ Cold Brew</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-size" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-expand-arrows-alt me-2"></i>Size *
                      </label>
                      <select
                        className="form-select"
                        id="order-size"
                        name="orderSize"
                        value={formData.orderSize}
                        onChange={handleChange}
                        required
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Select size</option>
                        <option value="small">🔸 Small (8oz)</option>
                        <option value="medium">🔹 Medium (12oz)</option>
                        <option value="large">🔶 Large (16oz)</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-quantity" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-hashtag me-2"></i>Quantity *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="order-quantity"
                        name="orderQuantity"
                        min="1"
                        max="10"
                        value={formData.orderQuantity}
                        onChange={handleChange}
                        required
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-milk" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-tint me-2"></i>Milk Preference
                      </label>
                      <select
                        className="form-select"
                        id="order-milk"
                        name="orderMilk"
                        value={formData.orderMilk}
                        onChange={handleChange}
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="regular">🥛 Regular Milk</option>
                        <option value="skim">💧 Skim Milk</option>
                        <option value="almond">🌰 Almond Milk</option>
                        <option value="oat">🌾 Oat Milk</option>
                        <option value="soy">🫘 Soy Milk</option>
                        <option value="none">❌ No Milk</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <label htmlFor="order-sugar" className="form-label" style={{
                        color: '#8b5a3c',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <i className="fas fa-cube me-2"></i>Sugar Level
                      </label>
                      <select
                        className="form-select"
                        id="order-sugar"
                        name="orderSugar"
                        value={formData.orderSugar}
                        onChange={handleChange}
                        style={{
                          border: '2px solid rgba(230, 177, 122, 0.2)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          background: '#faf8f5'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e6b17a';
                          e.target.style.background = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                          e.target.style.background = '#faf8f5';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="none">🚫 No Sugar</option>
                        <option value="less">🍯 Less Sugar</option>
                        <option value="normal">🍬 Normal</option>
                        <option value="extra">🍭 Extra Sugar</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="order-notes" className="form-label" style={{
                      color: '#8b5a3c',
                      fontWeight: '600',
                      fontSize: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <i className="fas fa-sticky-note me-2"></i>Special Instructions
                    </label>
                    <textarea
                      className="form-control"
                      id="order-notes"
                      name="orderNotes"
                      rows="3"
                      value={formData.orderNotes}
                      onChange={handleChange}
                      placeholder="Any special requests, allergies, or preferences..."
                      style={{
                        border: '2px solid rgba(230, 177, 122, 0.2)',
                        borderRadius: '10px',
                        padding: '0.8rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#faf8f5',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#e6b17a';
                        e.target.style.background = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                        e.target.style.background = '#faf8f5';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="pickup-time" className="form-label" style={{
                      color: '#8b5a3c',
                      fontWeight: '600',
                      fontSize: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <i className="fas fa-clock me-2"></i>Preferred Pickup Time *
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="pickup-time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      required
                      style={{
                        border: '2px solid rgba(230, 177, 122, 0.2)',
                        borderRadius: '10px',
                        padding: '0.8rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#faf8f5'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#e6b17a';
                        e.target.style.background = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(230, 177, 122, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(230, 177, 122, 0.2)';
                        e.target.style.background = '#faf8f5';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="btn btn-lg px-5"
                      style={{
                        background: 'linear-gradient(135deg, #e6b17a 0%, #d4a06a 100%)',
                        color: '#2d2d2d',
                        border: 'none',
                        borderRadius: '25px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        padding: '1rem 3rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(230, 177, 122, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #d4a06a 0%, #c0915a 100%)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(230, 177, 122, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #e6b17a 0%, #d4a06a 100%)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(230, 177, 122, 0.3)';
                      }}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
