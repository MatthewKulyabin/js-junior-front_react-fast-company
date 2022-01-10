import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';

const CommentContext = React.createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getComments = async () => {
    try {
      const { content } = await commentService.get(userId);
      setComments(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUserId,
      created_at: Date.now(),
    };
    try {
      const { content } = await commentService.put(comment);
      setComments((prev) => [...prev, content]);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const removeComment = async (id) => {
    try {
      const { content } = await commentService.delete(id);
      content === null &&
        setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setIsLoading(false);
  };

  return (
    <CommentContext.Provider
      value={{ comments, createComment, removeComment, isLoading }}
    >
      {children}
    </CommentContext.Provider>
  );
};

CommentProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
