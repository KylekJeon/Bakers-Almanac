import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Recipes extends Component {
  render() {
    return (
      <div className="recipes-container">
        <div>Recipes Page</div>
      </div>
    )
  }
}

export default withRouter(Recipes);
