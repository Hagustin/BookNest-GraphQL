import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import cors from 'cors';
import {
  ApolloServer,
} from '@apollo/server';
import {
  expressMiddleware
} from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientPath));

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  db;

  // CORS Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://booknest-graphql.onrender.com'  // Replace with actual Render frontend URL
      : 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }));
  

  // Express Middlewares
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apollo Middleware
  app.use('/graphql', expressMiddleware(server as any, {
    context: authenticateToken as any,
  }));

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Start the server
startApolloServer();
