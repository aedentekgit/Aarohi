const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', collectionController.getAllCollections);
router.post('/', authMiddleware, collectionController.createCollection);
router.put('/:id', authMiddleware, collectionController.updateCollection);
router.delete('/:id', authMiddleware, collectionController.deleteCollection);

module.exports = router;
