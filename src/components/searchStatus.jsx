import React from 'react';

function SearchStatus({ usersCount }) {
  return !usersCount ? (
    <h1 className=" h1 badge m-2 bg-danger">Никто с тобой не тусанёт</h1>
  ) : (
    <h1 className="badge m-2 bg-primary">
      {usersCount} человек тусанет с тобой сегодня
    </h1>
  );
}

export default SearchStatus;
