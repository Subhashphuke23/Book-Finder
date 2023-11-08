import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

       const apiKey = 'AIzaSyBZ5T3JGt_FYq1D9VGMc79wjt9P1szvZyg';
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;

    try {
      setLoading(true);
      setError('');

      const response = await axios.get(apiUrl);
      setBooks(response.data.items);
    } catch (error) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for books by title, author, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <Link to={`/book/${book.id}`} className="book-link">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || ''}
                alt={book.volumeInfo.title}
                className="book-thumbnail"
              />
              <div className="book-details">
                <h3>{book.volumeInfo.title}</h3>
                <p>Authors: {book.volumeInfo.authors?.join(', ') || 'N/A'}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToFavorites } from '../redux/actions/bookActions';  // Assuming you have this action set up
// import axios from 'axios';
// import './Home.css';

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     const apiKey = 'AIzaSyBZ5T3JGt_FYq1D9VGMc79wjt9P1szvZyg';  // Replace with your actual API key
//     const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;

//     try {
//       setLoading(true);
//       setError('');

//       const response = await axios.get(apiUrl);
//       setBooks(response.data.items);
//     } catch (error) {
//       setError('Error fetching data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToFavorites = (book) => {
//     dispatch(addToFavorites(book));
//   };

//   return (
//     <div>
//       <form className="search-bar" onSubmit={handleSearch}>
//         {/* ... your existing code ... */}
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="book-list">
//         {books.map((book) => (
//           <div key={book.id} className="book-item">
//             <Link to={`/book/${book.id}`} className="book-link">
//               {/* ... your existing code ... */}
//             </Link>
//             <button onClick={() => handleAddToFavorites(book)}>Add to Favorites</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
