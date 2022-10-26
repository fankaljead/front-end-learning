import React, { useState } from "react";

const mockDataArray = new Array(10000).fill(1);

function ShowText({ query }) {
  const text = "abcde";
  let children;
  if (text.indexOf(query) > 0) {
    const arr = text.split(query);
    children = (
      <div>
        {arr[0]}
        <span style={{ color: "pink" }}>{query}</span>
        {arr[1]}
      </div>
    );
  } else {
    children = <div>{text}</div>;
  }

  return <div>{children}</div>;
}

function List({ query }) {
  console.log("list 渲染");
  return (
    <div>
      {mockDataArray.map((item, index) => {
        return (
          <div key={index}>
            <ShowText query={query} />
          </div>
        );
      })}
    </div>
  );
}

const NewList = React.memo(List);

export function TransitionDemo() {
  const [value, setInputValue] = useState("");
  const [isTransition, setTransition] = useState(true);
  const [query, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (isTransition) {
      React.startTransition(() => {
        setSearchQuery(e.target.value);
      });
    } else {
      setSearchQuery(e.target.value);
    }
  };
  const handleSetTimeoutChange = (e) => {
    /* 高优先级任务 —— 改变搜索条件 */
    setInputValue(e.target.value);
    /* 把 setSearchQuery 通过延时器包裹  */
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 0);
  };

  const setSearchQueryDebounce = React.useMemo(() => {
    debounce((value) => {
      setSearchQuery(query);
    }, 1000);
  }, []);
  return (
    <div>
      <button onClick={() => setTransition(!isTransition)}>
        {isTransition ? "transition" : "normal"}
      </button>
      {/* <input /> */}
      <input
        type="text"
        placeholder="请输入搜索内容"
        value={value}
        onChange={handleSetTimeoutChange}
      />
      <NewList query={query} />
    </div>
  );
}

export function UseTransitionDemo() {
  const [value, setInputValue] = useState("");
  const [query, setSearchQuery] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const handleChange = (e) => {
    setInputValue(e.target.value);
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };
  return (
    <div>
      {isPending && <span>isTransition</span>}
      <input
        type="text"
        placeholder="请输入搜索内容"
        value={value}
        onChange={handleChange}
      />
      <NewList query={query} />
    </div>
  );
}

export function UseDeferedValueDemo() {
  const [value, setInputValue] = useState("");
  const query = React.useDeferredValue(value);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="请输入搜索内容"
        value={value}
        onChange={handleChange}
      />
      <NewList query={query} />
    </div>
  );
}
