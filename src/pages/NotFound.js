import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h1 className="display-1 text-muted mb-4">404</h1>
              <h2 className="mb-3" style={{color: '#8b5a3c', fontFamily: 'Playfair Display, serif'}}>
                Page Not Found
              </h2>
              <p className="lead mb-4">
                Sorry, the page you're looking for doesn't exist. 
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/" className="btn btn-primary btn-lg">
                  <i className="fas fa-home me-2"></i>
                  Go Home
                </Link>
                <Link to="/menu" className="btn btn-outline-primary btn-lg">
                  <i className="fas fa-coffee me-2"></i>
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
