import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

class Footer extends Component {
  static defaultProps = {
    tasks: [],
    count: 0,
    deleteCompletedTask: [],
    setFilter: 'All',
    filteredTasks: 'All',
  };
  static propTypes = {
    tasks: PropTypes.array,
    count: PropTypes.number,
    deleteCompletedTask: PropTypes.func,
    setFilter: PropTypes.func,
    filteredTasks: PropTypes.func,
  };
  render() {
    const { tasks, count, deleteCompletedTask, setFilter, filteredTasks } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter
          tasks={tasks}
          deleteCompletedTask={deleteCompletedTask}
          setFilter={setFilter}
          filteredTasks={filteredTasks}
        />
      </footer>
    );
  }
}

export default Footer;
