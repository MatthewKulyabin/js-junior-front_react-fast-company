import React, { useEffect, useState } from 'react';

import api from '../../../../api';
import Comment from './comment';

const CommentCard = ({ comments, users, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        <div className="bg-light card-body">
          <div className="row">
            <div className="col">
              {(comments &&
                comments.length &&
                users &&
                comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    users={users}
                    comment={comment}
                    onDelete={onDelete}
                  />
                ))) || <h5>There is no comments yet</h5>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
