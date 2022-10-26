import React, { useEffect, useLayoutEffect, useState, useRef } from "react";

export class ClassLifeCycle extends React.Component {
  constructor() {
    console.log("constructor");
  }
  static getDerivedStateFromProps(props, state) {}
  UNSAFE_componentWillMount() {}
  render() {
    console.log("render");
    return (
      <div>
        <h1>ClassLifeCycle</h1>
      </div>
    );
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {}
  componentWillUpdate(nextProps, nextState) {}
  getSnapshotBeforeUpdate(prevProps, prevState) {}
  componentDidUpdate(prevProps, prevState) {}
}

export function FunctionLifeCycle(props) {
  const ref = useRef(false);
  const [number, setNumber] = useState(0);
  console.log("FunctionLifeCycle");
  // useEffect(() => {
  //   console.log("useEffect componentDidMount 替代");
  // }, []);
  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect componentDidMount 替代");
  // }, []);

  // useEffect(() => {
  //   console.log("useEffect number componentDidMount 替代");
  // }, [number]);
  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect number componentDidMount 替代");
  // }, [number]);

  useEffect(() => {
    if (ref.current) {
      log("number update");
    } else {
      ref.current = true;
    }
  });
  return (
    <div>
      <h1>FunctionLifeCycle number: {number}</h1>
      <button onClick={() => setNumber(number + 1)}>increment</button>
    </div>
  );
}
const log = console.log;
export function UseRefUpdate() {
  const ref = useRef(0);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (ref.current === 2) {
      log("组件更新完成: componentDidUpdate");
    } else {
      ref.current++;
    }
  });

  return (
    <div>
      <h1>number: {number}</h1>
      <button onClick={() => setNumber(number + 1)}>increment</button>
    </div>
  );
}

const useUpdate = (fn) => {
  const ref = useRef(0);
  useEffect(() => {
    if (ref.current >= 1) {
      fn();
    }
    ref.current++;
  });
};

export function UseUpdateDemo() {
  const [number, setNumber] = useState(0);
  useUpdate(() => {
    log("UseUpdateDemo update");
  });
  return (
    <div>
      <h1>useUpdate number: {number}</h1>
      <button onClick={() => setNumber(number + 1)}>increment</button>
    </div>
  );
}
