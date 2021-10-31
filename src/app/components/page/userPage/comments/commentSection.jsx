import React, { useState, useEffect } from 'react';

import api from '../../../../api';
import CommentForm from './commentForm';
import CommentCard from './commentCard';

const CommentSection = ({ userId }) => {
  const [comments, setComments] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleSubmit = (comment) => {
    comment = {
      content: comment.content,
      pageId: userId,
      userId: users.find((user) => user.name === comment.userName)._id,
    };
    setComments((prev) => {
      prev.push({
        ...comment,
        created_at: Date.now(),
        _id: Math.random().toString(36).substr(2, 9),
      });
      return [...prev];
    });
    api.comments.add({
      ...comment,
    });
  };

  const handleDelete = (commentId) => {
    setComments((prev) => prev.filter((p) => p._id !== commentId));
    api.comments.remove(commentId);
  };

  return (
    <>
      <CommentForm {...{ userId, onSubmit: handleSubmit }} />
      <CommentCard {...{ comments, users, onDelete: handleDelete }} />
    </>
  );
};

export default CommentSection;
