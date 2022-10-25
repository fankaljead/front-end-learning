const React = "react";
declare namespace JSX {
  interface IntrinsicElements {
    foo: any;
    h1: any;
  }
}

function Test() {
  return (
    <>
      <h1>hello world</h1>
    </>
  );
}
