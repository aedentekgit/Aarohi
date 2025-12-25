const db = require('../config/db');

class Product {
    static async createTable() {
        return await db.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                collection_id INT,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
            )
        `);
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByCollectionId(collectionId) {
        const [rows] = await db.execute('SELECT * FROM products WHERE collection_id = ?', [collectionId]);
        return rows;
    }

    static async getAll() {
        const [rows] = await db.execute(`
            SELECT p.*, c.name as collection_name 
            FROM products p 
            LEFT JOIN collections c ON p.collection_id = c.id 
            ORDER BY p.id ASC
        `);
        return rows;
    }

    static async getAllPaginated(limit, offset, search) {
        let query = `
            SELECT p.*, c.name as collection_name 
            FROM products p 
            LEFT JOIN collections c ON p.collection_id = c.id
        `;
        let params = [];

        if (search) {
            query += ' WHERE p.name LIKE ? OR c.name LIKE ?';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY p.id ASC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async getCount(search) {
        let query = 'SELECT COUNT(*) as count FROM products p LEFT JOIN collections c ON p.collection_id = c.id';
        let params = [];

        if (search) {
            query += ' WHERE p.name LIKE ? OR c.name LIKE ?';
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await db.execute(query, params);
        return rows[0].count;
    }

    static async create(name, collection_id, image_url) {
        const [result] = await db.execute(
            'INSERT INTO products (name, collection_id, image_url) VALUES (?, ?, ?)',
            [name, collection_id, image_url]
        );
        return result.insertId;
    }

    static async update(id, name, collection_id, image_url) {
        if (image_url) {
            return await db.execute(
                'UPDATE products SET name = ?, collection_id = ?, image_url = ? WHERE id = ?',
                [name, collection_id, image_url, id]
            );
        } else {
            return await db.execute(
                'UPDATE products SET name = ?, collection_id = ? WHERE id = ?',
                [name, collection_id, id]
            );
        }
    }

    static async delete(id) {
        return await db.execute('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = Product;
