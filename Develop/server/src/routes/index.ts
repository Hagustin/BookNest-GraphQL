import type { Request, Response } from 'express';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import your API routes
import apiRoutes from './api/index.js';
const router = express.Router();

// Use the API routes
router.use('/api', apiRoutes);

// Resolve paths for serving the frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '../../../client/dist');

// Serve React frontend correctly (comes last!)
router.use((req: Request, res: Response, next) => {
  if (req.originalUrl.startsWith('/api')) {
    console.log('API route requested:', req.originalUrl);
    return next(); // Skip to the API route handler
  }
  console.log('Fallback route hit'); // Debug log for unmatched frontend routes
  res.sendFile(path.join(clientPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving React frontend:', err.message);
      res.status(500).send('Server error');
    }
  });
});

export default router;
