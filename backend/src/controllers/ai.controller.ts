import { Request, Response } from 'express';
import openAIService from '../services/ai/openai.service';
import Dorm from '../models/dorm.model';

/**
 * General chatbot interaction
 * @route POST /api/ai/chat
 */
export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      res.status(400).json({
        status: 'error',
        message: 'Message is required'
      });
      return;
    }

    // Call OpenAI service for chatbot response
    const response = await openAIService.chat(message, conversationHistory || []);

    res.status(200).json({
      status: 'success',
      data: {
        response,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in chatWithAI:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while processing chat request'
    });
  }
};

/**
 * Search for dorms using natural language
 * @route POST /api/ai/search-dorms
 */
export const searchDormsWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({
        status: 'error',
        message: 'Search query is required'
      });
      return;
    }

    // Extract search criteria from natural language query
    const searchCriteria = await openAIService.extractSearchCriteria(query);

    // Build MongoDB query from the extracted criteria
    const mongoQuery: any = {};

    if (searchCriteria.university) {
      mongoQuery.university = { $regex: searchCriteria.university, $options: 'i' };
    }

    if (searchCriteria.maxPrice) {
      mongoQuery.price = { $lte: searchCriteria.maxPrice };
    }

    if (searchCriteria.minBedrooms) {
      mongoQuery.bedrooms = { $gte: searchCriteria.minBedrooms };
    }

    if (searchCriteria.minBathrooms) {
      mongoQuery.bathrooms = { $gte: searchCriteria.minBathrooms };
    }

    // Handle amenities search
    if (searchCriteria.amenities && searchCriteria.amenities.length > 0) {
      mongoQuery.amenities = { $all: searchCriteria.amenities };
    }

    // Handle tags search
    if (searchCriteria.tags && searchCriteria.tags.length > 0) {
      mongoQuery.tags = { $in: searchCriteria.tags };
    }

    // Handle location search
    if (searchCriteria.coordinates) {
      // If coordinates are provided, search nearby dorms
      const { lat, lng } = searchCriteria.coordinates;
      const radius = 5 / 6378.1; // 5km radius in radians
      
      mongoQuery['location.coordinates'] = {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius]
        }
      };
    } else if (searchCriteria.location) {
      // If only text location is provided, try to match in the address field
      mongoQuery['location.address'] = { $regex: searchCriteria.location, $options: 'i' };
    }

    // Find dorms based on criteria
    const dorms = await Dorm.find(mongoQuery)
      .populate('owner', 'name')
      .limit(10); // Limit to 10 results for performance

    // Generate a conversational response
    const aiResponse = await openAIService.generateSearchResponse(query, dorms);

    res.status(200).json({
      status: 'success',
      data: {
        dorms,
        aiResponse,
        searchCriteria
      }
    });
  } catch (error) {
    console.error('Error in searchDormsWithAI:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while processing search request'
    });
  }
}; 