import AWS from 'aws-sdk';
import config from '../config';

// Configure AWS with credentials
AWS.config.update({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
});

// Create S3 service object
const s3 = new AWS.S3();

/**
 * Generate a presigned URL for direct client-to-S3 uploads
 * @param key - The S3 object key (file path and name)
 * @param contentType - The content type of the file
 * @param expiresIn - URL expiration time in seconds (default: 60 minutes)
 */
export const generateUploadUrl = async (
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> => {
  const params = {
    Bucket: config.aws.s3.bucketName,
    Key: key,
    ContentType: contentType,
    Expires: expiresIn,
  };

  try {
    // Generate a presigned URL for PUT operation
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate upload URL');
  }
};

/**
 * Generate a presigned URL for viewing a file (if access is restricted)
 * @param key - The S3 object key (file path and name)
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 */
export const generateViewUrl = async (key: string, expiresIn: number = 3600): Promise<string> => {
  const params = {
    Bucket: config.aws.s3.bucketName,
    Key: key,
    Expires: expiresIn,
  };

  try {
    // Generate a presigned URL for GET operation
    const viewUrl = await s3.getSignedUrlPromise('getObject', params);
    return viewUrl;
  } catch (error) {
    console.error('Error generating presigned view URL:', error);
    throw new Error('Failed to generate view URL');
  }
};

/**
 * Delete an object from S3
 * @param key - The S3 object key to delete
 */
export const deleteFile = async (key: string): Promise<void> => {
  const params = {
    Bucket: config.aws.s3.bucketName,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw new Error('Failed to delete file');
  }
};

/**
 * Check if an object exists in S3
 * @param key - The S3 object key to check
 */
export const fileExists = async (key: string): Promise<boolean> => {
  const params = {
    Bucket: config.aws.s3.bucketName,
    Key: key,
  };

  try {
    await s3.headObject(params).promise();
    return true;
  } catch (error) {
    if ((error as AWS.AWSError).code === 'NotFound') {
      return false;
    }
    throw error;
  }
};

/**
 * Get the public URL for an object (if bucket is configured for public access)
 * @param key - The S3 object key
 */
export const getPublicUrl = (key: string): string => {
  return `https://${config.aws.s3.bucketName}.s3.${config.aws.region}.amazonaws.com/${key}`;
};

export default {
  generateUploadUrl,
  generateViewUrl,
  deleteFile,
  fileExists,
  getPublicUrl,
}; 