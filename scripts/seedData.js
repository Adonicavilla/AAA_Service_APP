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
        
        // Insert test order items
        const orderItems = [
            { order_id: 1, item_name: 'Margherita Pizza', item_description: 'Classic margherita with fresh mozzarella', quantity: 1, unit_price: 12.99, subtotal: 12.99 },
            { order_id: 1, item_name: 'Garlic Bread', item_description: 'Freshly baked garlic bread', quantity: 2, unit_price: 6.50, subtotal: 13.00 },
            { order_id: 2, item_name: 'California Roll', item_description: 'Fresh crab and avocado roll', quantity: 1, unit_price: 15.00, subtotal: 15.00 },
            { order_id: 2, item_name: 'Miso Soup', item_description: 'Traditional Japanese miso soup', quantity: 2, unit_price: 10.25, subtotal: 20.50 }
        ];
        
        for (const item of orderItems) {
            await pool.query(
                'INSERT INTO order_items (order_id, item_name, item_description, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
                [item.order_id, item.item_name, item.item_description, item.quantity, item.unit_price, item.subtotal]
            );
        }
        
        console.log('✅ Test data seeded successfully!');
        console.log('📊 Summary:');
        console.log(`   - ${users.length} users created`);
        console.log(`   - ${restaurants.length} restaurants added`);
        console.log(`   - ${drivers.length} drivers registered`);
        console.log(`   - ${addresses.length} addresses saved`);
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
