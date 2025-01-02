import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutation';
import { searchGoogleBooks } from '../utils/googleBooks';
import Auth from '../utils/auth';

function SearchBooks() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput) return;

    try {
      const data = await searchGoogleBooks(searchInput);
      const { items } = data; // data is already parsed as JSON
      const books = items.map((book: any) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author listed'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || 'No description available',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink || '#',
      }));
      setSearchResults(books);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (book: any) => {
    if (!Auth.loggedIn()) return;

    try {
      await saveBook({ variables: { bookData: book } });
      alert('Book saved!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for books"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-results">
        {searchResults.map((book) => (
          <div key={book.bookId} className="book-card">
            <h3>{book.title}</h3>
            <p>By: {book.authors.join(', ')}</p>
            <p>{book.description}</p>
            {book.image && <img src={book.image} alt={book.title} />}
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              View More
            </a>
            <button onClick={() => handleSaveBook(book)}>Save This Book!</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBooks;
