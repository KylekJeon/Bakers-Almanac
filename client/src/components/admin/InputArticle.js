import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import ArticleShowPage from '../articles/ArticleShowPage'

import { createArticle, updateArticle } from '../../actions/index';

class InputArticle extends Component {

  constructor(props){
    super(props);

    this.state = {
      submitMode: 'create',
      previewMode: false,
      title: "",
      date: null,
      contentPlaceholder: "",
      contentType: ["header", "image", "paragraph"],
      inputMode: 0,
      content: []
    }

    this.addContent = this.addContent.bind(this);
  }

  componentDidMount() {
    // if(this.props.selectedRecipe) {
    //   const selectedRecipe = this.props.selectedRecipe;
    //   const updatedState = {};

    //   for(var key in selectedRecipe) {
    //     if(!key.includes("_")){
    //       updatedState[key] = selectedRecipe[key]
    //     }
    //   }

    //   this.setState({
    //     ...updatedState,
    //     submitMode: "edit"
    //   })
    // }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  generateContentOptions = () => {
    const list = this.state.contentType.map((item, idx) => {
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
    this.setState({ inputMode: idx });
  }

  addContent = () => {
    debugger
  }

  generateArticleData = () => {
    const articleData = {
    }
    
    return articleData;
  }

  submitArticle = () => {
    const articleData = this.generateArticleData();
    
    if(this.state.submitMode === "create"){
      this.props.onCreateArticle(articleData);
    } else {
      this.state.onUpdateArticle(articleData);
    }
  }

  returnToList = () => {
    this.props.returnToList();
  }

  togglePreview = () => {
    this.setState(prevState => ({
      previewMode: !prevState.previewMode
    }))
  }

  

  render() {
    const addContentNavBar = this.generateContentOptions();
    const listContent = this.state.content;
    let returnButton = null;
    let pageHeader = "Write a new Article";

    if(this.props.selectedArticle){
      returnButton = (
        <button
          className="button return-to-article-list-button"
          onClick={this.returnToList}
        >
          Return to List
        </button>
      )

      pageHeader = "Edit Article";
    }

    let pageContent = (
      <div className="create-article-container">
        <h2 className="header-two">{pageHeader}</h2>
        <div className="create-article-content-container">
          <div className="create-article-form">
            <h3 className="header-three mar-top-sm mar-bot-md">Article Content</h3>
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
              placeholder="Date"
              name="date"
              klassName="admin-page-input"
              containerKlassName="admin-page-input-container"
              value={this.state.title}
              onChange={this.onChange}
              // error={errors.title}
            />
          </div>
          <div className="create-article-list-generator">
            <h3 className="header-three mar-top-sm mar-bot-md">Add Content</h3>
            {addContentNavBar}
            <div className="list-generator-container">
              <TextAreaFieldGroup
                placeholder="Add Item"
                name="contentPlaceholder"
                klassName="admin-add-item-area-input"
                containerKlassName="admin-add-item-area-input-container"
                value={this.state.contentsPlaceholder}
                onChange={this.onChange}
                // // error={errors.description}
              />
              <button
                className="button admin-add-item-button"
                onClick={this.addContent}
              >
                Add Item
              </button>
              <div className="admin-list-section">
                {listContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    if(this.state.previewMode){
      pageContent = (
        <ArticleShowPage 
          selectedRecipe={this.generateArticleData()} 
          togglePreview={this.togglePreview.bind(this)}
        />
      )
    }

    return (
      <div className="create-article-page-container">
        {pageContent}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateArticle: (articleData) => dispatch(createArticle(articleData)),
  onUpdateArticle: (articleData) => dispatch(updateArticle(articleData))
})

export default connect(null, mapDispatchToProps)(InputArticle);