import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';
import Task from '../Task/Task ';
import Footer from '../Footer/Footer';
class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    onDeleted: () => {},
    onEdited: () => {},
  };
  static propTypes = {
    createdDate: PropTypes.string,
    children: PropTypes.string,
    onDeleted: PropTypes.func,
    id: PropTypes.string,
    onCheckboxChange: PropTypes.func,
  };
  countCalculate() {
    return this.props.tasks.reduce((count, task) => {
      if (!task.completed) {
        return count + 1;
      }
      return count;
    }, 0);
  }
  render() {
    const { tasks, onDeleted, onEdited, deleteCompletedTask, onCheckboxChange, filteredTasks, setFilter } = this.props;
    const count = this.countCalculate();
    return (
      <>
        <ul className="todo-list">
          {filteredTasks() !== undefined
            ? filteredTasks().map((task) => (
                <Task
                  completed={task.completed}
                  createdDate={task.createdDate}
                  key={task.id}
                  id={task.id}
                  onDeleted={onDeleted}
                  onEdited={onEdited}
                  onCheckboxChange={onCheckboxChange}
                >
                  {task.taskText}
                </Task>
              ))
            : null}
        </ul>
        <Footer
          tasks={tasks}
          count={count}
          deleteCompletedTask={deleteCompletedTask}
          setFilter={setFilter}
          filteredTasks={filteredTasks}
        />
      </>
    );
  }
}

export default TaskList;