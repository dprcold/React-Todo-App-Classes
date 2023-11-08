import React, { Component } from 'react';
import './TimerTask.css';

export default class TimerTask extends Component {
  state = {
    minutes: 0,
    seconds: 0,
  };

  handleMinutesChange = (event) => {
    let minutes = parseInt(event.target.value, 10);
    if (minutes < 0) {
      minutes = 0;
    } else if (minutes > 59) {
      minutes = 59;
    }
    this.props.onMinutesChange(minutes);
  };

  handleSecondsChange = (event) => {
    let seconds = parseInt(event.target.value, 10);
    if (seconds < 0) {
      seconds = 0;
    } else if (seconds > 59) {
      seconds = 59;
    }
    this.props.onSecondsChange(seconds);
  };

  render() {
    const { minutes, seconds } = this.props;
    const minutesValue = minutes === 0 ? '' : minutes;
    const secondsValue = seconds === 0 ? '' : seconds;
    return (
      <div className="timer-wrapper">
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus=""
          type="number"
          min={0}
          max={59}
          value={minutesValue}
          onChange={this.handleMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus=""
          type="number"
          min={0}
          max={59}
          value={secondsValue}
          onChange={this.handleSecondsChange}
        />
      </div>
    );
  }
}
