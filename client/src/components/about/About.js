import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div>About Page</div>
      </div>
    )
  }
}

export default withRouter(About);

