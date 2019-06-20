import React, { Component } from 'react';
import '../styles/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Header from './header.jsx';
import HomePage from './homepage.jsx';
import Articles from './articles.jsx';
import Write from './write.jsx';
import Register from './register.jsx';
import Login from './login.jsx';
import User from './user.jsx';
import Analytics from './analytics.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div id="wrapper">
            <Header />
              <Route exact path='/' component={HomePage} />
              <Route exact path='/articles' component={Articles} />
              <Route exact path='/write' component={Write} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/user' component={User} />
              <Route exact path='/analytics' component={Analytics} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
