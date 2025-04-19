import express, { Router } from 'express';
import { getDorms, getDormById, createDorm, updateDorm, deleteDorm, getDormsNearLocation } from '../controllers/dorm.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Public routes
router.get('/', getDorms);
router.get('/:id', getDormById);
router.get('/near/:lat/:lng/:distance?', getDormsNearLocation);

// Protected routes
router.post('/', authMiddleware, createDorm);
router.put('/:id', authMiddleware, updateDorm);
router.delete('/:id', authMiddleware, deleteDorm);

export default router; 