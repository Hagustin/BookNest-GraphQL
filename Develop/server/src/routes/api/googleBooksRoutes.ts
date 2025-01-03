import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
const router = express.Router();

router.get('/test', (_req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Google Books API route is working!' });
});

router.get('/google-books', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  console.log('Received query parameter:', q); // Debug query parameter
  console.log('Google Books API Key:', apiKey); // Debug API key

  // Validate the query parameter
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    // Fetch data from the Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${apiKey}`
    );
    console.log('Google Books API response status:', response.status);

    if (!response.ok) {
      throw new Error(`Google Books API request failed with status ${response.status}`);
    }
    console.log('Google Books route hit with query:', q);
    const data = await response.json(); // Parse the JSON response
    console.log('Google Books API response data:', data)
    return res.json(data); // Send data to the frontend
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ error: 'Failed to fetch books from Google API' });
    
  }
  
});

export default router;
