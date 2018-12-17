import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdminDashboard from './AdminDashboard';
import InputRecipe from './InputRecipe';
import CreateArticle from './CreateArticle';
import RecipeList from './RecipeList';
import ArticleList from './ArticleList';

import { logoutUser, createRecipe, fetchRecipes } from '../../actions/index';

class Admin extends Component {

  constructor(props){
    super(props);

    this.state = {
      pageType: [
        "Dashboard",
        "Create Recipe",
        "Create Article",
        "Recipe List",
        "Article List"
      ],
      pageIndex: 3
    }
  }
  
  componentWillMount() {
    if(!this.props.auth.isAuthenticated){
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }
  
  switchScreen = (idx) => {
    this.setState({
      pageIndex: idx
    })
  }

  logoutUser = () => {
    this.props.onLogoutUser();
  }

  generateNavbar = () => {
    const navContent = this.state.pageType.map((name, idx) => {
      let klassName = "admin-nav-list-item";
      if(this.state.pageIndex === idx){
        klassName = klassName + " selected";
      }

      return (
        <li
          className={klassName}
          key={idx}
          onClick={() => this.switchScreen(idx)}
        >
          {name}
        </li>
      )
    })

    return navContent;
  }

  render() {
    const navList = this.generateNavbar();
    let pageContent = null;

    switch(this.state.pageIndex){
      case 0:
        pageContent = <AdminDashboard />
        break;
      case 1:
        pageContent = <InputRecipe />
        break;
      case 2:
        pageContent = <InputARticle />
        break;
      case 3:
        pageContent = <RecipeList />
        break;
      case 4:
        pageContent = <ArticleList />
        break;
      default:
        break;
    }

    return (
      <div className="admin-container">
        {/* <button
          className="button admin-logout"
          onClick={this.logoutUser}
        >
          Log Out
        </button> */}
        <h1 className="header-one mar-top-md">Admin Console</h1>
        <nav className="flex-column-center admin-nav">
          <ul className="admin-nav-list flex-row-space-evenly">
            {navList}
          </ul>
        </nav>
        {pageContent}
      </div>
    )
  }
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipes: state.recipe.recipes
})

const mapDispatchToProps = dispatch => ({
  onLogoutUser: () => dispatch(logoutUser()),
  onCreateRecipe: (recipeData) => dispatch(createRecipe(recipeData)),
  onFetchRecipes: () => dispatch(fetchRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));