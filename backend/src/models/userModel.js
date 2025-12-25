const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );
        return result.insertId;
    }

    // This is for internal setup to ensure the admin user exists
    static async seedAdmin() {
        try {
            // Ensure table exists
            await db.execute(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('Users table checked/created.');

            const adminEmail = 'admin@aarohi.com';
            const adminPass = 'admin123';

            console.log('Checking if admin exists...');
            const existing = await this.findByEmail(adminEmail);
            console.log('Admin check complete. Found:', existing ? 'Yes' : 'No');

            if (!existing) {
                console.log('Seeding admin user...');
                await this.create(adminEmail, adminPass);
                console.log('Admin user seeded successfully.');
            } else {
                console.log('Admin already exists.');
            }
        } catch (error) {
            console.error('Error in seedAdmin:', error.message);
        }
    }
}

module.exports = User;
