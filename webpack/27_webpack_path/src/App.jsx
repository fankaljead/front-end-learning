import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "前端 front 开发 heel",
    };
  }
  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
      </div>
    );
  }
}

export default App;
