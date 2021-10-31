import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

import api from '../../../api';
import { MeetingsCard } from './userCard';
import { QualitiesCard } from './userCard';
import { UserCard } from './userCard';
import CommentSection from './comments';

const UserPage = () => {
  const [user, setUser] = useState();

  const history = useHistory();

  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, [userId]);

  const handleEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  return (
    (user && (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              profession={user.profession.name}
              rate={user.rate}
              onEditUser={handleEditUser}
            />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentSection {...{ userId }} />
          </div>
        </div>
      </div>
    )) || <h1>Loading</h1>
  );
};

export default UserPage;
{
  /* <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>comlpletedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button className="btn btn-secondary mt-1" onClick={handleEditUser}>
          Изменить
        </button> */
}
