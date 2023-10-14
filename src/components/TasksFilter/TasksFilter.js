import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';
class TasksFilter extends Component {
  state = {
    defaultStyle: 'All',
  };

  static defaultProps = {
    deleteCompletedTask: () => {},
  };
  static propTypes = {
    deleteCompletedTask: PropTypes.func,
  };

  buttons = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Completed' },
  ];

  handleButtonClick = (buttonName) => {
    this.setState({ defaultStyle: buttonName });
    this.props.setFilter(buttonName);
    this.props.filteredTasks();
  };

  render() {
    const { deleteCompletedTask } = this.props;

    return (
      <>
        <div className="filters">
          {this.buttons.map((button) => (
            <button
              key={button.id}
              className={this.state.defaultStyle === button.name ? 'selected' : null}
              onClick={() => this.handleButtonClick(button.name)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <button className="clear-completed" onClick={deleteCompletedTask}>
          Сlear completed
        </button>
      </>
    );
  }
}

export default TasksFilter;
