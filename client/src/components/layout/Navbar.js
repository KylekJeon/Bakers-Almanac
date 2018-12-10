import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';

class Navbar extends Component {
  
  render() {

    // Hold code for possible user authentication funtionality down the line.

    // const { isAuthenticated, user } = this.props.auth;
    
    // const authLinks = (
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/dashboard">Dashboard</ Link>
    //     </li>
    //     <li className="nav-item">
    //       <button onClick={this.onLogoutClick.bind(this)} className="nav-link">
    //         <img 
    //           className="rounded-circle"
    //           src={user.avatar} 
    //           alt={user.name} 
    //           style={{ width: '25px', marginRight: '5px' }}
    //           title="You must have a Gravatar connected to your email to display an image"
    //         />
    //         Logout
    //       </button>
    //     </li>
    //   </ul>
    // )

    // const guestLinks = (
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/register">Sign Up</ Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/login">Login</ Link>
    //     </li>
    //   </ul>
    // )
    
    return (
      <div id="navbar-container">
        <nav id="navbar">
          <div className="logo-container">
            <NavLink className="navbar-brand" to="/">The Baker's Almanac</NavLink>
          </div>
            <ul className="nav-item-container">
              <li className="nav-item">
                <NavLink exact={true} activeClassName="active" className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/recipes">Recipes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/articles">Articles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/contact">Contact</NavLink>
              </li>
            </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar);
