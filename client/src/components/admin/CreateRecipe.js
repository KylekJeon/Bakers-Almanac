import React, { Component } from 'react'

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

export default class CreateRecipe extends Component {

  constructor(props){
    super(props);

    this.state = {
      inputMode: 0,
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
      published: false,
      publishedDate: null,
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  generateList = (listName) => {
    const list = this.state[listName].map((item, idx) => {
      return (
        <li
          className="recipe-list-item"
          key={idx}
        >
          &#8226; {item}
        </li>
      )
    });

    return (
      <ul className="recipe-list-container">
        {list}
      </ul>
    )
  }

  generateAddItemOptions = () => {
    const items = ["Ingredients", "Serve With", "Instructions", "Notes"]
    const list = items.map((item, idx) => {
      return (
        <li
          className="add-item-nav-item"
          key={idx}
          onClick={() => this.switchInputMode(idx)}
        >
          {item}
        </li>
      )
    });

    return (
      <ul className="add-item-nav-container">
        {list}
      </ul>
    )
  }

  switchInputMode = (idx) => {
    this.setState({
      inputMode: idx
    })
  }

  render() {
              

    const ingredientsList = this.generateList("ingredients");
    const serveWithList = this.generateList("serveWith");
    const instructionsList = this.generateList("instructions");
    const notes = this.generateList("notes");

    const addContentNavBar = this.generateAddItemOptions();

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
            <TextAreaFieldGroup
              placeholder="Bottom Paragraph"
              name="bottomParagraph"
              klassName="create-recipe-area-input"
              containerKlassName="create-recipe-area-input-container"
              value={this.state.bottomParagraph}
              onChange={this.onChange}
              // // error={errors.description}
            />
            {ingredientsList}
            {serveWithList}
            {instructionsList}
            {notes}
            <input
              type="submit"
              value="Submit"
              className="button create-recipe-button"
            />
          </form>
          <div className="create-recipe-list-generator">
            <h3 className="header-three recipe-content-header">Add List Items</h3>
            {addContentNavBar}
          </div>
        </div>
      </div>
    )
  }
}
