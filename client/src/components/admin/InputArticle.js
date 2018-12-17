import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import { createArticle, updateArticle } from '../../actions/index';

class InputArticle extends Component {

  constructor(props){
    super(props);

    this.state = {
      submitMode: 'create',
      previewMode: false
    }
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
    const addContentNavBar = this.generateAddItemOptions();
    const listContent = this.generateList(this.state.itemList[this.state.inputMode]);
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
      <div className="create-recipe-container">
        <h2 className="header-two">{pageHeader}</h2>
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
      <div className="">
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