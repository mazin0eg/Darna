import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { extractTokenFromHeader, verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user || !user.isActive) {
      return res.error("Utilisateur non trouvé ou désactivé", 401);
    }
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.error(
      "Token invalide",
      401,
      error instanceof Error ? error.message : null
    );
  }
};

export const is =
  (roles: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractTokenFromHeader(req.headers.authorization);
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user || !user.isActive) {
        return res.error("Utilisateur non trouvé ou désactivé", 401);
      }
      if (
        roles && !Array.isArray(roles)
          ? [roles].includes(decoded.role)
          : roles.includes(decoded.role)
      ) {
        req.user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        };
        next();
      } else {
        return res.error("Accès non autorisé pour ce rôle", 403);
      }
    } catch (error) {
      return res.error(
        "Token invalide",
        401,
        error instanceof Error ? error.message : null
      );
    }
  };
