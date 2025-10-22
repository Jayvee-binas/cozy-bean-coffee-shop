import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';

const Header = () => {
  const { 
    cart, 
    showCart, 
    getTotalItems, 
    getTotalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    openCart, 
    closeCart 
  } = useCart();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            The Cozy Bean
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
              <Nav.Link as={Link} to="/order">Order</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Button 
                variant="outline-light" 
                onClick={openCart}
                className="position-relative"
              >
                🛒 Cart
                {getTotalItems() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartModal
        show={showCart}
        onHide={closeCart}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        totalPrice={getTotalPrice()}
      />
    </>
  );
};

export default Header;
