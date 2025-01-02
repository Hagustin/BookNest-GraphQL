import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import routes from './routes/index.js';

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
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://booknest-graphql.onrender.com' // Replace with actual URL
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

  // Static Assets Middleware for MIME Type Fix
  app.use(
    '/assets',
    express.static(path.join(process.cwd(), 'client/dist/assets'), {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
      },
    })
  );


  // Use Routes
  app.use(routes);

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
