const Collection = require('../models/collectionModel');
const Product = require('../models/productModel');
const ProductVariant = require('../models/productVariantModel');
const path = require('path');
const fs = require('fs');

exports.getAllCollections = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const offset = (page - 1) * limit;

        const collections = await Collection.getAllPaginated(limit, offset, search);
        const totalCount = await Collection.getCount(search);

        res.json({
            data: collections,
            pagination: {
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                pageSize: limit
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCollection = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required' });

        const id = await Collection.create(name);
        res.status(201).json({ id, name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await Collection.update(id, name);
        res.json({ message: 'Collection updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Get all products in this collection
        const products = await Product.getByCollectionId(id);

        for (const product of products) {
            // 1a. Delete variant images for each product
            const variants = await ProductVariant.getByProductId(product.id);
            if (variants && variants.length > 0) {
                for (const variant of variants) {
                    [variant.image_url_1, variant.image_url_2, variant.image_url_3].forEach(imageUrl => {
                        if (imageUrl) {
                            const variantImagePath = path.join(__dirname, '../../public', imageUrl);
                            if (fs.existsSync(variantImagePath)) {
                                fs.unlinkSync(variantImagePath);
                            }
                        }
                    });
                }
            }

            // 1b. Delete product's own image
            if (product.image_url) {
                const imagePath = path.join(__dirname, '../../public', product.image_url);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // Delete product record (variants will CASCADE in DB)
            await Product.delete(product.id);
        }

        // 2. Finally delete the collection record
        await Collection.delete(id);
        res.json({ message: 'Collection and all associated products/images deleted successfully' });
    } catch (error) {
        console.error('Error deleting collection:', error);
        res.status(500).json({ message: error.message });
    }
};
