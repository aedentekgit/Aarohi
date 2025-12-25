const db = require('../config/db');

class ProductVariant {
    static async createTable() {
        return await db.execute(`
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
    }

    static async getAll() {
        const [rows] = await db.execute(`
            SELECT 
                pv.*,
                p.name as product_name,
                p.image_url as product_image,
                p.collection_id,
                c.name as collection_name
            FROM product_variants pv
            LEFT JOIN products p ON pv.product_id = p.id
            LEFT JOIN collections c ON p.collection_id = c.id
            ORDER BY pv.id ASC
        `);
        return rows;
    }

    static async getAllPaginated(limit, offset, search) {
        let query = `
            SELECT 
                pv.*,
                p.name as product_name,
                p.image_url as product_image,
                p.collection_id,
                c.name as collection_name
            FROM product_variants pv
            LEFT JOIN products p ON pv.product_id = p.id
            LEFT JOIN collections c ON p.collection_id = c.id
        `;
        let params = [];

        if (search) {
            query += ' WHERE pv.name LIKE ? OR p.name LIKE ? OR c.name LIKE ?';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY pv.id ASC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async getCount(search) {
        let query = `
            SELECT COUNT(*) as count 
            FROM product_variants pv
            LEFT JOIN products p ON pv.product_id = p.id
            LEFT JOIN collections c ON p.collection_id = c.id
        `;
        let params = [];

        if (search) {
            query += ' WHERE pv.name LIKE ? OR p.name LIKE ? OR c.name LIKE ?';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        const [rows] = await db.execute(query, params);
        return rows[0].count;
    }

    static async getById(id) {
        const [rows] = await db.execute(`
            SELECT 
                pv.*,
                p.name as product_name,
                p.image_url as product_image,
                p.collection_id,
                c.name as collection_name
            FROM product_variants pv
            LEFT JOIN products p ON pv.product_id = p.id
            LEFT JOIN collections c ON p.collection_id = c.id
            WHERE pv.id = ?
        `, [id]);
        return rows[0];
    }

    static async getByProductId(productId) {
        const [rows] = await db.execute(`
            SELECT 
                pv.*,
                p.name as product_name,
                p.image_url as product_image,
                p.collection_id,
                c.name as collection_name
            FROM product_variants pv
            LEFT JOIN products p ON pv.product_id = p.id
            LEFT JOIN collections c ON p.collection_id = c.id
            WHERE pv.product_id = ?
            ORDER BY pv.created_at DESC
        `, [productId]);
        return rows;
    }

    static async create(product_id, name, image_url_1, image_url_2 = null, image_url_3 = null) {
        const [result] = await db.execute(
            'INSERT INTO product_variants (product_id, name, image_url_1, image_url_2, image_url_3) VALUES (?, ?, ?, ?, ?)',
            [product_id, name, image_url_1, image_url_2, image_url_3]
        );
        return result.insertId;
    }

    static async update(id, product_id, name, image_url_1 = null, image_url_2 = null, image_url_3 = null) {
        // Get current variant to preserve existing images if not updated
        const current = await this.getById(id);

        const finalImage1 = image_url_1 || current.image_url_1;
        const finalImage2 = image_url_2 !== undefined ? image_url_2 : current.image_url_2;
        const finalImage3 = image_url_3 !== undefined ? image_url_3 : current.image_url_3;

        return await db.execute(
            'UPDATE product_variants SET product_id = ?, name = ?, image_url_1 = ?, image_url_2 = ?, image_url_3 = ? WHERE id = ?',
            [product_id, name, finalImage1, finalImage2, finalImage3, id]
        );
    }

    static async delete(id) {
        return await db.execute('DELETE FROM product_variants WHERE id = ?', [id]);
    }
}

module.exports = ProductVariant;
