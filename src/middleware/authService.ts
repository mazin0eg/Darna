import { Request, Response, NextFunction } from 'express';
import { extractTokenFromHeader, verifyAuthServiceToken } from '../utils/jwt';

export const authenticateWithAuthService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const user = await verifyAuthServiceToken(token);
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed',
      error: String(error)
    });
  }
};