import React, { useState } from 'react';

import api from '../api';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <>
      <SearchStatus usersCount={users.length} />

      {!!users.length && (
        <UsersTable users={users} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default Users;
