const Gallery = require('../models/galleryModel');
const fs = require('fs');
const path = require('path');

exports.getAllGalleryImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const images = await Gallery.getAllPaginated(limit, offset);
        const totalCount = await Gallery.getCount();

        res.json({
            data: images,
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

exports.createGalleryImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const image_url = `/uploads/gallery/${req.file.filename}`;
        const id = await Gallery.create(image_url);

        res.status(201).json({ id, image_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const existingImage = await Gallery.getById(id);

        if (!existingImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        let image_url = existingImage.image_url;

        if (req.file) {
            // Delete old image
            const oldPath = path.join(__dirname, '../../public', image_url);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            image_url = `/uploads/gallery/${req.file.filename}`;
        }

        await Gallery.update(id, image_url);
        res.json({ message: 'Gallery image updated successfully', image_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Gallery.getById(id);

        if (image) {
            const imagePath = path.join(__dirname, '../../public', image.image_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Gallery.delete(id);
        res.json({ message: 'Gallery image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
