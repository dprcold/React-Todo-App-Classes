import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './NewTaskForm.css';
import TimerTask from '../TimerTask/TimerTask';
import TaskList from '../TaskList/TaskList ';

export default class NewTaskForm extends Component {
  state = {
    task: '',
    taskItem: [],
    filter: 'All',
    minutes: 0,
    seconds: 0,
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
        minutes: this.state.minutes,
        seconds: this.state.seconds,
      };
      this.setState((prevState) => ({
        task: '',
        taskItem: [...prevState.taskItem, newTaskItem],
      }));
    }
  };

  componentDidUpdate(prevState) {
    if (JSON.stringify(prevState.taskItem) !== JSON.stringify(this.state.taskItem)) {
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
        <TimerTask
          onMinutesChange={(minutes) => this.setState({ minutes })}
          onSecondsChange={(seconds) => this.setState({ seconds })}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
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
