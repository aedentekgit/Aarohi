const ProductVariant = require('../models/productVariantModel');
const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for multiple image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../public/uploads/variants');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'variant-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
}).array('images', 3); // Accept up to 3 images with field name 'images'

// Get all product variants
exports.getAllVariants = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const offset = (page - 1) * limit;

        const variants = await ProductVariant.getAllPaginated(limit, offset, search);
        const totalCount = await ProductVariant.getCount(search);

        // Format response to match frontend expectations
        const formattedVariants = variants.map(variant => ({
            id: variant.id,
            name: variant.name,
            images: [
                variant.image_url_1,
                variant.image_url_2,
                variant.image_url_3
            ].filter(img => img !== null), // Remove null images
            productId: {
                id: variant.product_id,
                name: variant.product_name,
                image: variant.product_image,
                collectionId: {
                    id: variant.collection_id,
                    name: variant.collection_name
                }
            },
            createdAt: variant.created_at,
            updatedAt: variant.updated_at
        }));

        res.status(200).json({
            success: true,
            data: formattedVariants,
            pagination: {
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                pageSize: limit
            }
        });
    } catch (error) {
        console.error('Error fetching variants:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product variants',
            error: error.message
        });
    }
};

// Get single product variant
exports.getVariantById = async (req, res) => {
    try {
        const variant = await ProductVariant.getById(req.params.id);

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Product variant not found'
            });
        }

        // Format response
        const formattedVariant = {
            id: variant.id,
            name: variant.name,
            images: [
                variant.image_url_1,
                variant.image_url_2,
                variant.image_url_3
            ].filter(img => img !== null),
            productId: {
                id: variant.product_id,
                name: variant.product_name,
                image: variant.product_image,
                collectionId: {
                    id: variant.collection_id,
                    name: variant.collection_name
                }
            },
            createdAt: variant.created_at,
            updatedAt: variant.updated_at
        };

        res.status(200).json({
            success: true,
            data: formattedVariant
        });
    } catch (error) {
        console.error('Error fetching variant:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product variant',
            error: error.message
        });
    }
};

// Get variants by product ID
exports.getVariantsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const variants = await ProductVariant.getByProductId(productId);

        // Format response to match frontend expectations
        const formattedVariants = variants.map(variant => ({
            id: variant.id,
            name: variant.name,
            images: [
                variant.image_url_1,
                variant.image_url_2,
                variant.image_url_3
            ].filter(img => img !== null), // Remove null images
            productId: {
                id: variant.product_id,
                name: variant.product_name,
                image: variant.product_image,
                collectionId: {
                    id: variant.collection_id,
                    name: variant.collection_name
                }
            },
            createdAt: variant.created_at,
            updatedAt: variant.updated_at
        }));

        res.status(200).json({
            success: true,
            data: formattedVariants
        });
    } catch (error) {
        console.error('Error fetching variants by product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product variants',
            error: error.message
        });
    }
};

// Create new product variant
exports.createVariant = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        try {
            const { productId, name } = req.body;

            // Validate required fields
            if (!productId || !name) {
                return res.status(400).json({
                    success: false,
                    message: 'Product and name are required'
                });
            }

            // Check if at least one image was uploaded
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one image is required'
                });
            }

            // Get image paths (up to 3)
            const imagePaths = req.files.map(file => `/uploads/variants/${file.filename}`);
            const image1 = imagePaths[0] || null;
            const image2 = imagePaths[1] || null;
            const image3 = imagePaths[2] || null;

            const variantId = await ProductVariant.create(productId, name, image1, image2, image3);

            // Get the created variant with all details
            const variant = await ProductVariant.getById(variantId);

            // Format response
            const formattedVariant = {
                id: variant.id,
                name: variant.name,
                images: [
                    variant.image_url_1,
                    variant.image_url_2,
                    variant.image_url_3
                ].filter(img => img !== null),
                productId: {
                    id: variant.product_id,
                    name: variant.product_name,
                    image: variant.product_image,
                    collectionId: {
                        id: variant.collection_id,
                        name: variant.collection_name
                    }
                },
                createdAt: variant.created_at,
                updatedAt: variant.updated_at
            };

            res.status(201).json({
                success: true,
                message: 'Product variant created successfully',
                data: formattedVariant
            });
        } catch (error) {
            console.error('Error creating variant:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating product variant',
                error: error.message
            });
        }
    });
};

// Update product variant
exports.updateVariant = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        try {
            const { id } = req.params;
            const { productId, name } = req.body;

            const variant = await ProductVariant.getById(id);
            if (!variant) {
                return res.status(404).json({
                    success: false,
                    message: 'Product variant not found'
                });
            }

            // Handle image updates
            let image1 = variant.image_url_1;
            let image2 = variant.image_url_2;
            let image3 = variant.image_url_3;

            if (req.files && req.files.length > 0) {
                // Delete old images
                [variant.image_url_1, variant.image_url_2, variant.image_url_3].forEach(oldImage => {
                    if (oldImage) {
                        const oldImagePath = path.join(__dirname, '../../public', oldImage);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                });

                // Set new images
                const imagePaths = req.files.map(file => `/uploads/variants/${file.filename}`);
                image1 = imagePaths[0] || null;
                image2 = imagePaths[1] || null;
                image3 = imagePaths[2] || null;
            }

            await ProductVariant.update(
                id,
                productId || variant.product_id,
                name || variant.name,
                image1,
                image2,
                image3
            );

            // Get updated variant
            const updatedVariant = await ProductVariant.getById(id);

            // Format response
            const formattedVariant = {
                id: updatedVariant.id,
                name: updatedVariant.name,
                images: [
                    updatedVariant.image_url_1,
                    updatedVariant.image_url_2,
                    updatedVariant.image_url_3
                ].filter(img => img !== null),
                productId: {
                    id: updatedVariant.product_id,
                    name: updatedVariant.product_name,
                    image: updatedVariant.product_image,
                    collectionId: {
                        id: updatedVariant.collection_id,
                        name: updatedVariant.collection_name
                    }
                },
                createdAt: updatedVariant.created_at,
                updatedAt: updatedVariant.updated_at
            };

            res.status(200).json({
                success: true,
                message: 'Product variant updated successfully',
                data: formattedVariant
            });
        } catch (error) {
            console.error('Error updating variant:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating product variant',
                error: error.message
            });
        }
    });
};

// Delete product variant
exports.deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;

        const variant = await ProductVariant.getById(id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Product variant not found'
            });
        }

        // Delete all image files
        [variant.image_url_1, variant.image_url_2, variant.image_url_3].forEach(imageUrl => {
            if (imageUrl) {
                const imagePath = path.join(__dirname, '../../public', imageUrl);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        });

        await ProductVariant.delete(id);

        res.status(200).json({
            success: true,
            message: 'Product variant deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting variant:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product variant',
            error: error.message
        });
    }
};
