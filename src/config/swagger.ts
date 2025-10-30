import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Darna Platform API',
      version: '1.0.0',
      description: 'API documentation for Darna Platform - Chat and Enterprise Management System. Authentication is handled by external auth service at http://localhost:3001',
      contact: {
        name: 'API Support',
        email: 'support@darna.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Darna Platform - Chat & Enterprise Management'
      },
      {
        url: 'http://localhost:3001',
        description: 'Authentication Service - SSO & User Management'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone_number: { type: 'string' },
            role: { type: 'string', enum: ['particulier', 'admin', 'employé'] },
            googleId: { type: 'string' },
            displayName: { type: 'string' },
            picture: { type: 'string' },
            isActive: { type: 'boolean' },
            email_verified: { type: 'boolean' },
            last_login_at: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            senderID: { type: 'string' },
            receiverId: { type: 'string' },
            content: { type: 'string' },
            read: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            receiverId: { type: 'string' },
            senderId: { type: 'string' },
            read: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Entreprise: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            address: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/docs/*.ts']
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger documentation available at http://localhost:3000/api/docs');
};

export default specs;