import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
