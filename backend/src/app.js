const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the absolute path to avoid CWD issues
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Simple request logger for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});


// Basic Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Aarohi Exports Backend API' });
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const productVariantRoutes = require('./routes/productVariantRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// Initialize tables on application start
// Initialize collections table
const Collection = require('./models/collectionModel');
Collection.createTable().catch(err => console.error('Error creating collections table:', err));

// Initialize products table
const Product = require('./models/productModel');
Product.createTable().catch(err => console.error('Error creating products table:', err));

// Initialize product variants table
const ProductVariant = require('./models/productVariantModel');
ProductVariant.createTable().catch(err => console.error('Error creating product_variants table:', err));

// Initialize gallery table
const Gallery = require('./models/galleryModel');
Gallery.createTable().catch(err => console.error('Error creating gallery table:', err));


app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/gallery', galleryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

module.exports = app;
