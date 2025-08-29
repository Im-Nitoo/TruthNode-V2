import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '@shared/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

// Middleware for Express routes
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Access Denied: No Token Provided');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied: Invalid Token Format');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Token verification failed');
    
    // Cast the decoded token to TokenPayload
    const tokenPayload = decoded as TokenPayload;
    
    // Create a minimal User object from the token payload
    req.user = {
      id: parseInt(tokenPayload.userId),
      email: tokenPayload.email,
      role: tokenPayload.role as User['role'],
      username: '', // These fields will be populated by the storage layer
      password: '',
      name: '',
      ensAddress: null,
      bio: null,
      avatar: null,
      reputation: null,
      truthTokens: null,
      verifiedAt: null,
      createdAt: new Date()
    };
    
    next();
  });
};

// Function for direct token verification (used by WebSocket)
export const verifyTokenDirect = (token: string): Promise<TokenPayload | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        resolve(null);
        return;
      }
      resolve(decoded as TokenPayload);
    });
  });
};

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
} 