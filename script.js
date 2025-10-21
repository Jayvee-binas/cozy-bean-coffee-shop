function learnMore() {
  alert("We brew with love and passion! Visit our cafe or order online.");
}

// Function to create a dynamic Bootstrap button
function createDynamicButton(text, type = 'primary', size = 'md', onClick = null) {
  const button = document.createElement('button');
  button.className = `btn btn-${type} btn-${size}`;
  button.textContent = text;
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}

// Function to add a button to the container
function addButtonToContainer(buttonText, buttonType = 'success', buttonSize = 'md') {
  const container = document.getElementById('dynamicButtonContainer');
  if (container) {
    const newButton = createDynamicButton(buttonText, buttonType, buttonSize, () => {
      alert(`You clicked: ${buttonText}`);
    });
    container.appendChild(newButton);
  }
}

// Function to create multiple buttons
function createMultipleButtons() {
  const buttonData = [
    { text: 'Order Now', type: 'success', size: 'lg' },
    { text: 'View Menu', type: 'info', size: 'md' },
    { text: 'Book Table', type: 'warning', size: 'md' },
    { text: 'Get Coupon', type: 'danger', size: 'sm' }
  ];
  
  buttonData.forEach(btn => {
    addButtonToContainer(btn.text, btn.type, btn.size);
  });
}

// Auto-create buttons when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Create a sample button
  addButtonToContainer('Special Offer!', 'warning', 'lg');
  
  // Add a button that creates more buttons
  const createMoreButton = createDynamicButton('Create More Buttons', 'secondary', 'md', createMultipleButtons);
  const container = document.getElementById('dynamicButtonContainer');
  if (container) {
    container.appendChild(createMoreButton);
  }
});

// Cart functionality
let cart = [];
let cartTotal = 0;

// Price mapping for different sizes
const priceMap = {
  'espresso-size': { small: 120, medium: 140, large: 160 },
  'latte-size': { small: 150, medium: 170, large: 190 },
  'cappuccino-size': { small: 130, medium: 150, large: 170 },
  'americano-size': { small: 120, medium: 140, large: 160 },
  'mocha-size': { small: 100, medium: 120, large: 140 },
  'macchiato-size': { small: 135, medium: 155, large: 175 },
  'coldbrew-size': { small: 100, medium: 120, large: 140 },
  'flatwhite-size': { small: 120, medium: 140, large: 160 }
};

function addToCartWithSize(name, image, sizeGroupName) {
  const selectedSize = document.querySelector(`input[name="${sizeGroupName}"]:checked`);
  if (!selectedSize) {
    showNotification('Please select a size', 'error');
    return;
  }
  
  const size = selectedSize.value;
  const price = priceMap[sizeGroupName][size];
  
  // Check if item with same name and size already exists in cart
  const existingItem = cart.find(item => item.name === name && item.size === size);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      size: size,
      price: price,
      image: image,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  showAddToCartNotification(`${name} (${size.charAt(0).toUpperCase() + size.slice(1)})`);
}

function addToCart(name, price, image) {
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  showAddToCartNotification(name);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateQuantity(index, change) {
  const item = cart[index];
  const newQuantity = item.quantity + change;
  
  // Prevent quantity from going below 0
  if (newQuantity >= 0) {
    item.quantity = newQuantity;
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  // Update cart count badge
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity > 0 ? item.quantity : 0), 0);
  cartCount.textContent = totalItems;
  
  // Update cart total
  cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cartTotal').textContent = cartTotal;
  
  // Update cart items display
  const cartItems = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-muted">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => {
      const sizeText = item.size ? ` (${item.size.charAt(0).toUpperCase() + item.size.slice(1)})` : '';
      return `
        <div class="d-flex align-items-center border-bottom pb-3 mb-3">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded me-3">
          <div class="flex-grow-1">
            <h6 class="mb-1">${item.name}${sizeText}</h6>
            <p class="mb-1 text-muted">₱${item.price}</p>
          </div>
          <div class="d-flex align-items-center me-3">
            <button class="btn btn-sm btn-outline-secondary ${item.quantity === 0 ? 'disabled' : ''}" onclick="updateQuantity(${index}, -1)" ${item.quantity === 0 ? 'disabled' : ''}>-</button>
            <span class="mx-2 ${item.quantity === 0 ? 'text-muted' : ''}">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <div class="text-end">
            <p class="mb-1 fw-bold ${item.quantity === 0 ? 'text-muted' : ''}">₱${item.price * item.quantity}</p>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  }
}

function openCart() {
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
  const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  cartModal.hide();
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const orderSummary = cart.map(item => {
    const sizeText = item.size ? ` (${item.size.charAt(0).toUpperCase() + item.size.slice(1)})` : '';
    return `${item.name}${sizeText} x${item.quantity} - ₱${item.price * item.quantity}`;
  }).join('\n');
  
  alert(`Order Summary:\n\n${orderSummary}\n\nTotal: ₱${cartTotal}\n\nThank you for your order! We'll prepare it right away.`);
  
  // Clear cart after checkout
  cart = [];
  updateCartDisplay();
  
  // Close modal
  const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  cartModal.hide();
}

function showAddToCartNotification(itemName) {
  // Create a temporary notification
  const notification = document.createElement('div');
  notification.className = 'position-fixed top-0 end-0 p-3';
  notification.style.zIndex = '9999';
  notification.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header bg-success text-white">
        <strong class="me-auto">Added to Cart!</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${itemName} has been added to your cart.
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Contact Form Functionality
function submitContactForm(event) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission (in real app, this would send to server)
  showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
  
  // Reset form
  event.target.reset();
  
  // Log form data (for development purposes)
  console.log('Contact Form Submission:', {
    name,
    email,
    phone,
    subject,
    message,
    timestamp: new Date().toISOString()
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}
