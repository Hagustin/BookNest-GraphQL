import express from 'express';
const router = express.Router();
import userRoutes from './user-routes.js';
import googleBooksRoutes from './googleBooksRoutes.js';

router.use('/users', userRoutes);
router.use('/google-books', googleBooksRoutes);

export default router;
