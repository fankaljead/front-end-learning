import React from "react";

// 属性代理
export function HOC1(WrapComponent) {
  return class Advance extends React.Component {
    state = {
      name: "zxh",
    };
    render() {
      return <WrapComponent {...this.props} {...this.state} />;
    }
  };
}

// 反向继承
class Index extends React.Component {
  render() {
    return <div>hello world</div>;
  }
}
function HOC2(Component) {
  return class wrapComponent extends Component {};
}
export default HOC2(Index);

// 控制渲染
// 1. 渲染劫持
const HOC3 = (WrapComponent) => {
  return class Index extends WrapComponent {
    render() {
      return this.props.visible ? super.render() : <div>暂无数据</div>;
    }
  };
};

const C = HOC3(Index);
export function RenderHajack() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>toggle</button>
      <C visible={visible} />
    </div>
  );
}

// 修改渲染树
class Indexx extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>react</li>
          <li>vue</li>
          <li>Angular</li>
        </ul>
      </div>
    );
  }
}
function HOC4(Component) {
  return class Advance extends Component {
    render() {
      const element = super.render();
      const otherProps = {
        name: "alien",
      };
      /* 替换 Angular 元素节点 */
      const appendElement = React.createElement(
        "li",
        {},
        `hello ,world , my name  is ${otherProps.name}`
      );
      const newchild = React.Children.map(
        element.props.children.props.children,
        (child, index) => {
          if (index === 2) return appendElement;
          return child;
        }
      );
      return React.cloneElement(element, element.props, newchild);
    }
  };
}
