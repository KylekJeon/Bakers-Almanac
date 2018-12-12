import React, { Component } from 'react'

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

export default class CreateRecipe extends Component {

  constructor(props){
    super(props);

    this.state = {
      inputMode: 0,
      title: null,
      mainImage: null,
      calloutText: null,
      prepTime: null,
      totalTime: null,
      servesText: null,
      ingredients: [],
      serveWith: [],
      instructions: [],
      notes: [],
      videoURL: null,
      published: null,
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

  render() {
              

    const ingredientsList = this.generateList("ingredients");
    const serveWithList = this.generateList("serveWith");
    const instructionsList = this.generateList("instructions");
    const notes = this.generateList("notes");

    return (
      <div className="create-recipe-container">
        <h2 className="header-two">Create a new Recipe</h2>
        <div className="flex-row-space-between mar-top-lg create-recipe-content-container">
          <form 
            className="create-recipe-form"
            onSubmit={this.onSubmit}
          >
            <TextFieldGroup
              placeholder="Title"
              name="title"
              klassName="create-recipe-input"
              containerKlassName = "create-recipe-input-container"
              value={this.state.title}
              onChange={this.onChange}
              // error={errors.title}
            />
            <TextFieldGroup
              placeholder="Main Image URL"
              name="mainImage"
              klassName="create-recipe-input"
              value={this.state.mainImage}
              onChange={this.onChange}
              // error={errors.mainImage}
            />
            <TextAreaFieldGroup
              placeholder="Top Paragraph"
              name="topParagraph"
              klassName="create-recipe-area-input"
              containerKlassName = "create-recipe-area-input-container"
              value={this.state.topParagraph}
              onChange={this.onChange}
              // // error={errors.description}
            />
            <TextFieldGroup
              placeholder="Callout Text"
              name="calloutText"
              klassName="create-recipe-input"
              value={this.state.calloutText}
              onChange={this.onChange}
              // // error={errors.calloutText}
              />
            <TextFieldGroup
              placeholder="Prep Time"
              name="prepTime"
              klassName="create-recipe-input"
              value={this.state.prepTime}
              onChange={this.onChange}
              // // error={errors.prepTime}
              />
            <TextFieldGroup
              placeholder="Total Time"
              name="totalTime"
              klassName="create-recipe-input"
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
              className="button"
            />
          </form>
          <div className="create-recipe-input-container">

          </div>
        </div>
      </div>
    )
  }
}
