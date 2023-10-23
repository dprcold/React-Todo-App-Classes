import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './NewTaskForm.css';

import TaskList from '../TaskList/TaskList ';

export default class NewTaskForm extends Component {
  state = {
    task: '',
    taskItem: localStorage.getItem('taskItem') ? JSON.parse(localStorage.getItem('taskItem')) : [],
    filter: 'All',
  };
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

  componentDidUpdate() {
    const data = JSON.parse(localStorage.getItem('taskItem') || []);
    if (JSON.stringify(data) !== JSON.stringify(this.state.taskItem)) {
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
  render() {
    return (
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
          deleteCompletedTask={this.deleteCompletedTasks}
          onCheckboxChange={this.handleCheckboxChange}
          setFilter={this.setFilter}
          filteredTasks={this.filteredTasks}
          activeCounterValue={this.activeCounter()}
        />
      </>
    );
  }
}
