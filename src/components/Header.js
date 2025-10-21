import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import CartModal from './CartModal';

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.name === item.name && cartItem.size === item.size
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, change) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const item = newCart[index];
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        return newCart.filter((_, i) => i !== index);
      } else {
        item.quantity = newQuantity;
        return newCart;
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

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
