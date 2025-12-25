const db = require('../config/db');

class Gallery {
    static async createTable() {
        return await db.execute(`
            CREATE TABLE IF NOT EXISTS gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                image_url VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    static async getAllPaginated(limit, offset) {
        let query = 'SELECT * FROM gallery ORDER BY id ASC LIMIT ? OFFSET ?';
        let params = [limit, offset];

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async getCount() {
        let query = 'SELECT COUNT(*) as count FROM gallery';
        const [rows] = await db.execute(query);
        return rows[0].count;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM gallery WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(image_url) {
        const [result] = await db.execute('INSERT INTO gallery (image_url) VALUES (?)', [image_url]);
        return result.insertId;
    }

    static async update(id, image_url) {
        return await db.execute('UPDATE gallery SET image_url = ? WHERE id = ?', [image_url, id]);
    }

    static async delete(id) {
        return await db.execute('DELETE FROM gallery WHERE id = ?', [id]);
    }
}

module.exports = Gallery;
