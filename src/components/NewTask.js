import React, { Component } from 'react';

class NewTask extends Component {

  constructor(props, state) {
    super(props, state);
    this.state = {
      username: '',
      email: '',
      text: '',
      image: '',
      imagePreview: '',
      isPreview: false,
      error: {
        status: false,
        message: '',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.togglePreviewMod = this.togglePreviewMod.bind(this);
    this.closeTaskAdded = this.closeTaskAdded.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onSaveTask = this.onSaveTask.bind(this);
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  togglePreviewMod() {
    this.setState({ isPreview: !this.state.isPreview });
  }

  closeTaskAdded() {
    this.setState({
      username: '',
      email: '',
      text: '',
      image: '',
      imagePreview: '',
      isPreview: false,
      error: {
        status: false,
        message: '',
      }
    });

    this.props.toggleAddNewTask();
  }

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {

        this.setState({ image: event.target.files[0] });

        let reader = new FileReader();
        reader.onload = (e, event) => {
          this.setState({
            imagePreview: e.target.result,
          });
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSaveTask(e) {
    e.preventDefault();

    if (
      this.state.username &&
      this.state.email &&
      this.state.text &&
      this.state.image
    ) {
      if (this.validateEmail(this.state.email)) {
        this.setState({
          error: {
            status: false,
            message: '',
          }
        });
        this.props.onSaveNewTask({
          username: this.state.username,
          email: this.state.email,
          text: this.state.text,
          image: this.state.image,
        });

        this.closeTaskAdded();
      } else {
        this.setState({
          error: {
            status: true,
            message: 'Невалидный email',
          }
        });
      }
    } else {
      this.setState({
        error: {
          status: true,
          message: 'Не все поля заполнены',
        }
      });
    }
  }

  render() {
    const {
      isTaskAdded,
      toggleAddNewTask,
    } = this.props;

    const {
      username,
      email,
      text,
      imagePreview,
      isPreview,
      error,
    } = this.state;

    return (
      <div className="App">
        {isTaskAdded && !isPreview ?
          <form>
            {error.status && <div className='error'>{error.message}</div>}
            <ul>
              <li>
                <label>
                  Username:
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={this.handleInputChange}
                  />
                </label>
              </li>
              <li>
                <label>
                  Email:
                  <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </label>
              </li>
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
                <input type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>
              </li>
              <li>
                <button onClick={this.closeTaskAdded}>Отменить</button>
                <button onClick={this.togglePreviewMod}>Превью</button>
                <button onClick={(e) => this.onSaveTask(e)}>Сохранить</button>
              </li>
            </ul>
          </form>
        :
          isPreview ?
            <div className="task">
              <ul>
                <li>Username: {username}</li>
                <li>Email: {email}</li>
                <li>Text: {text}</li>
                <li>Status: {'Не выполнено'}</li>
                <li>
                  <img id="target" alt="" width="320" height="240" src={imagePreview}/>
                </li>
                <li>
                  <button onClick={this.togglePreviewMod}>Закрыть превью</button>
                </li>
              </ul>
            </div>
          :
            <button onClick={toggleAddNewTask}>Добавить задание</button>
        }
      </div>
    );
  }
}

export default NewTask;
