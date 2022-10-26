import React, { useState } from "react";

function Children({ number }) {
  console.log("children render");
  return <h1>children number: {number}</h1>;
}

function Children2({ numberA, numberB }) {
  console.log("子组件渲染 numberA:", numberA);
  console.log("子组件渲染 numberB:", numberB);
  return <div>let us learn react {numberA}</div>;
}

export const StoreReactElementDemo = () => {
  const [numberA, setNumberA] = useState(0);
  const [numberB, setNumberB] = useState(0);

  return (
    <div>
      <Children number={numberA} />
      {/* {React.useMemo(
        () => (
          <Children number={numberA} />
        ),
        [numberA]
      )} */}
      {React.useMemo(
        () => (
          <Children2 numberA={numberA} numberB={numberB} />
        ),
        [numberA, numberB]
      )}
      <h1>numberA: {numberA}</h1>
      <h1>numberB: {numberB}</h1>
      <button onClick={() => setNumberA(numberA + 1)}>change numberA</button>
      <button onClick={() => setNumberB(numberB + 1)}>change numberB</button>
    </div>
  );
};

class Children3 extends React.PureComponent {
  state = {
    name: "zxh",
    age: 18,
    obj: {
      number: 1,
    },
  };
  changeObjNumber = () => {
    const { obj } = this.state;
    obj.number = obj.number + 1;
    this.setState({ obj: { ...obj } });
  };

  render() {
    console.log("component render");
    return (
      <div>
        <h1>组件本身改变 state</h1>
        <ul>
          <li onClick={() => this.setState({ name: "zxh" })}>
            <button>state 相同情况</button>
          </li>
          <li onClick={() => this.setState({ age: this.state.age + 1 })}>
            <button>state 不同情况</button>
          </li>
          <li onClick={this.changeObjNumber}>
            <button>state 为应用数据类型时候</button>
          </li>
        </ul>
      </div>
    );
  }
}

export function PureComponentDemo() {
  const [numberA, setNumberA] = useState(0);
  const [numberB, setNumberB] = useState(0);

  return (
    <div>
      <h1>父组件改变 props</h1>
      <ul>
        <li onClick={() => setNumberA(numberA + 1)}>
          <button>改变 numberA</button>
        </li>
        <li onClick={() => setNumberB(numberB + 1)}>
          <button>改变 numberB</button>
        </li>
      </ul>
      <Children3 numberA={numberA} numberB={numberB} />
    </div>
  );
}

class Children4 extends React.PureComponent {
  render() {
    console.log("子组件 PureComponent render");
    return <div>这是子组件 PureComponents: {this.props.numberA}</div>;
  }
}
const callback = () => {};
export class PureComponentDemo2 extends React.Component {
  state = {
    numberA: 1,
    numberB: 100,
  };
  render = () => (
    <div>
      <Children4
        callback={() => {
          console.log("箭头函数");
        }}
        numberA={this.state.numberA}
      />
      {/* <Children2 callback={callback} numberA={this.state.numberA} /> */}
      <button
        onClick={() => this.setState({ numberA: this.state.numberA + 1 })}
      >
        改变numberA
      </button>
      <button
        onClick={() => this.setState({ numberB: this.state.numberB + 1 })}
      >
        改变numberB
      </button>
    </div>
  );
}

class Children5 extends React.PureComponent {
  render() {
    console.log("子组件 PureComponent render");
    return <div>这是子组件 PureComponents: {this.props.numberA}</div>;
  }
}
export function PureComponentDemo5() {
  const callback = () => {};
  // const callback = React.useCallback(() => {}, []);
  const [numberA, setNumberA] = useState(0);
  const [numberB, setNumberB] = useState(0);
  return (
    <div>
      <h1>父组件改变 props</h1>
      <button onClick={() => setNumberA(numberA + 1)}>改变 numberA</button>
      <button onClick={() => setNumberB(numberB + 1)}>改变 numberB</button>
      {React.useMemo(
        () => (
          <Children5 number={numberA} callback={callback} numberA={numberA} />
        ),
        [numberA]
      )}
      {/* <Children5 number={numberA} callback={callback} numberA={numberA} /> */}
    </div>
  );
}
