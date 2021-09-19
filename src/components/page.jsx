import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ index, onPagination, page }) => {
  return (
    <li key={index} className={`page-item ${page === index ? 'active' : ''}`}>
      <button className="page-link" onClick={() => onPagination(index)}>
        {index + 1}
      </button>
    </li>
  );
};

Page.propTypes = {
  index: PropTypes.number.isRequired,
  onPagination: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Page;
