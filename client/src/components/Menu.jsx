import React, { useState } from 'react'

// Mock menu data - in production, this would come from an API
const MOCK_MENUS = {
  'pizza-palace': [
    { id: 1, name: 'Margherita Pizza', description: 'Classic margherita with fresh mozzarella, tomatoes, and basil', category: 'Pizza', price: 12.99, prepTime: 20, calories: 800, isVegetarian: true, isSpicy: false },
    { id: 2, name: 'Pepperoni Pizza', description: 'Traditional pepperoni pizza with extra cheese', category: 'Pizza', price: 14.99, prepTime: 20, calories: 950, isVegetarian: false, isSpicy: false },
    { id: 3, name: 'Quattro Formaggi', description: 'Four cheese pizza: mozzarella, parmesan, gorgonzola, fontina', category: 'Pizza', price: 15.99, prepTime: 22, calories: 920, isVegetarian: true, isSpicy: false },
    { id: 4, name: 'Hawaiian Pizza', description: 'Ham and pineapple with mozzarella cheese', category: 'Pizza', price: 13.99, prepTime: 20, calories: 870, isVegetarian: false, isSpicy: false },
    { id: 5, name: 'Garlic Bread', description: 'Freshly baked garlic bread with herb butter', category: 'Appetizers', price: 6.50, prepTime: 10, calories: 320, isVegetarian: true, isSpicy: false },
    { id: 6, name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing and croutons', category: 'Salads', price: 8.99, prepTime: 10, calories: 280, isVegetarian: false, isSpicy: false },
    { id: 7, name: 'Tiramisu', description: 'Classic Italian dessert with espresso and mascarpone', category: 'Desserts', price: 7.99, prepTime: 5, calories: 450, isVegetarian: true, isSpicy: false }
  ],
  'sushi-central': [
    { id: 8, name: 'California Roll', description: 'Fresh crab, avocado, and cucumber roll', category: 'Sushi Rolls', price: 15.00, prepTime: 15, calories: 300, isVegetarian: false, isSpicy: false },
    { id: 9, name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo and cucumber', category: 'Sushi Rolls', price: 16.50, prepTime: 15, calories: 320, isVegetarian: false, isSpicy: true },
    { id: 10, name: 'Dragon Roll', description: 'Shrimp tempura with avocado and eel sauce', category: 'Sushi Rolls', price: 18.99, prepTime: 18, calories: 420, isVegetarian: false, isSpicy: false },
    { id: 11, name: 'Vegetable Tempura', description: 'Crispy fried assorted vegetables', category: 'Appetizers', price: 9.99, prepTime: 12, calories: 380, isVegetarian: true, isSpicy: false },
    { id: 12, name: 'Miso Soup', description: 'Traditional Japanese miso soup with tofu and seaweed', category: 'Soups', price: 5.25, prepTime: 8, calories: 80, isVegetarian: true, isSpicy: false },
    { id: 13, name: 'Edamame', description: 'Steamed soybeans with sea salt', category: 'Appetizers', price: 6.50, prepTime: 10, calories: 120, isVegetarian: true, isSpicy: false },
    { id: 14, name: 'Salmon Sashimi', description: 'Fresh salmon slices (8 pieces)', category: 'Sashimi', price: 19.99, prepTime: 10, calories: 240, isVegetarian: false, isSpicy: false },
    { id: 15, name: 'Green Tea Ice Cream', description: 'Creamy matcha green tea ice cream', category: 'Desserts', price: 6.99, prepTime: 5, calories: 220, isVegetarian: true, isSpicy: false }
  ],
  'burger-barn': [
    { id: 16, name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion, pickles, special sauce', category: 'Burgers', price: 10.99, prepTime: 15, calories: 680, isVegetarian: false, isSpicy: false },
    { id: 17, name: 'Bacon Cheeseburger', description: 'Beef patty with crispy bacon and melted cheddar', category: 'Burgers', price: 12.99, prepTime: 15, calories: 820, isVegetarian: false, isSpicy: false },
    { id: 18, name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', category: 'Burgers', price: 11.99, prepTime: 15, calories: 520, isVegetarian: true, isSpicy: false },
    { id: 19, name: 'Spicy Chicken Burger', description: 'Breaded chicken with spicy mayo and jalapeños', category: 'Burgers', price: 11.99, prepTime: 16, calories: 740, isVegetarian: false, isSpicy: true },
    { id: 20, name: 'French Fries', description: 'Crispy golden fries with sea salt', category: 'Sides', price: 4.99, prepTime: 10, calories: 420, isVegetarian: true, isSpicy: false },
    { id: 21, name: 'Onion Rings', description: 'Crispy battered onion rings', category: 'Sides', price: 5.99, prepTime: 12, calories: 480, isVegetarian: true, isSpicy: false },
    { id: 22, name: 'Chicken Wings', description: 'Buffalo or BBQ wings (8 pieces)', category: 'Appetizers', price: 9.99, prepTime: 18, calories: 640, isVegetarian: false, isSpicy: true },
    { id: 23, name: 'Chocolate Milkshake', description: 'Thick and creamy chocolate shake', category: 'Drinks', price: 5.99, prepTime: 5, calories: 580, isVegetarian: true, isSpicy: false }
  ],
  'taco-town': [
    { id: 24, name: 'Beef Tacos', description: 'Three soft tacos with seasoned beef, lettuce, cheese, and salsa', category: 'Tacos', price: 10.99, prepTime: 12, calories: 620, isVegetarian: false, isSpicy: false },
    { id: 25, name: 'Chicken Burrito', description: 'Large flour tortilla filled with grilled chicken, rice, beans, and cheese', category: 'Burritos', price: 12.99, prepTime: 15, calories: 780, isVegetarian: false, isSpicy: false },
    { id: 26, name: 'Veggie Quesadilla', description: 'Grilled tortilla with mixed vegetables and cheese', category: 'Quesadillas', price: 9.99, prepTime: 12, calories: 520, isVegetarian: true, isSpicy: false },
    { id: 27, name: 'Nachos Supreme', description: 'Tortilla chips topped with cheese, beans, jalapeños, and sour cream', category: 'Appetizers', price: 8.99, prepTime: 10, calories: 680, isVegetarian: true, isSpicy: true },
    { id: 28, name: 'Churros', description: 'Fried dough pastry with cinnamon sugar', category: 'Desserts', price: 5.99, prepTime: 8, calories: 340, isVegetarian: true, isSpicy: false }
  ]
}

export default function Menu({ restaurantId, onAddToCart }) {
  const [cart, setCart] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('All')

  const menuItems = MOCK_MENUS[restaurantId] || []
  
  // Get unique categories
  const categories = ['All', ...new Set(menuItems.map(item => item.category))]
  
  // Filter items by category
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const handleQuantityChange = (itemId, change) => {
    setCart(prev => {
      const current = prev[itemId] || 0
      const newQuantity = Math.max(0, current + change)
      if (newQuantity === 0) {
        const { [itemId]: removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: newQuantity }
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(i => i.id === parseInt(itemId))
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }

  const handleAddToCart = () => {
    const cartItems = Object.entries(cart).map(([itemId, quantity]) => {
      const item = menuItems.find(i => i.id === parseInt(itemId))
      return { ...item, quantity }
    })
    onAddToCart(cartItems)
    setCart({})
  }

  if (menuItems.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No menu available for this restaurant yet.</p>
      </div>
    )
  }

  return (
    <div className="menu-container">
      {/* Category filter */}
      <div className="menu-categories" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`button ${selectedCategory === cat ? 'primary' : 'secondary'}`}
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div className="menu-items-grid" style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
        {filteredItems.map(item => {
          const quantity = cart[item.id] || 0
          return (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-content" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 className="card-title" style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                    {item.name}
                    {item.isVegetarian && <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>🌱</span>}
                    {item.isSpicy && <span style={{ marginLeft: '0.25rem', fontSize: '1rem' }}>🌶️</span>}
                  </h3>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary-color)' }}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="card-description" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted-color)' }}>
                  <span>⏱️ {item.prepTime} min</span>
                  <span>🔥 {item.calories} cal</span>
                </div>
              </div>
              
              <div className="card-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                {quantity === 0 ? (
                  <button 
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="button primary full-width"
                  >
                    Add to Order
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="button"
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="button"
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Cart summary */}
      {getCartItemCount() > 0 && (
        <div className="cart-summary" style={{ 
          position: 'sticky', 
          bottom: 0, 
          background: 'var(--card-bg-color)', 
          padding: '1.5rem',
          borderTop: '2px solid var(--primary-color)',
          boxShadow: '0 -4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted-color)' }}>
                {getCartItemCount()} item{getCartItemCount() !== 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                ${getCartTotal().toFixed(2)}
              </div>
            </div>
            <button 
              onClick={handleAddToCart}
              className="button primary"
              style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
