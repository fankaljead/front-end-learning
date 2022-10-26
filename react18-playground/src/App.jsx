// import { useState } from 'react'
// import logo from './logo.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hello Vite + React!</p>
//         <p>
//           <button type="button" onClick={() => setCount((count) => count + 1)}>
//             count is: {count}
//           </button>
//         </p>
//         <p>
//           Edit <code>App.jsx</code> and save to test HMR updates.
//         </p>
//         <p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//           {' | '}
//           <a
//             className="App-link"
//             href="https://vitejs.dev/guide/features.html"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Vite Docs
//           </a>
//         </p>
//       </header>
//     </div>
//   )
// }
import AnnotatorDemo from "./components/Annotator";
import ToastifyDemo from "./components/react_toastify";
import { ClassComponentDemo } from "./components/advanced_react/2_component";
import {
  StateClassComponent,
  FunctionState,
} from "./components/advanced_react/3_state";
import { RenderHajack } from "./components/advanced_react/9_hoc";
import {
  PureComponentDemo,
  PureComponentDemo2,
  PureComponentDemo5,
  StoreReactElementDemo,
} from "./components/advanced_react/10_render_control";
import { ReactMemoDemo } from "./components/advanced_react/10_render_control/react_memo_demo";
import {
  FunctionComponent,
  HooksDemo,
  HooksEffectDemo,
  ClassComponent,
  HooksDemo2,
} from "./components/advanced_react/17_hooks";
import { ReactRouterDemo } from "./components/advanced_react/18_react_router";
import {
  TransitionDemo,
  UseDeferedValueDemo,
  UseTransitionDemo,
} from "./components/advanced_react/31_transition";
import { FunctionLifeCycle, UseRefUpdate, UseUpdateDemo } from "./components/advanced_react/5_life_cycle";

export default function () {
  return (
    <div>
      {/* <ClassComponentDemo /> */}
      {/* <StateClassComponent /> */}
      {/* <FunctionState /> */}
      {/* <RenderHajack /> */}
      {/* <StoreReactElementDemo /> */}
      {/* <PureComponentDemo /> */}
      {/* <PureComponentDemo2 /> */}
      {/* <PureComponentDemo5 /> */}
      {/* <ReactMemoDemo /> */}
      {/* <HooksDemo /> */}
      {/* <HooksEffectDemo a={1} /> */}
      {/* <ClassComponent />
      <FunctionComponent /> */}
      {/* <HooksDemo2 /> */}
      {/* <ReactRouterDemo /> */}
      {/* <TransitionDemo /> */}
      {/* <UseTransitionDemo /> */}
      {/* <UseDeferedValueDemo /> */}
      {/* <FunctionLifeCycle />
      <UseRefUpdate /> */}
      <UseUpdateDemo />
    </div>
  );
}
