import React from 'react';

function Filters({ onGetTasks, currentFilter }) {
  return (
    <div className='filters'>
      <div
        onClick={() => onGetTasks(1, 'username')}
        className={currentFilter === 'username' ? 'active' : ''}
      >
        Username
      </div>
      <div
        onClick={() => onGetTasks(1, 'email')}
        className={currentFilter === 'email' ? 'active' : ''}
      >
        Email
      </div>
      <div
        onClick={() => onGetTasks(1, 'status')}
        className={currentFilter === 'status' ? 'active' : ''}
      >
        Status
      </div>
    </div>
  );
}

export default Filters;