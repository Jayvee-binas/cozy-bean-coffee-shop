import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CartModal = ({ 
  show, 
  onHide, 
  cart, 
  onRemove, 
  onUpdateQuantity, 
  onClearCart, 
  totalPrice 
}) => {
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const orderSummary = cart.map(item => {
      const sizeText = item.size ? ` (${item.size.charAt(0).toUpperCase() + item.size.slice(1)})` : '';
      return `${item.name}${sizeText} x${item.quantity} - ₱${item.price * item.quantity}`;
    }).join('\n');
    
    alert(`Order Summary:\n\n${orderSummary}\n\nTotal: ₱${totalPrice}\n\nThank you for your order! We'll prepare it right away.`);
    
    onClearCart();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty</p>
        ) : (
          cart.map((item, index) => {
            const sizeText = item.size ? ` (${item.size.charAt(0).toUpperCase() + item.size.slice(1)})` : '';
            return (
              <div key={index} className="d-flex align-items-center border-bottom pb-3 mb-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{width: '60px', height: '60px', objectFit: 'cover'}} 
                  className="rounded me-3"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.name}{sizeText}</h6>
                  <p className="mb-1 text-muted">₱{item.price}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => onUpdateQuantity(index, -1)}
                    disabled={item.quantity === 0}
                  >
                    -
                  </Button>
                  <span className={`mx-2 ${item.quantity === 0 ? 'text-muted' : ''}`}>
                    {item.quantity}
                  </span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => onUpdateQuantity(index, 1)}
                  >
                    +
                  </Button>
                </div>
                <div className="text-end">
                  <p className={`mb-1 fw-bold ${item.quantity === 0 ? 'text-muted' : ''}`}>
                    ₱{item.price * item.quantity}
                  </p>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => onRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })
        )}
        {cart.length > 0 && (
          <div className="text-end mt-3">
            <h5>Total: ₱{totalPrice}</h5>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Continue Shopping
        </Button>
        {cart.length > 0 && (
          <>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
            <Button variant="danger" onClick={onClearCart}>
              Clear Cart
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
