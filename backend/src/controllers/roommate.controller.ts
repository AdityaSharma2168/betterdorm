import { Request, Response } from 'express';
import User, { IRoommatePreference } from '../models/user.model';

/**
 * Get the current user's roommate preferences
 * @route GET /api/roommates/preferences
 */
export const getRoommatePreferences = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('roommatePreferences');

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: user.roommatePreferences || {}
    });
  } catch (error) {
    console.error('Error in getRoommatePreferences:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching roommate preferences'
    });
  }
};

/**
 * Update the current user's roommate preferences
 * @route PUT /api/roommates/preferences
 */
export const updateRoommatePreferences = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate the preferences
    const { 
      sleepSchedule,
      cleanliness,
      studyHabits,
      isSmoker,
      hasPets,
      visitors,
      bio,
      interests,
      genderPreference
    } = req.body;

    // Create preferences object with only provided fields
    const preferences: Partial<IRoommatePreference> = {};
    
    if (sleepSchedule) preferences.sleepSchedule = sleepSchedule;
    if (cleanliness) preferences.cleanliness = cleanliness;
    if (studyHabits) preferences.studyHabits = studyHabits;
    if (isSmoker !== undefined) preferences.isSmoker = isSmoker;
    if (hasPets !== undefined) preferences.hasPets = hasPets;
    if (visitors) preferences.visitors = visitors;
    if (bio) preferences.bio = bio;
    if (interests) preferences.interests = interests;
    if (genderPreference) preferences.genderPreference = genderPreference;

    // Update user's preferences
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { roommatePreferences: preferences } },
      { new: true, runValidators: true }
    ).select('roommatePreferences');

    if (!updatedUser) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: updatedUser.roommatePreferences
    });
  } catch (error) {
    console.error('Error in updateRoommatePreferences:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating roommate preferences'
    });
  }
};

/**
 * Get potential roommate matches based on preferences
 * @route GET /api/roommates/matches
 */
export const getRoommateMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get current user with preferences
    const currentUser = await User.findById(req.user._id).select('roommatePreferences');

    if (!currentUser) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    // If user hasn't set preferences yet
    if (!currentUser.roommatePreferences) {
      res.status(400).json({
        status: 'error',
        message: 'Please set your roommate preferences first'
      });
      return;
    }

    // Get potential matches (all users with preferences set except current user)
    const potentialMatches = await User.find({
      _id: { $ne: req.user._id },
      roommatePreferences: { $exists: true, $ne: null }
    }).select('name email profilePicture roommatePreferences');

    // Calculate compatibility score for each potential match
    const matches = potentialMatches.map(match => {
      const score = calculateCompatibilityScore(
        currentUser.roommatePreferences as IRoommatePreference,
        match.roommatePreferences as IRoommatePreference
      );

      return {
        user: {
          id: match._id,
          name: match.name,
          email: match.email,
          profilePicture: match.profilePicture
        },
        compatibilityScore: score,
        preferences: match.roommatePreferences
      };
    });

    // Sort by compatibility score (highest first)
    const sortedMatches = matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.status(200).json({
      status: 'success',
      data: sortedMatches
    });
  } catch (error) {
    console.error('Error in getRoommateMatches:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while finding roommate matches'
    });
  }
};

/**
 * Calculate compatibility score between two users' preferences
 * Higher score means better compatibility (max score depends on number of factors)
 */
const calculateCompatibilityScore = (
  userPrefs: IRoommatePreference,
  matchPrefs: IRoommatePreference
): number => {
  let score = 0;

  // Check sleep schedule compatibility
  if (userPrefs.sleepSchedule === matchPrefs.sleepSchedule) {
    score += 2; // Exact match
  } else if (
    (userPrefs.sleepSchedule === 'varies' || matchPrefs.sleepSchedule === 'varies')
  ) {
    score += 1; // Flexible match
  }

  // Check cleanliness compatibility
  if (userPrefs.cleanliness === matchPrefs.cleanliness) {
    score += 2;
  } else if (
    (userPrefs.cleanliness === 'clean' && matchPrefs.cleanliness === 'very_clean') ||
    (userPrefs.cleanliness === 'very_clean' && matchPrefs.cleanliness === 'clean')
  ) {
    score += 1; // Close match
  }

  // Check study habits compatibility
  if (userPrefs.studyHabits === matchPrefs.studyHabits) {
    score += 2;
  }

  // Check smoking preferences (critical factor)
  if (userPrefs.isSmoker === matchPrefs.isSmoker) {
    score += 3;
  } else {
    score -= 3; // Penalty for smoking mismatch
  }

  // Check pet preferences
  if (userPrefs.hasPets === matchPrefs.hasPets) {
    score += 2;
  }

  // Check visitor preferences
  if (userPrefs.visitors === matchPrefs.visitors) {
    score += 2;
  } else if (
    (userPrefs.visitors === 'sometimes' && matchPrefs.visitors === 'rarely') ||
    (userPrefs.visitors === 'rarely' && matchPrefs.visitors === 'sometimes')
  ) {
    score += 1; // Close match
  }

  // Check gender preferences if specified
  if (
    !userPrefs.genderPreference || 
    userPrefs.genderPreference === 'no_preference' || 
    !matchPrefs.genderPreference ||
    matchPrefs.genderPreference === 'no_preference'
  ) {
    // No penalty if either user has no preference
  } else if (userPrefs.genderPreference !== matchPrefs.genderPreference) {
    score -= 5; // Big penalty for gender preference mismatch
  }

  // Check interests (bonus points for shared interests)
  if (userPrefs.interests && matchPrefs.interests) {
    const sharedInterests = userPrefs.interests.filter(interest => 
      matchPrefs.interests?.includes(interest)
    );
    score += Math.min(sharedInterests.length, 3); // Max 3 points for shared interests
  }

  return score;
}; 