import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
const router = express.Router();

// Middleware to log requests to this router
router.use((req, _res, next) => {
  console.log(`[GoogleBooksRoutes] Incoming request: ${req.method} ${req.path}`);
  next();
});


// Test route
router.get('/test', (_req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Google Books API route is working!' });
});

// Main Google Books API route
router.get('/google-books', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  console.log('Google Books API route hit:');
  console.log('Query parameter:', q);
  console.log('Google Books API Key:', apiKey);

  if (!q || typeof q !== 'string') {
    console.warn('Query parameter "q" is missing or invalid.');
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${apiKey}`
    );

    console.log('Google Books API response status:', response.status);

    if (!response.ok) {
      throw new Error(`Google Books API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Google Books API response data:', data);
    return res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching books from Google API:', error.message);
    } else {
      console.error('Error fetching books from Google API:', error);
    }
    return res.status(500).json({ error: 'Failed to fetch books from Google API' });
  }
});

export default router;
