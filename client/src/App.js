import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    const test = () => {
      return (
        <div>asdasd</div>
        )
    }
    return (
      <Provider store = { store }>
        <Router>
            <div>
                <div className="container">
                  <Navbar />
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/article/:id" component={ test }/>
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;