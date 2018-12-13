import axios from 'axios';

import { FETCH_RECIPE, FETCH_RECIPES, GET_ERRORS, CLEAR_ERRORS } from './types';

// Get all recipes
export const fetchRecipes = () => dispatch => {
  axios.get('/api/recipes')
    .then(res => 
      dispatch({
        type: FETCH_RECIPES,
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
export const fetchSelectedRecipe = (id) => dispatch => {
  axios.get(`/api/recipes/${id}`)
    .then(res => 
      dispatch({
        type: FETCH_RECIPE,
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

// Create new recipe

export const createRecipe = recipeData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/recipes', recipeData)
    .then(res =>
      dispatch({
        type: FETCH_RECIPE,
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

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
