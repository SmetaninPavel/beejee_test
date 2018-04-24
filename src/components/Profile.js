import React, { Component } from 'react';

class NewTask extends Component {

  constructor(props, state) {
    super(props, state);
    this.state = {
      login: '',
      password: '',
      error: {
        status: false,
        message: '',
      },
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onExit = this.onExit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSignIn(e) {
    e.preventDefault();

    if (this.state.login && this.state.password) {
      this.setState({
        error: {
          status: false,
          message: '',
        },
      })
      this.props.onAuth(this.state.login, this.state.password);
    } else {
      this.setState({
        error: {
          status: true,
          message: 'Не все поля заполнены',
        },
      });
    }
  }

  onExit() {
    this.setState({
      login: '',
      password: '',
    });
    this.props.onSignOff();
  }

  render() {
    const {
      isTryAuth,
      isAuthed,
      toggleAuthStatus,
    } = this.props;

    const {
      login,
      password,
      error,
    } = this.state;

    return (
      <div className="profile">
        {!isTryAuth ?
          isAuthed ?
            <button onClick={this.onExit}>Выйти</button>
          :
            <button onClick={() => toggleAuthStatus()}>Авторизироваться</button>
        :
          <form>
            {error.status && <div className='error'>{error.message}</div>}
            <ul>
              <li>
                <label>
                  Login:
                  <input
                    name="login"
                    type="text"
                    value={login}
                    onChange={this.handleInputChange}
                  />
                </label>
              </li>
              <li>
                <label>
                  Password:
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleInputChange}
                  />
                </label>
              </li>
              <button onClick={(e) => this.onSignIn(e)}>Войти</button>
              <button onClick={() => toggleAuthStatus()}>Закрыть</button>
            </ul>
          </form>
        }
      </div>
    );
  }
}

export default NewTask;
