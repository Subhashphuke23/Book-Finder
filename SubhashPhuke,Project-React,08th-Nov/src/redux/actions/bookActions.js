import axios from 'axios';

export const fetchBooks = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

      const books = response.data.items;

      dispatch({ type: 'FETCH_BOOKS', payload: books });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
};

export const addToFavorites = (book) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: book,
  };
};

export const removeFromFavorites = (bookId) => {
  return {
    type: 'REMOVE_FROM_FAVORITES',
    payload: bookId,
  };
};
