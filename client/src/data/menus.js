export const RESTAURANTS = [
  { id: 'pizza-palace', name: 'Pizza Palace', eta: '25-35 min', price: '$$', rating: 4.5,
    menu: [
      { id: 'p1', name: 'Margherita Pizza', price: 8.99 },
      { id: 'p2', name: 'Pepperoni Pizza', price: 9.99 },
      { id: 'p3', name: 'Garlic Bread', price: 3.5 }
    ]
  },
  { id: 'sushi-central', name: 'Sushi Central', eta: '30-40 min', price: '$$$', rating: 4.8,
    menu: [
      { id: 's1', name: 'California Roll', price: 7.5 },
      { id: 's2', name: 'Salmon Sashimi', price: 12.0 },
      { id: 's3', name: 'Miso Soup', price: 2.5 }
    ]
  },
  { id: 'burger-barn', name: 'Burger Barn', eta: '20-30 min', price: '$', rating: 4.2,
    menu: [
      { id: 'b1', name: 'Classic Burger', price: 6.5 },
      { id: 'b2', name: 'Cheese Fries', price: 3.0 },
      { id: 'b3', name: 'Milkshake', price: 2.99 }
    ]
  },
  { id: 'taco-town', name: 'Taco Town', eta: '25-35 min', price: '$$', rating: 4.6,
    menu: [
      { id: 't1', name: 'Beef Taco', price: 2.5 },
      { id: 't2', name: 'Chicken Burrito', price: 6.0 },
      { id: 't3', name: 'Chips & Salsa', price: 2.0 }
    ]
  }
]

export const BUSINESSES = [
  { id: 'paws-claws', name: 'Paws & Claws Pet Shop', type: 'Pet Shop', desc: 'Food, toys, and accessories.', location: '321 Pet Lane', products: [
      { id: 'pp1', name: 'Dog Food (1kg)', price: 12.99 },
      { id: 'pp2', name: 'Cat Toy', price: 4.5 },
      { id: 'pp3', name: 'Leash', price: 7.0 }
    ] },
  { id: 'manejkom', name: 'Manejkom Travel & Tours', type: 'Travel Agency', desc: 'Plan your dream vacation.', location: '555 Travel St', products: [
      { id: 'mt1', name: 'Flight Booking', price: 0 },
      { id: 'mt2', name: 'Hotel Reservation', price: 0 }
    ] },
  { id: 'home-fix', name: 'Home Fix It Hardware', type: 'Hardware Store', desc: 'Tools and supplies for home projects.', location: '22 Tool Ave', products: [
      { id: 'hf1', name: 'Hammer', price: 9.99 },
      { id: 'hf2', name: 'Screwdriver Set', price: 14.5 },
      { id: 'hf3', name: 'Box of Nails', price: 3.75 }
    ] }
]
