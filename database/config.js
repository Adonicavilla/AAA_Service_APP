// Database configuration for MySQL
const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ordering_system',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
}

// Initialize database with schema
async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        // Create database if not exists
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log(`✅ Database '${dbConfig.database}' created or already exists`);
        
        // Use the database
        await connection.query(`USE ${dbConfig.database}`);
        
        // Read and execute schema
        const fs = require('fs');
        const path = require('path');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Split and execute SQL statements
        const statements = schema.split(';').filter(stmt => stmt.trim());
        for (const statement of statements) {
            if (statement.trim() && !statement.trim().startsWith('--')) {
                try {
                    await connection.query(statement);
                } catch (err) {
                    // Skip errors for comments and empty statements
                    if (!err.message.includes('DELIMITER')) {
                        console.log(`Executed: ${statement.substring(0, 50)}...`);
                    }
                }
            }
        }
        
        console.log('✅ Database schema initialized successfully');
        await connection.end();
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    }
}

module.exports = {
    pool,
    testConnection,
    initializeDatabase
};
