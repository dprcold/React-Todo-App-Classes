import React, { Component } from 'react';

import './App.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';

export default class App extends Component {
  render() {
    return (
      <>
        <h1 className="head">Todos</h1>
        <div className="wrapper">
          <NewTaskForm />
        </div>
      </>
    );
  }
}
