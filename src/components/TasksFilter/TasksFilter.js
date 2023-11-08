import React, { Component } from 'react';

import { FilterContext } from '../NewTaskForm/NewTaskForm';
import './TasksFilter.css';
export default class TasksFilter extends Component {
  buttons = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Completed' },
  ];
  render() {
    return (
      <FilterContext.Consumer>
        {(context) => (
          <>
            <div className="filters">
              {this.buttons.map((button) => (
                <button
                  key={button.id}
                  className={context.state.filter === button.name ? 'selected' : null}
                  onClick={() => context.handleButtonClick(button.name)}
                >
                  {button.name}
                </button>
              ))}
            </div>
            <button className="clear-completed" onClick={context.deleteCompletedTasks}>
              Сlear completed
            </button>
          </>
        )}
      </FilterContext.Consumer>
    );
  }
}
