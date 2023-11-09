import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './NewTaskForm.css';

import TaskList from '../TaskList/TaskList ';
export const FilterContext = React.createContext();
export default class NewTaskForm extends Component {
  state = {
    task: '',
    taskItem: [],
    filter: 'All',
  };

  componentDidMount() {
    const storedData = localStorage.getItem('taskItem');
    const taskItem = storedData ? JSON.parse(storedData) : [];
    this.setState({ taskItem });
  }

  inputChange = (event) => {
    const newTask = event.target.value;
    if ((event.key === 'Enter' || event.keyCode === 13) && this.state.task.trim() !== '') {
      const newTaskItem = {
        taskText: newTask,
        createdDate: new Date().toISOString(),
        completed: false,
        id: uuidv4(),
      };
      this.setState((prevState) => ({
        task: '',
        taskItem: [...prevState.taskItem, newTaskItem],
      }));
    }
  };

  componentDidUpdate(prevState) {
    if (this.state.taskItem !== prevState.taskItem) {
      localStorage.setItem('taskItem', JSON.stringify(this.state.taskItem));
    }
  }
  handleDeleted = (id) => {
    this.setState((prevState) => ({
      taskItem: prevState.taskItem.filter((task) => task.id !== id),
    }));
  };
  onUpdateText = (taskId, newTask) => {
    this.setState((prevState) => ({
      taskItem: prevState.taskItem.map((task) => {
        if (task.id === taskId) {
          return { ...task, taskText: newTask };
        }
        return task;
      }),
    }));
  };
  handleCheckboxChange = (taskId, completed) => {
    this.setState((prevState) => ({
      taskItem: prevState.taskItem.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed };
        }
        return task;
      }),
    }));
  };

  deleteCompletedTasks = () => {
    this.setState((prevState) => ({
      taskItem: prevState.taskItem.filter((task) => !task.completed),
    }));
  };

  filteredTasks = () => {
    if (this.state.filter === 'All') {
      return this.state.taskItem;
    }
    if (this.state.filter === 'Active') {
      return this.state.taskItem.filter((task) => !task.completed);
    }
    if (this.state.filter === 'Completed') {
      return this.state.taskItem.filter((task) => task.completed);
    }
  };
  setFilter = (filter) => {
    this.setState({ filter });
  };

  activeCounter = () => {
    return this.filteredTasks().filter((task) => !task.completed).length;
  };
  handleButtonClick = (buttonName) => {
    this.setState({ defaultStyle: buttonName });
    this.setFilter(buttonName);
    this.filteredTasks();
  };
  render() {
    const contextValue = {
      state: this.state,
      setFilter: this.setFilter,
      deleteCompletedTasks: this.deleteCompletedTasks,
      handleButtonClick: this.handleButtonClick,
    };
    return (
      <FilterContext.Provider value={contextValue}>
        <>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.task}
            onChange={(event) => this.setState({ task: event.target.value })}
            onKeyDown={this.inputChange}
          />
          <TaskList
            tasks={this.state.taskItem}
            onDeleted={this.handleDeleted}
            onEdited={this.onUpdateText}
            onCheckboxChange={this.handleCheckboxChange}
            setFilter={this.setFilter}
            filteredTasks={this.filteredTasks}
            activeCounterValue={this.activeCounter()}
          />
        </>
      </FilterContext.Provider>
    );
  }
}
