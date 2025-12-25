const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for Gallery Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/uploads/gallery';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', galleryController.getAllGalleryImages);
router.post('/', authMiddleware, upload.single('image'), galleryController.createGalleryImage);
router.put('/:id', authMiddleware, upload.single('image'), galleryController.updateGalleryImage);
router.delete('/:id', authMiddleware, galleryController.deleteGalleryImage);

module.exports = router;
