import React from 'react';

import RandomAvatar from '../../../common/randomAvatar';

const UserCard = ({ name, profession, rate, onEditUser }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={onEditUser}
        >
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <RandomAvatar width={65} height={65} />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{profession}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
