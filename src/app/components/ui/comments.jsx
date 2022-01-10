import { orderBy } from 'lodash';
import React, { useEffect } from 'react';
import CommentsList, { AddCommentForm } from '../common/comments';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  deleteComment,
  getCommentsList,
  getCommentsLoadingStatus,
  loadCommentsList,
} from '../../store/comments';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../store/users';

const Comments = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const currentUserId = useSelector(getCurrentUserId());

  const isLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const comments = useSelector(getCommentsList());

  const handleSubmit = (data) => {
    console.log(currentUserId);
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUserId,
      created_at: Date.now(),
    };
    dispatch(createComment(comment));
  };

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id));
  };
  const sortedComments = orderBy(comments, ['created_at'], ['desc']);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
