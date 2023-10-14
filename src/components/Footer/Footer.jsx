import React from 'react';

import './Footer.css';

import TasksFilter from '../TasksFilter/TasksFilter';

class Footer extends React.Component {
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
