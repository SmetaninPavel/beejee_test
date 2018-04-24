import React, { Component } from 'react';
import * as API from '../API';
import '../App.css';

import ListTasks from '../components/ListTasks';
import Filters from '../components/Filters';
import NewTask from '../components/NewTask';
import Profile from '../components/Profile';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      totalTaskCount: 0,
      currentPage: 1,
      currentFilter: '',
      isTaskAdded: false,
      isAdminPermission: false,
      isTryAuth: false,
      isAuthed: false,
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onGetTasks = this.onGetTasks.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onAuth = this.onAuth.bind(this);
    this.onSignOff = this.onSignOff.bind(this);
    this.onSaveNewTask = this.onSaveNewTask.bind(this);
    this.toggleAddNewTask = this.toggleAddNewTask.bind(this);
    this.toggleAuthStatus = this.toggleAuthStatus.bind(this);
  }

  onSaveNewTask(task) {
    API.createTask(task)
      .catch(err => console.log(err));
  }

  onPageChange(page) {
    this.onGetTasks(page, this.state.currentFilter);
  }

  onGetTasks(page = 1, sortField = '', sortDirection = 'asc') {
    API.getTasks(page, sortField, sortDirection)
      .then(res => this.setState({
        tasks: res.tasks,
        totalTaskCount: res.total_task_count,
        currentPage: page,
        currentFilter: sortField,
      }))
      .catch(err => console.log(err))
  }

  onEditTask(task) {
    API.editTask(task)
      .then((res) => {
        this.onGetTasks(this.state.currentPage);
      })
      .catch(err => console.log(err));
  }

  onAuth(login, password) {
    if (login === 'admin' && password === '123') {
      this.setState({
        isAuthed: true,
        isTryAuth: false,
        isAdminPermission: true,
      });
    } else {
      this.setState({
        isAuthed: true,
        isTryAuth: false,
        isAdminPermission: false,
      });
    }
  }

  onSignOff() {
    this.setState({
      isAuthed: false,
      isTryAuth: false,
      isAdminPermission: false,
    });
  }

  toggleAddNewTask() {
    this.setState({
      isTaskAdded: !this.state.isTaskAdded,
      isTryAuth: false,
    });
  }

  toggleAuthStatus() {
    this.setState({
      isTryAuth: !this.state.isTryAuth,
      isTaskAdded: false,
    });
  }

  componentDidMount() {
    this.onGetTasks();
  }

  render() {

    const {
      tasks,
      totalTaskCount,
      currentPage,
      currentFilter,
      isTaskAdded,
      isTryAuth,
      isAuthed,
      isAdminPermission,
    } = this.state;

    return (
      <div className="Main">
        <Filters
          currentFilter={currentFilter}
          onGetTasks={this.onGetTasks}
        />
        <Profile
          isTryAuth={isTryAuth}
          isAuthed={isAuthed}
          onAuth={this.onAuth}
          onSignOff={this.onSignOff}
          toggleAuthStatus={this.toggleAuthStatus}
        />
        <NewTask
          isTaskAdded={isTaskAdded}
          toggleAddNewTask={this.toggleAddNewTask}
          onSaveNewTask={this.onSaveNewTask}
        />
        {!isTaskAdded &&
          <ListTasks
            tasks={tasks}
            currentPage={currentPage}
            totalTaskCount={totalTaskCount}
            isAdminPermission={isAdminPermission}
            onEditTask={this.onEditTask}
            onPageChange={this.onPageChange}
          />
        }
      </div>
    );
  }
}

export default Main;
