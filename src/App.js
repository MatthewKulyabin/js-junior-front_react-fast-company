import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Users from './components/users';
import NavBar from './components/NavBar';
import Main from './components/main';
import Login from './components/login.jsx';

const App = (props) => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
};

export default App;
