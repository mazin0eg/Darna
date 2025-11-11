import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

export interface JwtPayload {
  userId: string;
  email: string;
  role: "particulier" | "admin" | "employé";
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
    issuer: "darna",
    audience: "darna-users",
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error(`Invalid token: ${error}`);
  }
};

export const verifyAuthServiceToken = async (token: string): Promise<any> => {
  try {
    const authServiceUrl = process.env.AUTH_SERVICE || 'http://localhost:3001/api/v1/auth';
    const response = await fetch(`${authServiceUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Auth service verification failed: ${error}`);
  }
};

export const extractTokenFromHeader = (
  authHeader: string | undefined
): string => {
  if (!authHeader) {
    throw new Error("En-tête d'autorisation manquant");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Format d'en-tête d'autorisation invalide");
  }

  return authHeader.substring(7);
};
