import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import routes from './routes/index.js';
import { Request, Response, NextFunction } from 'express';

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const startApolloServer = async () => {
  await server.start();
  db;

  // CORS Middleware
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'production'
        ? 'https://booknest-graphql.onrender.com'
        : 'http://localhost:3000',
      credentials: true,
      allowedHeaders: ['Authorization', 'Content-Type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
  );

  // Express Middlewares
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apollo Middleware
  app.use(
    '/graphql',
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  // Static Assets Middleware
  app.use(express.static(path.join(process.cwd(), 'client/dist'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
    },
  }));

  // Use Routes
  app.use(routes);

  // Error Handling Middleware
  interface Error {
    message?: string;
  }

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error('Middleware error:', err.message || err);
      res.status(500).send({ error: 'Internal server error' });
    } else {
      next();
    }
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
