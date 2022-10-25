import { useAtom, atom } from "jotai";

const countAtom = atom(0);

function App() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="App">
      <h1>Hello World {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>one up</button>
    </div>
  );
}

export default App;
