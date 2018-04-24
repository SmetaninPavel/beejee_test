import React, { Component } from 'react';

class Pagination extends Component {

  render() {
    const {
      currentPage,
      totalTaskCount,
      onPageChange,
    } = this.props;

    return (
      <div className="pagination">
        <div>
          {[...Array(Math.ceil(totalTaskCount / 3)).keys()].map(page =>
            <div
              key={page}
              onClick={() => onPageChange(page + 1)}
              className={currentPage === page + 1 ? 'active' : ''}
            >
              {page + 1}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Pagination;
