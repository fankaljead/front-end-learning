import React from "react";

function TextDemo({ number }) {
  console.log("子组件渲染");
  return <div>hello world {number}</div>;
}

const controlIsRender = (pre, next) => {
  return (
    pre.number === next.number ||
    (pre.number !== next.number && next.number > 5)
  );
};

const NewTextMemo = React.memo(TextDemo, controlIsRender);

export class ReactMemoDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      num: 1,
    };
  }
  render() {
    const { number, num } = this.state;
    return (
      <div>
        <div>
          改变 num: 当前值 {num}
          <button onClick={() => this.setState({ num: num + 1 })}>num++</button>
          <button onClick={() => this.setState({ num: num - 1 })}>num--</button>
        </div>
        <div>
          改变 number: 当前值 {number}
          <button onClick={() => this.setState({ number: number + 1 })}>
            number++
          </button>
          <button onClick={() => this.setState({ number: number - 1 })}>
            number--
          </button>
        </div>
        <NewTextMemo number={number} num={num} />
      </div>
    );
  }
}
