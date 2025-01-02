/**
 * Fetches books from the Google Books API based on a search query.
 *
 * @param query - The search term to query the Google Books API.
 * @returns A promise that resolves to the JSON response from the API.
 */
export const searchGoogleBooks = async (query: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
  
      if (!response.ok) {
        throw new Error(`Google Books API request failed with status ${response.status}`);
      }
  
      return response.json(); // Resolves to the JSON data
    } catch (error) {
      console.error('Error fetching books from Google Books API:', error);
      throw error; // Rethrow for the calling function to handle
    }
  };
  