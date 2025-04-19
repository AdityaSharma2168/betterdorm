import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  
  // MongoDB configuration
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://adityasharma2168:QE6mq47sjU8ZClkt@betterdorm.trg8qmw.mongodb.net/?retryWrites=true&w=majority&appName=betterdorm',
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  
  // AWS configuration
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucketName: process.env.S3_BUCKET_NAME || 'betterdorm-uploads',
    },
    ses: {
      emailFrom: process.env.SES_EMAIL_FROM || 'no-reply@betterdorm.com',
    },
  },
  
  // OpenAI configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  
  // Firebase configuration (if using Firebase Auth)
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
};

export default config; 