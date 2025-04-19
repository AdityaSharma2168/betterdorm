import OpenAI from 'openai';
import config from '../../config';

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

/**
 * Interface for dorm search criteria extracted from a natural language query
 */
interface DormSearchCriteria {
  university?: string;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  amenities?: string[];
  tags?: string[];
  keywords?: string[];
}

/**
 * Parse a natural language query to extract structured search criteria
 * @param query - The user's natural language query, e.g. "I want a quiet dorm near the library under $800"
 */
export const extractSearchCriteria = async (query: string): Promise<DormSearchCriteria> => {
  try {
    // Define the system prompt
    const systemPrompt = `
      You are a helpful assistant that extracts dorm search criteria from a user's query.
      Extract structured data in JSON format with the following fields (if mentioned):
      - university: The university name or campus
      - location: Specific location mentioned (e.g., "near science library")
      - maxPrice: Maximum price (number only, no currency symbol)
      - minBedrooms: Minimum number of bedrooms
      - minBathrooms: Minimum number of bathrooms
      - amenities: Array of amenities mentioned (e.g., "wifi", "pool", "gym")
      - tags: Array of descriptive tags (e.g., "quiet", "social", "spacious")
      - keywords: Any other important keywords for the search
      
      Only include fields that are explicitly mentioned or strongly implied in the query.
      Return just the JSON object with no additional text.
    `;

    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      temperature: 0.1, // Low temperature for more deterministic results
    });

    // Parse the response
    const content = response.choices[0]?.message?.content || '{}';
    let criteria: DormSearchCriteria;
    
    try {
      // Attempt to parse the JSON response
      criteria = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response as JSON:', parseError);
      // If parsing fails, try to extract a JSON object if it exists in the text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          criteria = JSON.parse(jsonMatch[0]);
        } catch {
          criteria = {}; // Fallback to empty object if all parsing fails
        }
      } else {
        criteria = {};
      }
    }

    return criteria;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to process natural language query');
  }
};

/**
 * Generate a conversational response based on dorm search results
 * @param query - The user's original query
 * @param results - The dorm search results
 */
export const generateSearchResponse = async (
  query: string,
  results: any[]
): Promise<string> => {
  try {
    const resultsJson = JSON.stringify(results.map(r => ({
      name: r.name,
      price: r.price,
      bedrooms: r.bedrooms,
      bathrooms: r.bathrooms,
      university: r.university,
      amenities: r.amenities,
      tags: r.tags,
    })));

    // Define the system prompt
    const systemPrompt = `
      You are a helpful dormitory search assistant. You provide friendly, conversational responses
      about dorm options based on search results.
      
      When describing search results:
      - Summarize the key findings (how many matches, price range, etc.)
      - Highlight a few promising options
      - If there are no results that match all criteria, suggest slight modifications to the search
      - Be conversational but concise
      
      Keep responses under 150 words and focus on the most relevant details.
    `;

    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `User query: "${query}"\n\nSearch results: ${resultsJson}` }
      ],
      temperature: 0.7, // Higher temperature for more natural variation
    });

    return response.choices[0]?.message?.content || 'Sorry, I couldn\'t process the search results.';
  } catch (error) {
    console.error('Error generating search response:', error);
    throw new Error('Failed to generate search response');
  }
};

/**
 * Handle a general chatbot conversation
 * @param message - The user's message
 * @param conversationHistory - Previous messages in the conversation (optional)
 */
export const chat = async (
  message: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<string> => {
  try {
    // Define the system prompt
    const systemPrompt = `
      You are DormHelper, a helpful assistant for college students looking for dormitory options.
      You can answer questions about:
      - Finding and comparing dorms
      - Roommate matching and compatibility
      - Campus living advice
      - Housing application processes
      
      If asked about specific dormitories or universities you don't have data for, 
      suggest using the search feature instead. Be friendly, helpful, and concise.
    `;

    // Prepare the messages array
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory,
      { role: 'user' as const, content: message }
    ];

    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'Sorry, I couldn\'t process your message.';
  } catch (error) {
    console.error('Error in chat function:', error);
    throw new Error('Failed to process chat message');
  }
};

export default {
  extractSearchCriteria,
  generateSearchResponse,
  chat,
}; 