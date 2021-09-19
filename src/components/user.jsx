import React from 'react';
import PropTypes from 'prop-types';

import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';

const User = ({ user, onDelete }) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <QualitiesList qualities={user.qualities} />
      </td>
      <td id={user.profession._id}>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <Bookmark />
      </td>
      <td></td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default User;
