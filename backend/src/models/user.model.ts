import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface to define roommate preferences
export interface IRoommatePreference {
  sleepSchedule: 'early' | 'late' | 'varies';
  cleanliness: 'very_clean' | 'clean' | 'messy';
  studyHabits: 'quiet' | 'music' | 'group';
  isSmoker: boolean;
  hasPets: boolean;
  visitors: 'often' | 'sometimes' | 'rarely';
  bio?: string;
  interests?: string[];
  genderPreference?: 'male' | 'female' | 'no_preference';
}

// Interface to define a User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  firebaseUid?: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  profilePicture?: string;
  roommatePreferences?: IRoommatePreference;
  postedDorms: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password in query results by default
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    firebaseUid: {
      type: String,
      sparse: true,
    },
    university: {
      type: String,
    },
    major: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    roommatePreferences: {
      sleepSchedule: {
        type: String,
        enum: ['early', 'late', 'varies'],
      },
      cleanliness: {
        type: String,
        enum: ['very_clean', 'clean', 'messy'],
      },
      studyHabits: {
        type: String,
        enum: ['quiet', 'music', 'group'],
      },
      isSmoker: {
        type: Boolean,
        default: false,
      },
      hasPets: {
        type: Boolean,
        default: false,
      },
      visitors: {
        type: String,
        enum: ['often', 'sometimes', 'rarely'],
      },
      bio: {
        type: String,
      },
      interests: {
        type: [String],
      },
      genderPreference: {
        type: String,
        enum: ['male', 'female', 'no_preference'],
      },
    },
    postedDorms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dorm',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User; 