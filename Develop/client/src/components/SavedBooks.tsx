import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutation';
import Auth from '../utils/auth';

function SavedBooks() {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId: string) => {
    if (!Auth.loggedIn()) return;

    try {
      await removeBook({ variables: { bookId } });
      alert('Book removed!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Viewing Saved Books</h1>
      {!userData.savedBooks?.length ? (
        <p>No saved books yet!</p>
      ) : (
        <div className="saved-books">
          {userData.savedBooks.map((book: any) => (
            <div key={book.bookId} className="book-card">
              <h3>{book.title}</h3>
              <p>By: {book.authors.join(', ')}</p>
              <p>{book.description}</p>
              {book.image && <img src={book.image} alt={book.title} />}
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                View More
              </a>
              <button onClick={() => handleDeleteBook(book.bookId)}>
                Remove This Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedBooks;
