import React from 'react';
import PropTypes from 'prop-types';

import Bookmark from './bookmark';
import Qualitie from './qualitie';

function User({ user, onDelete }) {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qualitie) => (
          <Qualitie
            key={qualitie._id}
            id={qualitie._id}
            color={qualitie.color}
            name={qualitie.name}
          />
        ))}
      </td>
      <td id={user.profession._id}>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <Bookmark />
      </td>
      <td>
        <button
          onClick={() => {
            onDelete(user._id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default User;
