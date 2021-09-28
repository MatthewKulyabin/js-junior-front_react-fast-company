import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';

import api from '../api';
import UserPage from './userPage';
import UsersList from './usersList';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <>
      <Switch>
        <Route
          exact
          path="/users"
          render={() =>
            (users && professions && (
              <UsersList {...{ users, professions }} onDelete={handleDelete} />
            )) || <h1>Loading</h1>
          }
        />
        <Route path="/users/:id" component={UserPage} />
      </Switch>
    </>
  );
};

export default Users;
