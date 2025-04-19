import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/user.model';
import * as jwtUtil from '../utils/jwt.util';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'Email is already registered'
      });
      return;
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    // TODO: Save verification token to user or separate collection
    // TODO: Send verification email

    // Generate authentication token
    const token = jwtUtil.generateToken({ 
      id: user._id.toString(), 
      email: user.email,
      role: 'user' 
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified
        },
        token
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during registration'
    });
  }
};

/**
 * Login a user
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
      return;
    }

    // Find user by email and include the password field for comparison
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
      return;
    }

    // Generate token
    const token = jwtUtil.generateToken({ 
      id: user._id.toString(), 
      email: user.email,
      role: 'user' 
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified
        },
        token
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during login'
    });
  }
};

/**
 * Verify email with token
 * @route GET /api/auth/verify-email/:token
 */
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    // TODO: Find user by verification token
    // TODO: Verify token validity and expiration
    // TODO: Update user isVerified status

    // Mock response for now
    res.status(200).json({
      status: 'success',
      message: 'Email verification functionality not yet implemented'
    });
  } catch (error) {
    console.error('Error in verifyEmail:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during email verification'
    });
  }
};

/**
 * Request password reset
 * @route POST /api/auth/forgot-password
 */
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, still return success even if email doesn't exist
      res.status(200).json({
        status: 'success',
        message: 'If your email is registered, you will receive a reset link shortly'
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    // TODO: Save reset token to user or separate collection with expiration
    // TODO: Send password reset email

    res.status(200).json({
      status: 'success',
      message: 'If your email is registered, you will receive a reset link shortly'
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during password reset request'
    });
  }
};

/**
 * Reset password with token
 * @route POST /api/auth/reset-password/:token
 */
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // TODO: Find user by reset token
    // TODO: Verify token validity and expiration
    // TODO: Update user password

    // Mock response for now
    res.status(200).json({
      status: 'success',
      message: 'Password reset functionality not yet implemented'
    });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during password reset'
    });
  }
}; 