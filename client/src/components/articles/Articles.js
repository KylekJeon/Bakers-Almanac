import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Articles extends Component {
  render() {
    return (
      <div className="articles-container">
        <div>Articles Page</div>
      </div>
    )
  }
}

export default withRouter(Articles);

