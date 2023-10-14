import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './Task.css';

class Task extends React.Component {
  state = {
    checked: this.props.completed,
    isEditing: false,
    inputText: this.props.children,
  };

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
              <span className="created">created {date} ago</span>

              <input
                type="checkbox"
                className="toggle"
                checked={this.state.checked}
                onChange={() => {
                  this.setState({ checked: !this.state.checked });
                  onCheckboxChange(id, !this.state.checked);
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

export default Task;
