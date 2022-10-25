import React, { Component } from "react";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "前端 front 开发 wheel",
    };
  }
  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <BrowserRouter>
          <Link to="/home">首页</Link>
          <Link to="/about">关于</Link>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
