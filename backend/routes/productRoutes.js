import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        // THIS LOGS THE ERROR TO YOUR TERMINAL
        console.error("Error in GET /api/products:", error); 
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error in GET /api/products/:id:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;