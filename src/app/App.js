import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';

const App = (props) => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users:type?" component={Users} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
};

export default App;
