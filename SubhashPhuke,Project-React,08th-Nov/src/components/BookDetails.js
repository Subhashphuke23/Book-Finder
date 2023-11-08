import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../redux/actions/bookActions';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );
        setBookDetails(response.data.volumeInfo);
      } catch (error) {
        setError('Error fetching book details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(bookDetails));
  };

  return (
    <div className="book-details-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && bookDetails && (
        <div className="book-details">
          <h2>{bookDetails.title}</h2>
          <p>Authors: {bookDetails.authors?.join(', ') || 'N/A'}</p>
          <p>Publisher: {bookDetails.publisher || 'N/A'}</p>
          <p>Published Date: {bookDetails.publishedDate || 'N/A'}</p>
          <p>Page Count: {bookDetails.pageCount || 'N/A'}</p>
          <p>Categories: {bookDetails.categories?.join(', ') || 'N/A'}</p>
          <p>Description: {bookDetails.description || 'N/A'}</p>
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
