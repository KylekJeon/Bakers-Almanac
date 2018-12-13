import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Landing from './components/landing/Landing';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Articles from './components/articles/Articles';
import Recipes from './components/recipes/Recipes';

// Auth
import Login from './components/auth/Login';
import Admin from './components/admin/Admin';
import Register from './components/auth/Register';

import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="site-container">
              <Route exact path='/' component={ Landing } />
              <Route exact path='/login' component={ Login } />
              <Route exact path='/admin' component={ Admin } />
              <Switch>
                <Route path="/about" component={ About } />
                <Route path="/recipes" component={ Recipes } />
                <Route path="/articles" component={ Articles } />
                <Route path="/contact" component={ Contact } />
                <Route path="/register" component={ Register } />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
