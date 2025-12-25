const db = require('../config/db');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        // Build WHERE clause for search
        let whereClause = '';
        let queryParams = [];

        if (search) {
            whereClause = 'WHERE p.name LIKE ? OR c.name LIKE ?';
            queryParams = [`%${search}%`, `%${search}%`];
        }

        // Get total count
        const countQuery = `
            SELECT COUNT(*) as total 
            FROM products p 
            LEFT JOIN collections c ON p.collection_id = c.id 
            ${whereClause}
        `;
        const [countResult] = await db.query(countQuery, queryParams);
        const total = countResult[0].total;

        // Get paginated products
        const productsQuery = `
            SELECT p.*, c.name as collection_name 
            FROM products p 
            LEFT JOIN collections c ON p.collection_id = c.id 
            ${whereClause}
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        `;
        const [products] = await db.query(productsQuery, [...queryParams, limit, offset]);

        res.json({
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(products[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, collection_id } = req.body;
        const image_url = req.file ? `/uploads/products/${req.file.filename}` : null;

        if (!image_url) {
            return res.status(400).json({ message: 'Product image is required' });
        }

        const [result] = await db.query(
            'INSERT INTO products (name, collection_id, image_url) VALUES (?, ?, ?)',
            [name, collection_id, image_url]
        );

        res.status(201).json({
            message: 'Product created successfully',
            productId: result.insertId
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, collection_id } = req.body;

        // Build update query dynamically based on whether image is uploaded
        let updateQuery = 'UPDATE products SET name = ?, collection_id = ?';
        let queryParams = [name, collection_id];

        if (req.file) {
            const image_url = `/uploads/products/${req.file.filename}`;
            updateQuery += ', image_url = ?';
            queryParams.push(image_url);
        }

        updateQuery += ' WHERE id = ?';
        queryParams.push(req.params.id);

        const [result] = await db.query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Get products by collection
const getProductsByCollection = async (req, res) => {
    try {
        const [products] = await db.query(
            'SELECT * FROM products WHERE collection_id = ? ORDER BY created_at DESC',
            [req.params.collectionId]
        );
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by collection:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCollection
};
