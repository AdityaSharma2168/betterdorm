import mongoose, { Schema, Document } from 'mongoose';

// Interface for a photo or image
interface IPhoto {
  url: string;
  caption?: string;
}

// Interface for the location with GeoJSON support
interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Interface for a 3D tour model
interface IModel3D {
  url: string;
  type: 'gltf' | 'glb' | 'obj';
}

// Interface to define a Dorm document
export interface IDorm extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  location: ILocation;
  university: string;
  price: number;
  size: number; // in square feet
  bedrooms: number;
  bathrooms: number;
  availableFrom: Date;
  amenities: string[];
  photos: IPhoto[];
  model3D?: IModel3D;
  isAvailable: boolean;
  tags: string[]; // e.g., "quiet", "party", "study", etc.
  rating?: number;
  ratingCount?: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Dorm schema
const DormSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the dorm'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an owner'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
    university: {
      type: String,
      required: [true, 'Please provide the university name'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the monthly rental price'],
    },
    size: {
      type: Number,
      required: [true, 'Please provide the size in square feet'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide the number of bedrooms'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please provide the number of bathrooms'],
    },
    availableFrom: {
      type: Date,
      required: [true, 'Please provide the availability date'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    photos: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: {
          type: String,
        },
      },
    ],
    model3D: {
      url: {
        type: String,
      },
      type: {
        type: String,
        enum: ['gltf', 'glb', 'obj'],
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create a 2dsphere index for geospatial queries
DormSchema.index({ 'location.coordinates': '2dsphere' });

// Create indexes for common query fields
DormSchema.index({ price: 1 });
DormSchema.index({ university: 1 });
DormSchema.index({ isAvailable: 1 });
DormSchema.index({ bedrooms: 1 });
DormSchema.index({ bathrooms: 1 });

// Create and export the Dorm model
const Dorm = mongoose.model<IDorm>('Dorm', DormSchema);
export default Dorm; 