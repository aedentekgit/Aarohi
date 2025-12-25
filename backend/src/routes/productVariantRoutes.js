const express = require('express');
const router = express.Router();
const productVariantController = require('../controllers/productVariantController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route - Get variants by product ID (no auth required)
router.get('/product/:productId', productVariantController.getVariantsByProductId);

// Public route - Get all product variants (needed for gallery filtering)
router.get('/', productVariantController.getAllVariants);

// All routes below require authentication
router.use(authMiddleware);

// GET single product variant
router.get('/:id', productVariantController.getVariantById);

// POST create new product variant
router.post('/', productVariantController.createVariant);

// PUT update product variant
router.put('/:id', productVariantController.updateVariant);

// DELETE product variant
router.delete('/:id', productVariantController.deleteVariant);

module.exports = router;
