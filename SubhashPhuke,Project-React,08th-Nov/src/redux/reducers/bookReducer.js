// src/redux/reducers/bookReducer.js
const initialState = {
  searchResults: [],
  favorites: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS':
      return {
        ...state,
        searchResults: action.payload,
      };

    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter((book) => book.id !== action.payload),
      };

    default:
      return state;
  }
};

export default bookReducer;
