import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';
import { createStore, Dispatch } from 'redux';
import './App.css';
import logo from './logo.svg';

const ADD = 'ADD';
function addTodo(text: string) {
  return { type: ADD, text };
}
interface IState {
  todos: string[];
}
const initialState: IState = { todos: ['a', 'b', 'c'] };
function todoApp(state = initialState, action: { type: string } & Record<string, any>) {
  switch (action.type) {
    case ADD:
      return { todos: [...state.todos, action.text] };
    default:
      return state;
  }
}

export const store = createStore(todoApp);

class Todo extends React.Component<{ todo: string }> {
  public render() {
    return <li>{this.props.todo}</li>;
  }
}

const mapStateToProps: MapStateToProps<any, any, any> = state => state;
const mapDispatchToProps: MapDispatchToProps<any, any> = (dispach: Dispatch) => ({
  addTodo(text: string) {
    dispach(addTodo(text));
  },
});
const mergeProps: MergeProps<any, any, any, any> = (s, d, o) => ({ ...s, ...d, ...o });

export class TodoListBase extends React.Component<IState & { addTodo: (text: string) => void }> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ul>
          {this.props.todos.map((todo, i) => (
            <Todo key={i} todo={todo} />
          ))}
        </ul>
        <button onClick={this.handleOnClick}>add</button>
      </div>
    );
  }
  private handleOnClick = () => {
    console.log(this.props);
    console.log('aaa');
    this.props.addTodo('aaa');
  };
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TodoListBase);
