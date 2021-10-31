import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ usersCount }) => {
  return !usersCount ? (
    <h1 className="badge m-2 bg-danger">Никто с тобой не тусанёт</h1>
  ) : (
    <h1 className="badge m-2 bg-primary">
      {usersCount} человек тусанет с тобой сегодня
    </h1>
  );
};

SearchStatus.propTypes = {
  usersCount: PropTypes.number.isRequired,
};

export default SearchStatus;
