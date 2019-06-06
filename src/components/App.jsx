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
import Admin from './admin.jsx';

class App extends Component {
  state = { users: [] }

  componentDidMount() {
    // TODO: Undo this for real server. Works with bwdmonkey/express-playground
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
    this.setState({
      users: [{
        id: 1,
        username: 'tom',
      }, {
        id: 2,
        username: 'yongxin',
      }, {
        id: 3,
        username: 'manan',
      }, {
        id: 4,
        username: 'peter',
      }],
    });
  }

  render() {
    const { users } = this.state;
    return (
      // <div className="App">
      //   <h1>Users</h1>
      //   {users.map(user => <div key={user.id}>{user.username}</div>)}
      // </div>
      <Router>
        <div classname="App">
          <div id="wrapper">
            <Header />
              <Route exact path='/' component={HomePage} />
              <Route exact path='/articles' component={Articles} />
              <Route exact path='/write' component={Write} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/user' component={User} />
              <Route exact path='/analytics' component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
