import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';
export default class Footer extends Component {
  render() {
    const { tasks, count, setFilter, filteredTasks, activeCounterValue, deleteCompletedTask } = this.props;
    return (
      <footer className="footer">
        {!activeCounterValue ? (
          <span className="todo-count">0 items left</span>
        ) : (
          <span className="todo-count">{count} items left</span>
        )}
        <TasksFilter
          tasks={tasks}
          setFilter={setFilter}
          filteredTasks={filteredTasks}
          deleteCompletedTask={deleteCompletedTask}
        />
      </footer>
    );
  }
}
Footer.defaultProps = {
  tasks: [],
  count: 0,
  setFilter: 'All',
  filteredTasks: 'All',
};

Footer.propTypes = {
  tasks: PropTypes.array,
  count: PropTypes.number,
  setFilter: PropTypes.func,
  filteredTasks: PropTypes.func,
};
