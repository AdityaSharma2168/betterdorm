import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

/**
 * Get user profile for the currently authenticated user
 * @route GET /api/users/me
 */
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // User is already attached to req by the auth middleware
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching user profile'
    });
  }
};

/**
 * Get a specific user by ID
 * @route GET /api/users/:id
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching user'
    });
  }
};

/**
 * Update a user
 * @route PUT /api/users/:id
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure user can only update their own profile (unless admin)
    if (req.user._id.toString() !== req.params.id) {
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to update this user'
      });
      return;
    }

    // Fields that are not allowed to be updated directly
    const disallowedFields = ['password', 'isVerified', 'firebaseUid'];
    for (const field of disallowedFields) {
      if (req.body[field]) {
        delete req.body[field];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating user'
    });
  }
};

/**
 * Delete a user
 * @route DELETE /api/users/:id
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure user can only delete their own account (unless admin)
    if (req.user._id.toString() !== req.params.id) {
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to delete this user'
      });
      return;
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    // TODO: Delete user's dorms and related data
    // TODO: Remove user references from other collections

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while deleting user'
    });
  }
}; 