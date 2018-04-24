import React, { Component } from 'react';

class Task extends Component {

  constructor(props, state) {
    super(props, state);
    this.state = {
      editStatus: false,
      isAdminPermission: this.props.isAdminPermission,
      id: this.props.task.id,
      username: this.props.task.username,
      email: this.props.task.email,
      text: this.props.task.text,
      status: !!this.props.task.status,
      image: this.props.task.image_path,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSaveChanges = this.onSaveChanges.bind(this);
  }

  toggleEditTask() {
    this.setState({
      editStatus: !this.state.editStatus,
      text: this.props.task.text,
      status: !!this.props.task.status,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSaveChanges(e) {
    e.preventDefault();

    const task = {
      id: this.state.id,
      text: this.state.text,
      status: this.state.status ? 10 : 0,
    }

    this.setState({
      editStatus: !this.state.editStatus,
    });

    this.props.onEditTask(task);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      editStatus: false,
      isAdminPermission: newProps.isAdminPermission,
      id: newProps.task.id,
      username: newProps.task.username,
      email: newProps.task.email,
      text: newProps.task.text,
      status: !!newProps.task.status,
      image: newProps.task.image_path,
    });
  }

  render() {

    const {
      editStatus,
      isAdminPermission,
      username,
      email,
      text,
      status,
      image,
    } = this.state;

    return (
      <div className="task">
        {!editStatus ?
          <div>
            <ul>
              <li>Username: {username}</li>
              <li>Email: {email}</li>
              <li>Text: {text}</li>
              <li>Status: {status ? 'Выполнено' : 'Не выполнено'}</li>
              <li>
                <img alt="" src={image} />
              </li>
              <li>
                {isAdminPermission &&
                  <button onClick={() => this.toggleEditTask()}>Редактировать</button>
                }
              </li>
            </ul>
          </div>
        :
          <form>
            <ul className='edited-task'>
              <li>Username: {username}</li>
              <li>Email: {email}</li>
              <li>
                <label>
                  Text:
                  <input
                    name="text"
                    type="text"
                    value={text}
                    onChange={this.handleInputChange}
                  />
                </label>
              </li>
              <li>
                <label>
                  Status: {status ? 'Выполнено' : 'Не выполнено'}
                  <input
                    name="status"
                    type="checkbox"
                    checked={status}
                    onChange={this.handleInputChange}
                  />
                </label>
              </li>
              <li>
                <img alt="" src={image} />
              </li>
              <li>
                <button onClick={() => this.toggleEditTask()}>Отменить</button>
                <button onClick={(e) => this.onSaveChanges(e)}>Применить</button>
              </li>
            </ul>
          </form>
        }
      </div>
    );
  }
}

export default Task;
