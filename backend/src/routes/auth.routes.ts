import express, { Router } from 'express';
import { register, login, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controller';

const router: Router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router; 