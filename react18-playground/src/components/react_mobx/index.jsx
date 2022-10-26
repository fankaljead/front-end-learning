import React from "react";
import ReactDOM from "react-dom";
import { observer,computed,observable } from "mobx-react";

@observer
class TodoListView extends React.Component {
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {this.props.todoList.map((todo) => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onChange={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
      return this.todos.filter(todo => !todo.finished).length;
  }
}


const store = new To