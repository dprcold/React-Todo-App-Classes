import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';
export default class Footer extends Component {
  render() {
    const { tasks, count, deleteCompletedTask, setFilter, filteredTasks, activeCounterValue } = this.props;
    return (
      <footer className="footer">
        {!activeCounterValue ? (
          <span className="todo-count">0 items left</span>
        ) : (
          <span className="todo-count">{count} items left</span>
        )}
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
Footer.defaultProps = {
  tasks: [],
  count: 0,
  deleteCompletedTask: [],
  setFilter: 'All',
  filteredTasks: 'All',
};

Footer.propTypes = {
  tasks: PropTypes.array,
  count: PropTypes.number,
  deleteCompletedTask: PropTypes.func,
  setFilter: PropTypes.func,
  filteredTasks: PropTypes.func,
};
