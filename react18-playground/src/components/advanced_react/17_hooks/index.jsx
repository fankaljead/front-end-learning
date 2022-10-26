import React, { useState, useMemo, useEffect, useRef } from "react";

export function HooksDemo() {
  const [number, setNumber] = React.useState(0);
  const [num, setNum] = React.useState(0);
  const dom = React.useRef(null);

  React.useEffect(() => {
    console.log(dom.current);
  });

  const handleClick = () => {
    setNumber(number + 1);
    setNumber(number + 2);
    setNumber(number + 3);
  };
  const handleClick2 = () => {
    setNumber((number) => number + 1);
    setNumber((number) => number + 2);
    setNumber((number) => number + 3);
  };

  return (
    <div ref={dom}>
      <button onClick={() => setNumber(number + 1)}>number: {number}</button>
      <button onClick={() => setNum(num + 1)}>num: {num}</button>
      <button onClick={() => handleClick()}>点击 {number}</button>
      <button onClick={() => handleClick2()}>点击函数 {number}</button>
    </div>
  );
}

export function HooksEffectDemo({ a }) {
  React.useEffect(() => {
    console.log("第一个 effect");
  }, [a]);
  React.useLayoutEffect(() => {
    console.log("第二个 effect");
  });
  React.useEffect(() => {
    console.log("第三个 effect");
  });

  return <div>{a}</div>;
}

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  handleClick = () => {
    for (let i = 0; i < 5; ++i) {
      setTimeout(() => {
        this.setState({ number: this.state.number + 1 });
        console.log("class num:", this.state.number);
      }, 1000);
    }
  };
  render() {
    return (
      <div>
        <h1>class number:{this.state.number}</h1>
        <button onClick={this.handleClick}>num++</button>
      </div>
    );
  }
}

export function FunctionComponent() {
  const [num, setNum] = React.useState(0);
  const handleClick = () => {
    for (let i = 0; i < 5; ++i) {
      setTimeout(() => {
        setNum(num + 1);
        console.log("function num:", num);
      }, 1000);
    }
  };
  return (
    <div>
      <h1>function num:{num}</h1>
      <button onClick={handleClick}>num++</button>
    </div>
  );
}

export function HooksDemo2() {
  const [number, setNumber] = useState(0);
  const divMemo = useMemo(() => <div>hello useMemo</div>, []);
  const curRef = useRef(null);
  useEffect(() => {
    console.log(curRef.current);
  }, []);

  return (
    <div ref={curRef}>
      <h1>hello world {number}</h1>
      <button onClick={() => setNumber(number + 1)}>number++</button>
    </div>
  );
}
