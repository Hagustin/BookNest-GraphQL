import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import your API routes
import apiRoutes from './api/index.js';

// Resolve paths for serving the frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '../../../client/dist');

// Use the API routes
router.use('/api', apiRoutes);

// Serve React frontend correctly (comes last!)
router.use('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

export default router;
