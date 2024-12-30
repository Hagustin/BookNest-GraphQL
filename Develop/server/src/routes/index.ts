import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  try {
    const clientPath = path.join(__dirname, '../../client/dist');
    router.use(express.static(clientPath));

    router.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(clientPath, 'index.html'));
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error serving React frontend:', error.message);
    } else {
      console.error('Error serving React frontend:', error);
    }
  }
}

export default router;
