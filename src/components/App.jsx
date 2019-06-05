import React, { Component } from 'react';
import '../styles/App.css';

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
      <div className="App">
        <h1>Users</h1>
        {users.map(user => <div key={user.id}>{user.username}</div>)}
      </div>
    );
  }
}

export default App;
