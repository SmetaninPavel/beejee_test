import React, { Component } from 'react';

import Task from './Task';
import Pagination from './Pagination';

class ListTasks extends Component {

  render() {
    const {
      tasks,
      currentPage,
      totalTaskCount,
      isAdminPermission,
      onEditTask,
      onPageChange,
    } = this.props;

    return (
      <div className="App">
        {tasks.map((task, index) =>
          <Task
            key={index}
            task={task}
            isAdminPermission={isAdminPermission}
            onEditTask={onEditTask}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalTaskCount={totalTaskCount}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
}

export default ListTasks;
