/**
 * Fetches books from your backend Google Books API.
 *
 * @param query - The search term to query the books.
 * @returns A promise that resolves to the JSON response from the backend.
 */
export const searchGoogleBooks = async (query: string) => {
  try {
    const response = await fetch(`/api/google-books?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Backend API request failed with status ${response.status}`);
    }
    return response.json(); // Resolves to the JSON data returned by your backend
  } catch (error) {
    console.error('Error fetching books from backend API:', error);
    throw error; // Rethrow for the calling function to handle
  }
};
