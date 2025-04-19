import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import * as jwtUtil from '../utils/jwt.util';

// Extend Express Request type to include the user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      decodedToken?: jwtUtil.JwtPayload;
    }
  }
}

/**
 * Authentication middleware to protect routes
 * Verifies the JWT token and attaches the user to the request
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return error
    if (!token) {
      res.status(401).json({ status: 'error', message: 'Not authorized to access this route' });
      return;
    }

    try {
      // Verify the token
      const decoded = jwtUtil.verifyToken(token);

      // Find the user by id
      const user = await User.findById(decoded.id);

      // If no user found
      if (!user) {
        res.status(401).json({ status: 'error', message: 'User not found' });
        return;
      }

      // Attach the user and decoded token to the request
      req.user = user;
      req.decodedToken = decoded;
      next();
    } catch (error) {
      res.status(401).json({ status: 'error', message: 'Invalid token' });
      return;
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

/**
 * Role-based access control middleware
 * Restricts access to routes based on user roles
 * @param roles - Array of roles allowed to access the route
 */
export const restrictTo = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if user and decoded token exist
    if (!req.user || !req.decodedToken) {
      res.status(401).json({ status: 'error', message: 'Not authorized to access this route' });
      return;
    }

    // Check if user role is allowed
    if (!roles.includes(req.decodedToken.role)) {
      res.status(403).json({ status: 'error', message: 'You do not have permission to perform this action' });
      return;
    }

    next();
  };
};

/**
 * Alternative auth middleware for Firebase
 * This would verify the Firebase ID token instead of our JWT
 * Uncomment and implement if using Firebase Auth
 */
/*
export const firebaseAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return error
    if (!token) {
      res.status(401).json({ status: 'error', message: 'Not authorized to access this route' });
      return;
    }

    // Verify the Firebase token
    // You would use the Firebase Admin SDK here
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // const uid = decodedToken.uid;

    // Find the user by Firebase UID
    // const user = await User.findOne({ firebaseUid: uid });

    // If no user found
    // if (!user) {
    //   res.status(401).json({ status: 'error', message: 'User not found' });
    //   return;
    // }

    // Attach the user to the request
    // req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
*/ 