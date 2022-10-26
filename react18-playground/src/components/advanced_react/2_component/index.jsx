import React from "react";

export class ClassComponentDemo extends React.Component {
  state = {
    num: 1,
  };
  constructor() {
    super();
    // this.handleClick = function () {
    //   this.setState({ num: this.state.num + 1 });
    // };
  }
  handleClick = () => this.setState({ num: this.state.num + 1 });

  render() {
    return (
      <div>
        <h1>{this.state.num}</h1>
        <button onClick={this.handleClick}>click me!</button>
      </div>
    );
  }
}
