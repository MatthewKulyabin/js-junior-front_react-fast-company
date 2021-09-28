import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

import api from '../api';
import QualitiesList from './qualitiesList';

const UserPage = () => {
  const [user, setUser] = useState();

  const history = useHistory();

  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleAllUsers = () => {
    history.push('/users');
  };

  return (
    (user && (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>comlpletedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleAllUsers}>Все Пользователи</button>
      </>
    )) || <h1>Loading</h1>
  );
};

export default UserPage;
