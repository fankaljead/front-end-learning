import React from "react";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";

export function ReactRouterDemo() {
  return (
    <BrowserRouter>
      <main>
        <h2>Welcome to homepage!</h2>
        <p>You can do this, I believe in you.</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </main>
      <div>
        <h1>React Router Demo</h1>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}
function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
