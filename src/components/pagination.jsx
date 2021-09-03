import React from 'react';
import PropTypes from 'prop-types';

import Page from './page';

function Pagination({ page, pagesNumber, onPagination }) {
  if (pagesNumber === 1) return null;

  const pages = [];
  for (let i = 0; i < pagesNumber; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((_, index) => (
          <Page
            key={index}
            index={index}
            onPagination={onPagination}
            page={page}
          />
        ))}
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pagesNumber: PropTypes.number.isRequired,
  onPagination: PropTypes.func.isRequired,
};

export default Pagination;
