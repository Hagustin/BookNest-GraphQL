import express from 'express';
const router = express.Router();
import userRoutes from './user-routes.js';
import googleBooksRoutes from './googleBooksRoutes.js';

router.use('/users', (req, _res, next) => {
    console.log('User route hit:', req.path);
    next();
  }, userRoutes);
  
  router.use('/google-books', (req, _res, next) => {
    console.log('Google Books route hit:', req.path);
    next();
  }, googleBooksRoutes);

export default router;
