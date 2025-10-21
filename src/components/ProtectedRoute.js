import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password. Please try again.');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4" style={{color: '#8b5a3c', fontFamily: 'Playfair Display, serif'}}>
                Admin Access
              </h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p className="text-muted text-center mt-3 small">
                Demo password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
