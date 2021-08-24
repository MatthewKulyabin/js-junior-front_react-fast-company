import React from 'react';
import { useState } from 'react/cjs/react.development';
import api from '../api';
import UsersTable from './usersTable';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const renderPhrase = () => {
    return !users.length ? (
      <h1 className=" h1 badge m-2 bg-danger">Никто с тобой не тусанёт</h1>
    ) : (
      <h1 className="badge m-2 bg-primary">
        {users.length} человек тусанет с тобой сегодня
      </h1>
    );
  };

  return (
    <>
      {renderPhrase()}

      {!!users.length && (
        <UsersTable users={users} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default Users;
