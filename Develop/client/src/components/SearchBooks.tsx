import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutation';
import { searchGoogleBooks } from '../utils/googleBooks';
import Auth from '../utils/auth';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function SearchBooks() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [saveBook] = useMutation(SAVE_BOOK);
  const [error, setError] = useState<string | null>(null);

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    if (!searchInput) return;

    try {
      const data = await searchGoogleBooks(searchInput);
      const { items } = data;

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
      setError('Failed to fetch search results. Please try again.');
    }
  };

  const handleSaveBook = async (book: any) => {
    if (!Auth.loggedIn()) {
      alert('You must be logged in to save a book!');
      return;
    }

    try {
      await saveBook({ variables: { bookData: book } });
      alert('Book saved!');
    } catch (err) {
      console.error(err);
      setError('Failed to save the book. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Search for Books</h1>
      <Form onSubmit={handleSearchSubmit} className="mb-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="Enter a book title or author"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="mb-3"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {searchResults.map((book) => (
          <Col md={4} className="mb-4" key={book.bookId}>
            <Card>
              {book.image && <Card.Img variant="top" src={book.image} alt={book.title} />}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.authors.join(', ')}
                </Card.Subtitle>
                <Card.Text>{book.description}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleSaveBook(book)}
                  className="w-100"
                >
                  Save This Book
                </Button>
              </Card.Body>
              <Card.Footer>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link w-100"
                >
                  View on Google Books
                </a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchBooks;
