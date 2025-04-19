import { Request, Response } from 'express';
import Dorm, { IDorm } from '../models/dorm.model';

/**
 * Get all dorms with pagination and filtering
 * @route GET /api/dorms
 */
export const getDorms = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Basic filtering
    const filter: any = {};
    
    // Price filtering
    if (req.query.minPrice) {
      filter.price = { $gte: parseInt(req.query.minPrice as string) };
    }
    if (req.query.maxPrice) {
      filter.price = { ...filter.price, $lte: parseInt(req.query.maxPrice as string) };
    }
    
    // University filtering
    if (req.query.university) {
      filter.university = req.query.university;
    }
    
    // Bedrooms and bathrooms filtering
    if (req.query.bedrooms) {
      filter.bedrooms = { $gte: parseInt(req.query.bedrooms as string) };
    }
    if (req.query.bathrooms) {
      filter.bathrooms = { $gte: parseInt(req.query.bathrooms as string) };
    }
    
    // Availability filtering
    if (req.query.isAvailable) {
      filter.isAvailable = req.query.isAvailable === 'true';
    }

    const dorms = await Dorm.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Dorm.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        dorms,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    console.error('Error in getDorms:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching dorms'
    });
  }
};

/**
 * Get a single dorm by ID
 * @route GET /api/dorms/:id
 */
export const getDormById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dorm = await Dorm.findById(req.params.id).populate('owner', 'name email');

    if (!dorm) {
      res.status(404).json({
        status: 'error',
        message: 'Dorm not found'
      });
      return;
    }

    // Increment view count
    dorm.views = (dorm.views || 0) + 1;
    await dorm.save();

    res.status(200).json({
      status: 'success',
      data: dorm
    });
  } catch (error) {
    console.error('Error in getDormById:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching dorm'
    });
  }
};

/**
 * Create a new dorm
 * @route POST /api/dorms
 */
export const createDorm = async (req: Request, res: Response): Promise<void> => {
  try {
    // Add the current user as the owner
    const newDorm = new Dorm({
      ...req.body,
      owner: req.user._id
    });

    const savedDorm = await newDorm.save();

    res.status(201).json({
      status: 'success',
      data: savedDorm
    });
  } catch (error) {
    console.error('Error in createDorm:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating dorm'
    });
  }
};

/**
 * Update a dorm
 * @route PUT /api/dorms/:id
 */
export const updateDorm = async (req: Request, res: Response): Promise<void> => {
  try {
    const dorm = await Dorm.findById(req.params.id);

    if (!dorm) {
      res.status(404).json({
        status: 'error',
        message: 'Dorm not found'
      });
      return;
    }

    // Check if user is the owner of the dorm
    if (dorm.owner.toString() !== req.user._id.toString()) {
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to update this dorm'
      });
      return;
    }

    const updatedDorm = await Dorm.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedDorm
    });
  } catch (error) {
    console.error('Error in updateDorm:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating dorm'
    });
  }
};

/**
 * Delete a dorm
 * @route DELETE /api/dorms/:id
 */
export const deleteDorm = async (req: Request, res: Response): Promise<void> => {
  try {
    const dorm = await Dorm.findById(req.params.id);

    if (!dorm) {
      res.status(404).json({
        status: 'error',
        message: 'Dorm not found'
      });
      return;
    }

    // Check if user is the owner of the dorm
    if (dorm.owner.toString() !== req.user._id.toString()) {
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to delete this dorm'
      });
      return;
    }

    await Dorm.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Dorm deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteDorm:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while deleting dorm'
    });
  }
};

/**
 * Get dorms near a specific location
 * @route GET /api/dorms/near/:lat/:lng/:distance?
 */
export const getDormsNearLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng } = req.params;
    const distance = req.params.distance || 10; // Default 10km radius

    // Convert distance to radians (divide by Earth's radius in km)
    const radius = parseFloat(distance as string) / 6378.1;

    const dorms = await Dorm.find({
      'location.coordinates': {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], radius]
        }
      }
    });

    res.status(200).json({
      status: 'success',
      results: dorms.length,
      data: dorms
    });
  } catch (error) {
    console.error('Error in getDormsNearLocation:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching nearby dorms'
    });
  }
}; 