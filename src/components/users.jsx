import React, { useState } from 'react';

import api from '../api';
import { PAGE_SIZE } from '../core/CONSTS';
import { pagersNumber, paginate } from '../core/utils';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [page, setPage] = useState(0);

  const handlePagination = (index) => {
    setPage(index);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <>
      <SearchStatus usersCount={users.length} />

      {!!users.length && (
        <UsersTable
          users={paginate(users, page, PAGE_SIZE)}
          handleDelete={handleDelete}
        />
      )}

      <Pagination
        page={page}
        pagesNumber={pagersNumber(users.length, PAGE_SIZE)}
        onPagination={handlePagination}
      />
    </>
  );
};

export default Users;
