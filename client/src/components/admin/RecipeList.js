import React, { Component } from 'react'
import { connect } from 'react-redux';

import { updateRecipe, fetchRecipes } from '../../actions/index';
import checkmark from '../../img/checkmark.png';
import xmark from '../../img/x-mark.png';

import EditRecipe from './EditRecipe';

class RecipeList extends Component {
  constructor(props){
    super(props);

    this.state = {
      listView: true
    }
  }
  
  componentDidMount(){
    this.props.onFetchRecipes();
  }

  generateRecipeList = (recipes) => {
    const list = recipes.map((recipe, idx) => {
      let mark, publishText = null

      if(recipe.published) {
        mark = <img src={checkmark} className="checkmark-img recipe-list-page-checkmark" alt="green-checkmark"/>;
        publishText = "Unpublish"
      } else {
        mark = <img src={xmark} className="checkmark-img recipe-list-page-checkmark" alt="red-x-mark"/>;
        publishText = "Publish"
      }

      return (
        <li className="flex-row-space-between recipe-list-page-item" key={idx}>
          <div className="recipe-list-page-item-text-container">
            <span className="recipe-list-page-item-title">Name: {recipe.title}</span>
            <span className="recipe-list-page-item-published">Published? {mark}</span>
          </div>
          <div className="recipe-list-page-item-button-container">
            <button
              className="button recipe-list-page-button"
              onClick={() => this.editChosenRecipe(idx)}
            >
              Edit
            </button>
            <button
              className="button recipe-list-page-button"
              onClick={() => this.toggleRecipePublish(idx)}
            >
              {publishText}
            </button>
          </div>
        </li>
      )
    })

    return (
      <ul className="recipe-list-page-list">
        {list}
      </ul>
    )
  }

  editChosenRecipe = (idx) => {

  }

  toggleRecipePublish = (idx) => {

  }
  
  render() {
    let pageContent = null;
    let recipeList = null;
    if(this.props.recipes.length){
      recipeList = this.generateRecipeList(this.props.recipes);
    }
  
    if(this.state.listView){
      pageContent = (
        <div>
          <h2 className="header-two">Recipes</h2>
          <div className="recipe-list-content-container">
            {recipeList}
          </div>
        </div>
      )
    } else {
      pageContent = <EditRecipe />
    }

    return (
      <div className="recipe-list-page-container">
        {pageContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes
})

const mapDispatchToProps = dispatch => ({
  onUpdateRecipe: (recipeData) => dispatch(updateRecipe(recipeData)),
  onFetchRecipes: () => dispatch(fetchRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);