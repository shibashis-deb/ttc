import { Request, Response, NextFunction } from 'express';

// Placeholder for future auth middleware
export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Example middleware placeholder
 */
export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for future middleware functionality
  next();
};
