import React, { Component } from 'react';
import Expert from './Expert';
import User from './User';

class App extends Component {
  state = {
    isExpertMode: true,
  }
  changeMode = (isExpertMode) => {
    this.setState({ isExpertMode });
  }
  render() {
    return (
      <div className="App">
        <div>
        Change mode:
        <button onClick={() => this.changeMode(true)}>Expert</button>
        <button onClick={() => this.changeMode(false)}>User</button>
        </div>
        {this.state.isExpertMode ? <Expert/> : <User/>}
      </div>
    );
  }
}

export default App;
