import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';

import api from '../api';
import UserEditPage from '../components/page/userEditPage';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';

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
              <UsersListPage
                {...{ users, professions }}
                onDelete={handleDelete}
              />
            )) || <h1>Loading</h1>
          }
        />
        <Route path="/users/:id/edit" component={UserEditPage} />
        <Route path="/users/:id" component={UserPage} />
      </Switch>
    </>
  );
};

export default Users;
