import React from 'react';
import './TasksFilter.css';

class TasksFilter extends React.Component {
  state = {
    defaultStyle: 'All',
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
