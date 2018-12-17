import React, { Component } from 'react';
import { connect } from 'react-redux';

class RecipeShowPage extends Component {
  
  componentDidMount(){
    debugger
  }

  render() {
    return (
      <div>
        Selected Recipe Page
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeShowPage);