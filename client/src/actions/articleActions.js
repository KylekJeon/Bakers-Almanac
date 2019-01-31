import axios from 'axios';
import { FETCH_ARTICLE, FETCH_ARTICLES, GET_ERRORS, CLEAR_ERRORS } from './types';

// Get all recipes
export const fetchArticles = () => dispatch => {
  axios.get('/api/articles')
    .then(res => 
      dispatch({
        type: FETCH_ARTICLES,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get one recipe
export const fetchSelectedArticle = (id) => dispatch => {
  axios.get(`/api/recipes/${id}`)
    .then(res => 
      dispatch({
        type: FETCH_ARTICLE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Create new article

export const createArticle = articleData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/articles', articleData)
    .then(res =>
      dispatch({
        type: FETCH_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateArticle = articleData => dispatch => {
  dispatch(clearErrors());
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
