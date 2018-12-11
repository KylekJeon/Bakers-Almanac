import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/types';

const initialState = {
  recipes: null,
  selectedRecipe: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case FETCH_RECIPE:
      return {
        ...state,
        selecteRecipe: action.payload
      }
    default: 
      return state;
  }
}
