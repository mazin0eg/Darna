import express from "express";

const authProxy = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth Proxy
 *   description: Proxy routes to external authentication service
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login via external auth service
 *     tags: [Auth Proxy]
 *     description: Proxies login request to external authentication service at http://localhost:3001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful - redirect to external auth service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 authServiceUrl:
 *                   type: string
 */
authProxy.all('/login', (req, res) => {
  const authServiceUrl = process.env.AUTH_SERVICE || 'http://localhost:3001/api/v1/auth';
  res.json({
    message: 'Please use the external authentication service',
    authServiceUrl: `${authServiceUrl}/login`,
    method: req.method,
    body: 'Forward your request to the above URL'
  });
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register via external auth service
 *     tags: [Auth Proxy]
 *     description: Proxies registration request to external authentication service
 *     responses:
 *       200:
 *         description: Registration info - redirect to external auth service
 */
authProxy.all('/register', (req, res) => {
  const authServiceUrl = process.env.AUTH_SERVICE || 'http://localhost:3001/api/v1/auth';
  res.json({
    message: 'Please use the external authentication service',
    authServiceUrl: `${authServiceUrl}/register`,
    googleOAuth: `${authServiceUrl}/google`,
    method: req.method
  });
});

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Google OAuth login
 *     tags: [Auth Proxy]
 *     description: Redirects to Google OAuth via external auth service
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
authProxy.get('/google', (req, res) => {
  const authServiceUrl = process.env.AUTH_SERVICE || 'http://localhost:3001/api/v1/auth';
  res.redirect(`${authServiceUrl}/google`);
});

export default authProxy;