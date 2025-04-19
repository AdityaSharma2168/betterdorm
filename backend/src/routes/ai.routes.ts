import express, { Router } from 'express';
import { chatWithAI, searchDormsWithAI } from '../controllers/ai.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Optional authentication - some AI features might be available to non-logged in users
router.post('/chat', chatWithAI);

// Protected AI routes
router.post('/search-dorms', authMiddleware, searchDormsWithAI);

export default router; 