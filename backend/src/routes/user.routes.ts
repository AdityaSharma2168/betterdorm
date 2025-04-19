import express, { Router } from 'express';
import { getUser, updateUser, deleteUser, getUserProfile } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// All user routes are protected
router.use(authMiddleware);

// Get current user profile
router.get('/me', getUserProfile);

// CRUD operations
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; 