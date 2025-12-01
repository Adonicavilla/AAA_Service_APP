#!/usr/bin/env node
// Seed data for testing the ordering system
const { pool } = require('../database/config');
const bcrypt = require('bcryptjs');

async function seedData() {
    console.log('🌱 Seeding database with test data...');
    
    try {
        // Hash passwords
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        // Insert test users
        const users = [
            { full_name: 'John Doe', email: 'john@example.com', phone: '09123456789', password_hash: hashedPassword, user_type: 'customer' },
            { full_name: 'Jane Smith', email: 'jane@example.com', phone: '09876543210', password_hash: hashedPassword, user_type: 'customer' },
            { full_name: 'Mike Driver', email: 'mike@example.com', phone: '09112233445', password_hash: hashedPassword, user_type: 'driver' },
            { full_name: 'Admin User', email: 'admin@example.com', phone: '09998887766', password_hash: hashedPassword, user_type: 'admin' }
        ];
        
        for (const user of users) {
            await pool.query(
                'INSERT INTO users (full_name, email, phone, password_hash, user_type) VALUES (?, ?, ?, ?, ?)',
                [user.full_name, user.email, user.phone, user.password_hash, user.user_type]
            );
        }
        
        // Insert test restaurants
        const restaurants = [
            { name: 'Pizza Palace', category: 'Italian', description: 'Authentic Italian pizza and pasta', address: '123 Main St, Downtown', latitude: 14.8433, longitude: 120.8114, phone: '09123456789', email: 'pizza@palace.com' },
            { name: 'Sushi Central', category: 'Japanese', description: 'Fresh sushi and Japanese cuisine', address: '456 Ocean Ave, Waterfront', latitude: 14.8500, longitude: 120.8200, phone: '09876543210', email: 'sushi@central.com' },
            { name: 'Burger Barn', category: 'American', description: 'Classic burgers and American fare', address: '789 Park Blvd, Midtown', latitude: 14.8400, longitude: 120.8050, phone: '09112233445', email: 'burger@barn.com' }
        ];
        
        for (const restaurant of restaurants) {
            await pool.query(
                'INSERT INTO restaurants (name, category, description, address, latitude, longitude, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [restaurant.name, restaurant.category, restaurant.description, restaurant.address, restaurant.latitude, restaurant.longitude, restaurant.phone, restaurant.email]
            );
        }
        
        // Insert test drivers
        const drivers = [
            { user_id: 3, license_number: 'DL123456789', vehicle_type: 'Motorcycle', vehicle_model: 'Honda Beat', vehicle_plate: 'ABC1234' }
        ];
        
        for (const driver of drivers) {
            await pool.query(
                'INSERT INTO drivers (user_id, license_number, vehicle_type, vehicle_model, vehicle_plate) VALUES (?, ?, ?, ?, ?)',
                [driver.user_id, driver.license_number, driver.vehicle_type, driver.vehicle_model, driver.vehicle_plate]
            );
        }
        
        // Insert test user addresses
        const addresses = [
            { user_id: 1, address_line1: '123 Main St', city: 'Malolos', state: 'Bulacan', postal_code: '3000', latitude: 14.8433, longitude: 120.8114, is_default: true },
            { user_id: 2, address_line1: '456 Oak Ave', city: 'Malolos', state: 'Bulacan', postal_code: '3000', latitude: 14.8500, longitude: 120.8200, is_default: true }
        ];
        
        for (const address of addresses) {
            await pool.query(
                'INSERT INTO user_addresses (user_id, address_line1, city, state, postal_code, latitude, longitude, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [address.user_id, address.address_line1, address.city, address.state, address.postal_code, address.latitude, address.longitude, address.is_default]
            );
        }
        
        // Insert test orders
        const orders = [
            { order_number: 'ORD20240101001', user_id: 1, restaurant_id: 1, delivery_address_id: 1, total_amount: 25.99, status: 'delivered' },
            { order_number: 'ORD20240101002', user_id: 2, restaurant_id: 2, delivery_address_id: 2, total_amount: 35.50, status: 'pending' }
        ];
        
        for (const order of orders) {
            await pool.query(
                'INSERT INTO orders (order_number, user_id, restaurant_id, delivery_address_id, total_amount, status) VALUES (?, ?, ?, ?, ?, ?)',
                [order.order_number, order.user_id, order.restaurant_id, order.delivery_address_id, order.total_amount, order.status]
            );
        }
        
        // Insert test menu items
        const menuItems = [
            // Pizza Palace (restaurant_id: 1)
            { restaurant_id: 1, name: 'Margherita Pizza', description: 'Classic margherita with fresh mozzarella, tomatoes, and basil', category: 'Pizza', price: 12.99, preparation_time: 20, calories: 800, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 1, name: 'Pepperoni Pizza', description: 'Traditional pepperoni pizza with extra cheese', category: 'Pizza', price: 14.99, preparation_time: 20, calories: 950, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 1, name: 'Quattro Formaggi', description: 'Four cheese pizza: mozzarella, parmesan, gorgonzola, fontina', category: 'Pizza', price: 15.99, preparation_time: 22, calories: 920, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 1, name: 'Hawaiian Pizza', description: 'Ham and pineapple with mozzarella cheese', category: 'Pizza', price: 13.99, preparation_time: 20, calories: 870, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 1, name: 'Garlic Bread', description: 'Freshly baked garlic bread with herb butter', category: 'Appetizers', price: 6.50, preparation_time: 10, calories: 320, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 1, name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing and croutons', category: 'Salads', price: 8.99, preparation_time: 10, calories: 280, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 1, name: 'Tiramisu', description: 'Classic Italian dessert with espresso and mascarpone', category: 'Desserts', price: 7.99, preparation_time: 5, calories: 450, is_vegetarian: true, is_spicy: false },
            
            // Sushi Central (restaurant_id: 2)
            { restaurant_id: 2, name: 'California Roll', description: 'Fresh crab, avocado, and cucumber roll', category: 'Sushi Rolls', price: 15.00, preparation_time: 15, calories: 300, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 2, name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo and cucumber', category: 'Sushi Rolls', price: 16.50, preparation_time: 15, calories: 320, is_vegetarian: false, is_spicy: true },
            { restaurant_id: 2, name: 'Dragon Roll', description: 'Shrimp tempura with avocado and eel sauce', category: 'Sushi Rolls', price: 18.99, preparation_time: 18, calories: 420, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 2, name: 'Vegetable Tempura', description: 'Crispy fried assorted vegetables', category: 'Appetizers', price: 9.99, preparation_time: 12, calories: 380, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 2, name: 'Miso Soup', description: 'Traditional Japanese miso soup with tofu and seaweed', category: 'Soups', price: 5.25, preparation_time: 8, calories: 80, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 2, name: 'Edamame', description: 'Steamed soybeans with sea salt', category: 'Appetizers', price: 6.50, preparation_time: 10, calories: 120, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 2, name: 'Salmon Sashimi', description: 'Fresh salmon slices (8 pieces)', category: 'Sashimi', price: 19.99, preparation_time: 10, calories: 240, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 2, name: 'Green Tea Ice Cream', description: 'Creamy matcha green tea ice cream', category: 'Desserts', price: 6.99, preparation_time: 5, calories: 220, is_vegetarian: true, is_spicy: false },
            
            // Burger Barn (restaurant_id: 3)
            { restaurant_id: 3, name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion, pickles, special sauce', category: 'Burgers', price: 10.99, preparation_time: 15, calories: 680, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 3, name: 'Bacon Cheeseburger', description: 'Beef patty with crispy bacon and melted cheddar', category: 'Burgers', price: 12.99, preparation_time: 15, calories: 820, is_vegetarian: false, is_spicy: false },
            { restaurant_id: 3, name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', category: 'Burgers', price: 11.99, preparation_time: 15, calories: 520, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 3, name: 'Spicy Chicken Burger', description: 'Breaded chicken with spicy mayo and jalapeños', category: 'Burgers', price: 11.99, preparation_time: 16, calories: 740, is_vegetarian: false, is_spicy: true },
            { restaurant_id: 3, name: 'French Fries', description: 'Crispy golden fries with sea salt', category: 'Sides', price: 4.99, preparation_time: 10, calories: 420, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 3, name: 'Onion Rings', description: 'Crispy battered onion rings', category: 'Sides', price: 5.99, preparation_time: 12, calories: 480, is_vegetarian: true, is_spicy: false },
            { restaurant_id: 3, name: 'Chicken Wings', description: 'Buffalo or BBQ wings (8 pieces)', category: 'Appetizers', price: 9.99, preparation_time: 18, calories: 640, is_vegetarian: false, is_spicy: true },
            { restaurant_id: 3, name: 'Chocolate Milkshake', description: 'Thick and creamy chocolate shake', category: 'Drinks', price: 5.99, preparation_time: 5, calories: 580, is_vegetarian: true, is_spicy: false }
        ];
        
        for (const item of menuItems) {
            await pool.query(
                'INSERT INTO menu_items (restaurant_id, name, description, category, price, preparation_time, calories, is_vegetarian, is_spicy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [item.restaurant_id, item.name, item.description, item.category, item.price, item.preparation_time, item.calories, item.is_vegetarian, item.is_spicy]
            );
        }
        
        // Insert test order items
        const orderItems = [
            { order_id: 1, menu_item_id: 1, item_name: 'Margherita Pizza', item_description: 'Classic margherita with fresh mozzarella', quantity: 1, unit_price: 12.99, subtotal: 12.99 },
            { order_id: 1, menu_item_id: 5, item_name: 'Garlic Bread', item_description: 'Freshly baked garlic bread', quantity: 2, unit_price: 6.50, subtotal: 13.00 },
            { order_id: 2, menu_item_id: 8, item_name: 'California Roll', item_description: 'Fresh crab and avocado roll', quantity: 1, unit_price: 15.00, subtotal: 15.00 },
            { order_id: 2, menu_item_id: 12, item_name: 'Miso Soup', item_description: 'Traditional Japanese miso soup', quantity: 2, unit_price: 5.25, subtotal: 10.50 }
        ];
        
        for (const item of orderItems) {
            await pool.query(
                'INSERT INTO order_items (order_id, menu_item_id, item_name, item_description, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [item.order_id, item.menu_item_id, item.item_name, item.item_description, item.quantity, item.unit_price, item.subtotal]
            );
        }
        
        console.log('✅ Test data seeded successfully!');
        console.log('📊 Summary:');
        console.log(`   - ${users.length} users created`);
        console.log(`   - ${restaurants.length} restaurants added`);
        console.log(`   - ${drivers.length} drivers registered`);
        console.log(`   - ${addresses.length} addresses saved`);
        console.log(`   - ${menuItems.length} menu items added`);
        console.log(`   - ${orders.length} orders placed`);
        console.log(`   - ${orderItems.length} order items added`);
        
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Run if called directly
if (require.main === module) {
    seedData();
}

module.exports = { seedData };
