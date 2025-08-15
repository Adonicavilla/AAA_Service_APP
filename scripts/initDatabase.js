#!/usr/bin/env node
// Database initialization script
const { initializeDatabase } = require('../database/config');

async function initDatabase() {
    console.log('🚀 Initializing database...');
    try {
        await initializeDatabase();
        console.log('✅ Database initialization completed successfully!');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    initDatabase();
}

module.exports = { initDatabase };
