import React from "react";
import ReactDOM from "react-dom";

export class StateClassComponent extends React.Component {
  state = { number: 0 };
  handleClick = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      console.log("callback1", this.state.number);
    });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 }, () => {
      console.log("callback2", this.state.number);
    });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 }, () => {
      console.log("callback3", this.state.number);
    });
    console.log(this.state.number);
  };
  handleClick2 = () => {
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 }, () => {
        console.log("callback1", this.state.number);
      });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 }, () => {
        console.log("callback2", this.state.number);
      });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 }, () => {
        console.log("callback3", this.state.number);
      });
      console.log(this.state.number);
    });
  };
  handleClick3 = () => {
    setTimeout(() => {
      this.setState({ number: 1 });
    });
    this.setState({ number: 2 });
    this.setState({ number: 2.5 });
    ReactDOM.flushSync(() => {
      this.setState({ number: 3 });
    });
    this.setState({ number: 4 });
    this.setState({ number: 5 });
  };
  render() {
    console.log(this.state.number);
    return (
      <div>
        <h1>{this.state.number}</h1>
        <button onClick={this.handleClick}>number++</button>
        <button onClick={this.handleClick2}>异步number++</button>
        <button onClick={this.handleClick3}>flushsync number++</button>
      </div>
    );
  }
}

export function FunctionState() {
  const [number, setNumber] = React.useState(0);
  /* 监听 number 变化 */
  React.useEffect(() => {
    console.log("监听number变化，此时的number是:  " + number);
  }, [number]);

  const handerClick = () => {
    /** 高优先级更新 **/
    ReactDOM.flushSync(() => {
      setNumber(2);
    });
    /* 批量更新 */
    setNumber(1);
    /* 滞后更新 ，批量更新规则被打破 */
    setTimeout(() => {
      setNumber(3);
    });
  };
  const handleClick2 = ()=>{
    ReactDOM.flushSync(()=>{
        setNumber(2)
        console.log(number)
    })
    setNumber(1)
    console.log(number)
    setTimeout(()=>{
        setNumber(3)
        console.log(number)
    })
}
  console.log(number);
  return (
    <div>
      <span> {number}</span>
      <button onClick={handerClick}>number++</button>
      <button onClick={handleClick2}>flushsync number++</button>
    </div>
  );
}
