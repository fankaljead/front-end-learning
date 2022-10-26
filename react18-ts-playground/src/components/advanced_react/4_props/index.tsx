import React from "react";

function ChildrenComponent() {
  return (
    <div>
      <h1>Children Component</h1>
      <p>This is a children component</p>
    </div>
  );
}

export interface Props {
  children: [React.FunctionComponent, React.Component];
  mes: string;
  renderName: (name: string) => JSX.Element;
  say: () => void;
  Component: React.ComponentType<any>;
}

/* props 接受处理 */
class PropsComponent extends React.Component<Props> {
  componentDidMount() {
    console.log(this, "_this");
  }
  render() {
    const { children, mes, renderName, say, Component } = this.props;
    const renderFunction = children[0];
    const renderComponent = children[1];
    /* 对于子组件，不同的props是怎么被处理 */
    return (
      <div>
        {renderFunction()}
        {mes}
        {renderName()}
        {renderComponent}
        <Component />
        <button onClick={() => say()}> change content </button>
      </div>
    );
  }
}
/* props 定义绑定 */
class Index extends React.Component {
  state = {
    mes: "hello,React",
  };
  node = null;
  say = () => this.setState({ mes: "let us learn React!" });
  render() {
    return (
      <div>
        <PropsComponent
          mes={this.state.mes} // ① props 作为一个渲染数据源
          say={this.say} // ② props 作为一个回调函数 callback
          Component={ChidrenComponent} // ③ props 作为一个组件
          renderName={() => <div> my name is alien </div>} // ④ props 作为渲染函数
        >
          {() => <div>hello,world</div>} {/* ⑤render props */}
          <ChidrenComponent /> {/* ⑥render component */}
        </PropsComponent>
      </div>
    );
  }
}
