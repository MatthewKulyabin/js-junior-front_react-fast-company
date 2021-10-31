import React from 'react';

import RandomAvatar from '../../../common/randomAvatar';

import { getTimeDifference } from '../../../../core/utils';

const Comment = ({ users, comment, onDelete }) => {
  return (
    <div className="d-flex flex-start">
      <RandomAvatar width={65} height={65} />
      <div className="flex-grow-1 flex-shrink-1">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1 ">
              {users.filter((user) => user._id === comment.userId)[0].name}
              <span className="small">
                {getTimeDifference(comment.created_at)}
              </span>
            </p>
            <button
              className="btn btn-sm text-primary d-flex align-items-center"
              onClick={() => onDelete(comment._id)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <p className="small mb-0">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
