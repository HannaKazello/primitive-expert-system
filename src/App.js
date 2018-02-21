import React, { Component } from 'react';
import Expert from './Expert';
import User from './User';

class App extends Component {
  state = {
    isExpertMode: true,
    expertModeInfo: {},
  }
  changeMode = (isExpertMode) => {
    this.setState({ isExpertMode });
  }
  completeExpertMode = (info) => {
    this.setState({ expertModeInfo: info });
  }
  render() {
    return (
      <div className="App">
        <div>
        Change mode:
        <button onClick={() => this.changeMode(true)}>Expert</button>
        <button onClick={() => this.changeMode(false)}>User</button>
        </div>
        {this.state.isExpertMode
          ? <Expert completeExpertMode={this.completeExpertMode}/>
          : <User expertModeInfo={this.state.expertModeInfo}/>
        }
      </div>
    );
  }
}

export default App;
