import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser, createRecipe } from '../../actions/index';

class Admin extends Component {
  
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
  
  logoutUser = () => {
    this.props.onLogoutUser();
  }

  getUser = () => {
    this.props.onGetUser();
  }
  
  render() {
    return (
      <div className="admin-container">
        Admin Page
        <button
          className="button"
          onClick={this.logoutUser}
        >
          Log Out
        </button>
        <button
          className="button"
          onClick={this.getUser}
        >
          User
        </button>
      </div>
    )
  }
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  onLogoutUser: () => dispatch(logoutUser()),
  onCreateRecipe: (recipeData) => dispatch(createRecipe(recipeData))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));