const db = require('../config/db');

class Collection {
    static async createTable() {
        return await db.execute(`
            CREATE TABLE IF NOT EXISTS collections (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM collections ORDER BY id ASC');
        return rows;
    }

    static async getAllPaginated(limit, offset, search) {
        let query = 'SELECT * FROM collections';
        let params = [];

        if (search) {
            query += ' WHERE name LIKE ?';
            params.push(`%${search}%`);
        }

        query += ' ORDER BY id ASC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async getCount(search) {
        let query = 'SELECT COUNT(*) as count FROM collections';
        let params = [];

        if (search) {
            query += ' WHERE name LIKE ?';
            params.push(`%${search}%`);
        }

        const [rows] = await db.execute(query, params);
        return rows[0].count;
    }

    static async create(name) {
        const [result] = await db.execute('INSERT INTO collections (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async update(id, name) {
        return await db.execute('UPDATE collections SET name = ? WHERE id = ?', [name, id]);
    }

    static async delete(id) {
        return await db.execute('DELETE FROM collections WHERE id = ?', [id]);
    }
}

module.exports = Collection;
