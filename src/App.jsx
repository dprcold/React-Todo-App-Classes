import React from 'react';

import './App.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';

class App extends React.Component {
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

export default App;
