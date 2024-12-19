import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = ({ req }: { req: Request }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim();
  }

  if (!token) {
    console.warn('No token provided.');
    return req;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret';
    if (secretKey === 'default_secret') {
      console.error('JWT_SECRET_KEY is not set. Using a fallback key.');
    }

    const { data }: any = jwt.verify(token, secretKey, { maxAge: '2h' });
    console.log('Token Verified:', data); // Debugging
    req.user = data as JwtPayload;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Token validation failed:', err.message); // Detailed log
    } else {
      console.error('Token validation failed:', err); // Fallback log
    }
  }

  return req;
};


export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || 'default_secret';

  if (secretKey === 'default_secret') {
    console.error('JWT_SECRET_KEY is not set. Using a fallback key.');
  }

  try {
    const token = jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
    console.log('Generated Token:', token); // Debugging log
    return token;
  } catch (error) {
    console.error('Error generating token:', (error as Error).message);
    throw new Error('Failed to generate token');
  }
};


export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
