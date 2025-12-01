const { pool } = require('../database/config');

class Menu {
    // Create a new menu item
    static async create(menuItemData) {
        const { 
            restaurant_id, 
            name, 
            description, 
            category, 
            price, 
            image_url = null,
            is_available = true,
            preparation_time = 15,
            calories = null,
            is_vegetarian = false,
            is_spicy = false
        } = menuItemData;
        
        const [result] = await pool.query(
            `INSERT INTO menu_items 
            (restaurant_id, name, description, category, price, image_url, is_available, preparation_time, calories, is_vegetarian, is_spicy) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [restaurant_id, name, description, category, price, image_url, is_available, preparation_time, calories, is_vegetarian, is_spicy]
        );
        
        return result.insertId;
    }

    // Get all menu items for a specific restaurant
    static async findByRestaurant(restaurant_id, onlyAvailable = true) {
        let query = 'SELECT * FROM menu_items WHERE restaurant_id = ?';
        const params = [restaurant_id];
        
        if (onlyAvailable) {
            query += ' AND is_available = TRUE';
        }
        
        query += ' ORDER BY category, name';
        
        const [rows] = await pool.query(query, params);
        return rows;
    }

    // Get menu items by category
    static async findByCategory(restaurant_id, category, onlyAvailable = true) {
        let query = 'SELECT * FROM menu_items WHERE restaurant_id = ? AND category = ?';
        const params = [restaurant_id, category];
        
        if (onlyAvailable) {
            query += ' AND is_available = TRUE';
        }
        
        query += ' ORDER BY name';
        
        const [rows] = await pool.query(query, params);
        return rows;
    }

    // Get a single menu item by ID
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM menu_items WHERE id = ?', [id]);
        return rows[0];
    }

    // Get all categories for a restaurant
    static async getCategories(restaurant_id) {
        const [rows] = await pool.query(
            'SELECT DISTINCT category FROM menu_items WHERE restaurant_id = ? AND is_available = TRUE ORDER BY category',
            [restaurant_id]
        );
        return rows.map(row => row.category);
    }

    // Update a menu item
    static async update(id, menuItemData) {
        const { 
            name, 
            description, 
            category, 
            price, 
            image_url,
            is_available,
            preparation_time,
            calories,
            is_vegetarian,
            is_spicy
        } = menuItemData;
        
        await pool.query(
            `UPDATE menu_items 
            SET name = ?, description = ?, category = ?, price = ?, image_url = ?, 
                is_available = ?, preparation_time = ?, calories = ?, is_vegetarian = ?, is_spicy = ?,
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?`,
            [name, description, category, price, image_url, is_available, preparation_time, calories, is_vegetarian, is_spicy, id]
        );
    }

    // Toggle availability of a menu item
    static async toggleAvailability(id) {
        await pool.query(
            'UPDATE menu_items SET is_available = NOT is_available, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [id]
        );
    }

    // Delete a menu item
    static async delete(id) {
        await pool.query('DELETE FROM menu_items WHERE id = ?', [id]);
    }

    // Search menu items by name
    static async search(restaurant_id, searchTerm) {
        const [rows] = await pool.query(
            `SELECT * FROM menu_items 
            WHERE restaurant_id = ? AND is_available = TRUE 
            AND (name LIKE ? OR description LIKE ?) 
            ORDER BY name`,
            [restaurant_id, `%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }

    // Get all menu items (admin function)
    static async getAll(limit = 100, offset = 0) {
        const [rows] = await pool.query(
            `SELECT m.*, r.name as restaurant_name 
            FROM menu_items m 
            JOIN restaurants r ON m.restaurant_id = r.id 
            ORDER BY m.created_at DESC 
            LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        return rows;
    }

    // Get popular items (most ordered)
    static async getPopularItems(restaurant_id, limit = 5) {
        const [rows] = await pool.query(
            `SELECT m.*, COUNT(oi.id) as order_count 
            FROM menu_items m 
            LEFT JOIN order_items oi ON m.id = oi.menu_item_id 
            WHERE m.restaurant_id = ? AND m.is_available = TRUE 
            GROUP BY m.id 
            ORDER BY order_count DESC, m.name 
            LIMIT ?`,
            [restaurant_id, limit]
        );
        return rows;
    }
}

module.exports = Menu;
