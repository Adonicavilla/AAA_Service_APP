const { pool } = require('../database/config');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const { full_name, email, phone, password, user_type = 'customer' } = userData;
        const password_hash = await bcrypt.hash(password, 10);
        
        const [result] = await pool.query(
            'INSERT INTO users (full_name, email, phone, password_hash, user_type) VALUES (?, ?, ?, ?, ?)',
            [full_name, email, phone, password_hash, user_type]
        );
        
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT id, full_name, email, phone, user_type, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user) return null;
        
        const isValid = await bcrypt.compare(password, user.password_hash);
        return isValid ? user : null;
    }

    static async update(id, userData) {
        const { full_name, phone } = userData;
        await pool.query(
            'UPDATE users SET full_name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [full_name, phone, id]
        );
    }

    static async delete(id) {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
    }

    static async getAll(limit = 100, offset = 0) {
        const [rows] = await pool.query(
            'SELECT id, full_name, email, phone, user_type, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows;
    }
}

module.exports = User;
