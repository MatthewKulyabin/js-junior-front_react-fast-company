import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getUsers = async () => {
    try {
      const { content } = await userService.get();

      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {(!isLoading && children) || <h1>Users Loading...</h1>}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UserProvider;
