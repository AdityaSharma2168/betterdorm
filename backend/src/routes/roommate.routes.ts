import express, { Router } from 'express';
import { getRoommateMatches, updateRoommatePreferences, getRoommatePreferences } from '../controllers/roommate.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

// All roommate routes are protected
router.use(authMiddleware);

// Get roommate matches for current user
router.get('/matches', getRoommateMatches);

// Get and update roommate preferences
router.get('/preferences', getRoommatePreferences);
router.put('/preferences', updateRoommatePreferences);

export default router; 