import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './Task.css';

export default class Task extends Component {
  state = {
    checked: this.props.completed,
    isEditing: false,
    inputText: this.props.children,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    isTimerRunning: false,
  };

  timerInterval = null;

  handleInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const { id, onEdited } = this.props;
      onEdited(id, this.state.inputText);
      this.setState({ isEditing: false });
    } else if (event.key === 'Escape' || event.keyCode === 27) {
      this.setState({ isEditing: false });
    }
  };

  handleClick = () => {
    this.setState({ checked: !this.state.checked });
  };

  formatNumber = (number) => {
    return number < 10 ? `0${number}` : number.toString();
  };

  updateLocalStorageForTask = (taskId, minutes, seconds) => {
    const taskDataInLocalStorage = JSON.parse(localStorage.getItem('taskItem')) || [];
    const taskToUpdate = taskDataInLocalStorage.find((task) => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.minutes = minutes;
      taskToUpdate.seconds = seconds;
      localStorage.setItem('taskItem', JSON.stringify(taskDataInLocalStorage));
    }
  };

  updateTimer = () => {
    const { minutes, seconds, isTimerRunning } = this.state;
    if (isTimerRunning) {
      if (minutes === 0 && seconds === 0) {
        this.stopTimer();
      } else {
        if (seconds === 0) {
          this.setState({ minutes: minutes - 1, seconds: 59 });
        } else {
          this.setState({ seconds: seconds - 1 });
        }
      }
    }
    this.updateLocalStorageForTask(this.props.id, this.state.minutes, this.state.seconds);
    this.timerInterval = setTimeout(this.updateTimer, 1000);
    console.log('tick');
  };

  startTimer = () => {
    this.setState({ isTimerRunning: true }, () => {
      this.timerInterval = setTimeout(this.updateTimer, 1000);
    });
  };

  stopTimer = () => {
    this.setState({ isTimerRunning: false }, () => {
      clearTimeout(this.timerInterval);
    });
  };
  componentWillUnmount() {
    clearTimeout(this.timerInterval);
  }

  render() {
    const { createdDate, children, onDeleted, id, onCheckboxChange } = this.props;
    const date = formatDistanceToNow(parseISO(createdDate), { locale: enUS });
    const taskTextClasses = ['description'];

    if (this.state.checked) {
      taskTextClasses.push('completed');
    }

    return (
      <li className={`task ${this.state.checked ? 'completed' : ''}`} onClick={this.handleClick}>
        <label>
          {this.state.isEditing ? (
            <input
              type="text"
              className="edit"
              value={this.state.inputText}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyPress}
            />
          ) : (
            <>
              <span className={taskTextClasses.join(' ')}>{children}</span>
              <div className="time-task-wrapper">
                <span>
                  {this.formatNumber(this.state.minutes)}:{this.formatNumber(this.state.seconds)}
                </span>
                <button
                  className="button-pause-timer"
                  onClick={(event) => {
                    if (this.state.isTimerRunning) {
                      this.stopTimer();
                    }
                    event.stopPropagation();
                  }}
                >
                  ⏸️
                </button>
                <button
                  className="button-start-timer"
                  onClick={(event) => {
                    if (!this.state.isTimerRunning) {
                      this.startTimer();
                    }
                    event.stopPropagation();
                  }}
                >
                  ▶️
                </button>
              </div>
              <span className="created">created {date} ago</span>

              <input
                type="checkbox"
                className="toggle"
                checked={this.state.checked}
                onChange={() => {
                  this.setState({ checked: !this.state.checked });
                  onCheckboxChange(id, !this.state.checked);
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />

              <button className="icon icon-edit" onClick={() => this.setState({ isEditing: true })} />
              <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
            </>
          )}
        </label>
      </li>
    );
  }
}

Task.defaultProps = {
  createdDate: new Date().toISOString(),
  children: '',
  onDeleted: () => {},
  id: Math.random(),
};

Task.propTypes = {
  createdDate: PropTypes.string,
  children: PropTypes.string,
  onDeleted: PropTypes.func,
  id: PropTypes.string,
  onCheckboxChange: PropTypes.func,
};
