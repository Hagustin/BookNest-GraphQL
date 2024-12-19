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

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  await db;

  // CORS Middleware
  app.use(cors({
    origin: 'http://localhost:3000',  // Adjust to your frontend origin
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
