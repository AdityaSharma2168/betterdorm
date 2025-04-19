import jwt, { SignOptions } from 'jsonwebtoken';
import { Request } from 'express';
import type { StringValue } from 'ms';
import config from '../config';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Generate a JWT token
 * @param payload - Data to encode in the token
 * @param expiresIn - Token expiration time (default from config)
 * @returns The signed JWT token
 */
export const generateToken = (
  payload: JwtPayload,
  expiresIn: StringValue | number = config.jwt.expiresIn as StringValue || '1d'
): string => {
  const secret = config.jwt.secret;
  
  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables');
  }
  
  const options: SignOptions = { expiresIn };
  
  return jwt.sign(payload, secret, options);
};

/**
 * Verify a JWT token
 * @param token - The token to verify
 * @returns The decoded token payload
 */
export const verifyToken = (token: string): JwtPayload => {
  const secret = config.jwt.secret;
  
  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables');
  }
  
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw error;
  }
};

export const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
}; 