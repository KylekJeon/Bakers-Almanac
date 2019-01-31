import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleShowPage extends Component {
  
  componentDidMount(){
    debugger
  }

  render() {
    return (
      <div>
        Selected Article Page
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleShowPage);