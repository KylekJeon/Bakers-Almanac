import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import { createRecipe, updateRecipe } from '../../actions/index';

import RecipeShowPage from '../recipes/RecipeShowPage';

class InputRecipe extends Component {

  constructor(props){
    super(props);

    this.state = {
      submitMode: 'create',
      inputMode: 0,
      previewMode: false,
      selectedList: "ingredients",
      itemList: ["Ingredients", "Serve With", "Instructions", "Notes"],
      title: "",
      mainImage: "",
      topParagraph: "",
      calloutText: "",
      prepTime: "",
      totalTime: "",
      servesText: "",
      ingredients: [],
      serveWith: [],
      instructions: [],
      notes: [],
      videoURL: "",
      bottomParagraph: "",
      itemPlaceholder: ""
    }
  }

  componentDidMount() {
    if(this.props.selectedRecipe) {
      const selectedRecipe = this.props.selectedRecipe;
      const updatedState = {};

      for(var key in selectedRecipe) {
        if(!key.includes("_")){
          updatedState[key] = selectedRecipe[key]
        }
      }

      this.setState({
        ...updatedState,
        submitMode: "edit"
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  generateAddItemOptions = () => {
    const list = this.state.itemList.map((item, idx) => {
      return (
        <li
          className={`add-item-nav-item ${this.state.inputMode === idx ? "selected" : ""}`}
          key={idx}
          onClick={() => this.switchInputMode(idx)}
        >
          {item}
        </li>
      )
    });

    return (
      <ul className="flex-row-space-between add-item-nav-container">
        {list}
      </ul>
    )
  }

  switchInputMode = (idx) => {
    const selectedList = this.convertItemName(this.state.itemList[idx]);

    this.setState({
      inputMode: idx,
      selectedList
    })
  }

  generateList = (listName) => {
    const list = this.state[this.state.selectedList].map((item, idx) => {
      return (
        <li 
          className="recipe-list-item"
          key={idx}
          onClick={() => this.removeListItem(idx)}
        >
          {idx + 1}. {item}
        </li>
      )
    });

    return (
      <ul className="recipe-list-container">
        {list}
      </ul>
    )
  }

  addListItem = () => {
    const newItemArray = this.state.itemPlaceholder.split("\n");
    const updatedList = this.state[this.state.selectedList].concat(newItemArray);

    this.setState({
      [this.state.selectedList]: updatedList,
      itemPlaceholder: ""
    })
  }

  removeListItem = (idx) => {
    const updatedList = this.state[this.state.selectedList]
    updatedList.splice(idx, 1);

    this.setState({
      [this.state.selectedList]: updatedList
    })
  }

  convertItemName = (name) => {
    return name.charAt(0).toLowerCase() + name.replace(/ /g, '').substring(1, name.length);
  }

  returnToList = () => {
    this.props.returnToList();
  }

  generateRecipeData = () => {
    const recipeData = {
      title: this.state.title,
      mainImage: this.state.mainImage,
      topParagraph: this.state.topParagraph,
      bottomParagraph: this.state.bottomParagraph,
      calloutText: this.state.calloutText,
      prepTime: this.state.prepTime,
      totalTime: this.state.totalTime,
      servesText: this.state.servesText,
      ingredients: this.state.ingredients,
      serveWith: this.state.serveWith,
      instructions: this.state.instructions,
      notes: this.state.notes,
      videoURL: this.state.videoURL
    }
    
    return recipeData;
  }

  submitRecipe = () => {
    const recipeData = this.generateRecipeData();
    
    if(this.state.submitMode === "create"){
      this.props.onCreateRecipe(recipeData);
    } else {
      this.state.onUpdateRecipe(recipeData);
    }
  }

  togglePreview = () => {
    this.setState(prevState => ({
      previewMode: !prevState.previewMode
    }))
  }

  render() {
    const addContentNavBar = this.generateAddItemOptions();
    const listContent = this.generateList(this.state.itemList[this.state.inputMode]);
    let returnButton = null;
    let pageHeader = "Create a new Recipe";

    if(this.props.selectedRecipe){
      returnButton = (
        <button
          className="button return-to-recipe-list-button"
          onClick={this.returnToList}
        >
          Return to List
        </button>
      )

      pageHeader = "Edit Recipe";
    }

    let pageContent = (
      <div className="create-recipe-container">
        <h2 className="header-two">{pageHeader}</h2>
        {returnButton}
        <button
          className="button preview-recipe-button"
          onClick={this.togglePreview}
        >
          Preview
        </button>
        <div className="flex-row-space-between mar-top-lg create-recipe-content-container">
          <form 
            className="create-recipe-form"
            onSubmit={this.onSubmit}
          >
            <h3 className="header-three mar-top-sm mar-bot-md">Recipe Content</h3>
            <TextFieldGroup
              placeholder="Title"
              name="title"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.title}
              onChange={this.onChange}
              // error={errors.title}
            />
            <TextFieldGroup
              placeholder="Main Image URL"
              name="mainImage"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.mainImage}
              onChange={this.onChange}
              // error={errors.mainImage}
            />
            <TextAreaFieldGroup
              placeholder="Top Paragraph"
              name="topParagraph"
              klassName="admin-page-area-input"
              containerKlassName="admin-page-area-input-container"
              value={this.state.topParagraph}
              onChange={this.onChange}
              // // error={errors.description}
            />
            <TextFieldGroup
              placeholder="Callout Text"
              name="calloutText"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.calloutText}
              onChange={this.onChange}
              // // error={errors.calloutText}
              />
            <TextFieldGroup
              placeholder="Prep Time"
              name="prepTime"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.prepTime}
              onChange={this.onChange}
              // // error={errors.prepTime}
              />
            <TextFieldGroup
              placeholder="Total Time"
              name="totalTime"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.totalTime}
              onChange={this.onChange}
              // // error={errors.totalTime}
            />
            <TextFieldGroup
              placeholder="Serves"
              name="servesText"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.servesText}
              onChange={this.onChange}
              // // error={errors.totalTime}
            />
            <TextFieldGroup
              placeholder="Video URL"
              name="videoURL"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.videoURL}
              onChange={this.onChange}
              // // error={errors.totalTime}
            />
            <TextAreaFieldGroup
              placeholder="Bottom Paragraph"
              name="bottomParagraph"
              klassName="admin-page-area-input"
              containerKlassName="admin-page-area-input-container"
              value={this.state.bottomParagraph}
              onChange={this.onChange}
              // // error={errors.description}
            />
            <input
              type="submit"
              value={this.state.submitMode === "create" ? "Submit" : "Edit"}
              className="button create-recipe-button"
              onClick={this.submitRecipe}
            />
          </form>
          <div className="create-recipe-list-generator">
            <h3 className="header-three recipe-content-header">Add List Items</h3>
            {addContentNavBar}
            <div className="list-generator-container">
              <TextAreaFieldGroup
                placeholder="Add Item"
                name="itemPlaceholder"
                klassName="admin-add-item-area-input"
                containerKlassName="admin-add-item-area-input-container"
                value={this.state.itemPlaceholder}
                onChange={this.onChange}
                // // error={errors.description}
              />
              <button
                className="button admin-add-item-button"
                onClick={this.addListItem}
              >
                Add Item
              </button>
              <div className="admin-list-section">
                <h4 className="header-four">
                  {this.state.itemList[this.state.inputMode]}
                </h4>
                {listContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    if(this.state.previewMode){
      pageContent = (
        <RecipeShowPage 
          selectedRecipe={this.generateRecipeData()} 
          togglePreview={this.togglePreview.bind(this)}
        />
      )
    }

    return (
      <div className="">
        {pageContent}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateRecipe: (recipeData) => dispatch(createRecipe(recipeData)),
  onUpdateRecipe: (recipeData) => dispatch(updateRecipe(recipeData))
})

export default connect(null, mapDispatchToProps)(InputRecipe);