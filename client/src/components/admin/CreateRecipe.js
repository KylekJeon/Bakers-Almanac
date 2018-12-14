import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import { createRecipe } from '../../actions/index';

class CreateRecipe extends Component {

  constructor(props){
    super(props);

    this.state = {
      inputMode: 0,
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

  submitRecipe = () => {
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

    this.props.onCreateRecipe(recipeData);
  }
  

  render() {
    const addContentNavBar = this.generateAddItemOptions();
    const listContent = this.generateList(this.state.itemList[this.state.inputMode]);

    return (
      <div className="create-recipe-container">
        <h2 className="header-two">Create a new Recipe</h2>
        <div className="flex-row-space-between mar-top-lg create-recipe-content-container">
          <form 
            className="create-recipe-form"
            onSubmit={this.onSubmit}
          >
            <h3 className="header-three recipe-content-header">Recipe Content</h3>
            <TextFieldGroup
              placeholder="Title"
              name="title"
              klassName="create-recipe-input"
              containerKlassName="create-recipe-input-container"
              value={this.state.title}
              onChange={this.onChange}
              // error={errors.title}
            />
            <TextFieldGroup
              placeholder="Main Image URL"
              name="mainImage"
              klassName="create-recipe-input"
              containerKlassName="create-recipe-input-container"
              value={this.state.mainImage}
              onChange={this.onChange}
              // error={errors.mainImage}
            />
            <TextAreaFieldGroup
              placeholder="Top Paragraph"
              name="topParagraph"
              klassName="create-recipe-area-input"
              containerKlassName="create-recipe-area-input-container"
              value={this.state.topParagraph}
              onChange={this.onChange}
              // // error={errors.description}
            />
            <TextFieldGroup
              placeholder="Callout Text"
              name="calloutText"
              klassName="create-recipe-input"
              containerKlassName="create-recipe-input-container"
              value={this.state.calloutText}
              onChange={this.onChange}
              // // error={errors.calloutText}
              />
            <TextFieldGroup
              placeholder="Prep Time"
              name="prepTime"
              klassName="create-recipe-input"
              containerKlassName="create-recipe-input-container"
              value={this.state.prepTime}
              onChange={this.onChange}
              // // error={errors.prepTime}
              />
            <TextFieldGroup
              placeholder="Total Time"
              name="totalTime"
              klassName="create-recipe-input"
              containerKlassName="create-recipe-input-container"
              value={this.state.totalTime}
              onChange={this.onChange}
              // // error={errors.totalTime}
            />
            <TextFieldGroup
              placeholder="Serves"
              name="servesText"
              klassName="create-recipe-input"
              containerKlassName="create-recipe-input-container"
              value={this.state.servesText}
              onChange={this.onChange}
              // // error={errors.totalTime}
            />
            <TextAreaFieldGroup
              placeholder="Bottom Paragraph"
              name="bottomParagraph"
              klassName="create-recipe-area-input"
              containerKlassName="create-recipe-area-input-container"
              value={this.state.bottomParagraph}
              onChange={this.onChange}
              // // error={errors.description}
            />
            <input
              type="submit"
              value="Submit"
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
                klassName="recipe-add-item-area-input"
                containerKlassName="recipe-add-item-area-input-container"
                value={this.state.itemPlaceholder}
                onChange={this.onChange}
                // // error={errors.description}
              />
              <button
                className="button recipe-add-item-button"
                onClick={this.addListItem}
              >
                Add Item
              </button>
              <div className="recipe-list-section">
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
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateRecipe: (recipeData) => dispatch(createRecipe(recipeData))
})

export default connect(null, mapDispatchToProps)(CreateRecipe);