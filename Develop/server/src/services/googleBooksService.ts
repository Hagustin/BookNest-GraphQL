import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Ensure you have `node-fetch` installed
dotenv.config();

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Fetches books from the Google Books API.
 * @param query - The search query string.
 * @returns The JSON response from the API.
 */
export const fetchBooksFromGoogle = async (query: string) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!apiKey) {
    throw new Error('Google Books API Key is not set in environment variables.');
  }

  const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Books API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    throw error;
  }
};
