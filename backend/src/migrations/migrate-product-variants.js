const db = require('../config/db');

async function migrateProductVariantsTable() {
    try {
        console.log('Starting product_variants table migration...');

        // Drop the old table
        await db.execute('DROP TABLE IF EXISTS product_variants');
        console.log('Dropped old product_variants table');

        // Create new table with 3 image columns
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_variants (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                image_url_1 VARCHAR(255) NOT NULL,
                image_url_2 VARCHAR(255) DEFAULT NULL,
                image_url_3 VARCHAR(255) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            )
        `);
        console.log('Created new product_variants table with 3 image columns');

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateProductVariantsTable();
