import type { FC } from "react";
import { useState, useReducer } from "react";

const initialState = { count: 0 };

type Actions =
  | {
      type: "inc";
      payload: {
        count: number;
        max?: number;
      };
    }
  | {
      type: "dec";
      payload: {
        count: number;
        min?: number;
      };
    };

function reducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case "inc":
      return {
        count: action.payload.max
          ? Math.min(state.count + action.payload.count, action.payload.max)
          : state.count + action.payload.count,
      };
    case "dec":
      return {
        count: action.payload.min
          ? Math.min(state.count - action.payload.count, action.payload.min)
          : state.count - action.payload.count,
      };
    default:
      throw new Error("Unexpected Action Recieved.");
  }
}

const Counter: FC = () => {
  const [count, setCount] = useState<number>(1);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <button onClick={() => setCount(count - 1)}>decrement</button>
      <h1>reducer Count:{state.count}</h1>
      <button
        onClick={() =>
          dispatch({ type: "dec", payload: { count: 599, min: 0 } })
        }
      >
        -(min:0)
      </button>
      <button
        onClick={() =>
          dispatch({ type: "inc", payload: { count: 599, max: 599 } })
        }
      >
        +(max:599)
      </button>
    </div>
  );
};

export default Counter;
