import React, { useState } from 'react';

const Menu = () => {
  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Strong and bold',
      image: 'espresso2.jpg',
      prices: { small: 120, medium: 140, large: 160 }
    },
    {
      id: 2,
      name: 'Latte',
      description: 'Smooth and creamy',
      image: 'latte4.jpg',
      prices: { small: 150, medium: 170, large: 190 }
    },
    {
      id: 3,
      name: 'Cappuccino',
      description: 'Perfect foam blend',
      image: 'cappuccino.jpg',
      prices: { small: 130, medium: 150, large: 170 }
    },
    {
      id: 4,
      name: 'Americano',
      description: 'Espresso diluted with hot water',
      image: 'americano.jpg',
      prices: { small: 120, medium: 140, large: 160 }
    },
    {
      id: 5,
      name: 'Mocha',
      description: 'Chocolate-flavored coffee',
      image: 'mocha.jpg',
      prices: { small: 100, medium: 120, large: 140 }
    },
    {
      id: 6,
      name: 'Macchiato',
      description: 'Espresso with a dollop of milk',
      image: 'macchiato.jpg',
      prices: { small: 135, medium: 155, large: 175 }
    },
    {
      id: 7,
      name: 'Cold Brew',
      description: 'Slow-steeped cold coffee',
      image: 'coldbrew3.jpg',
      prices: { small: 100, medium: 120, large: 140 }
    },
    {
      id: 8,
      name: 'Flat White',
      description: 'Velvety espresso-milk mix',
      image: 'flat white.jpg',
      prices: { small: 120, medium: 140, large: 160 }
    }
  ];

  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const addToCart = (item) => {
    const selectedSize = selectedSizes[item.id] || 'small';
    const price = item.prices[selectedSize];
    
    const cartItem = {
      name: item.name,
      size: selectedSize,
      price: price,
      image: item.image,
      quantity: 1
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.name === item.name && cartItem.size === selectedSize
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name && cartItem.size === selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, cartItem];
      }
    });

    // Show notification
    alert(`${item.name} (${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}) added to cart!`);
  };

  return (
    <section className="menu">
      <h2>Our Coffee Menu</h2>
      <div className="menu-items">
        {menuItems.map(item => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.name} />
            <div className="item-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="size-options">
                {Object.entries(item.prices).map(([size, price]) => (
                  <label key={size} className="size-option">
                    <input
                      type="radio"
                      name={`${item.name.toLowerCase().replace(' ', '-')}-size`}
                      value={size}
                      checked={selectedSizes[item.id] === size}
                      onChange={() => handleSizeChange(item.id, size)}
                    />
                    <span className="size-label">
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </span>
                    <span className="size-price">₱{price}</span>
                  </label>
                ))}
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(item)}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
