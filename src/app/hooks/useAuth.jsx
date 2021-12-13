import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';

import userService from '../services/user.service';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const signUp = async ({ email, password, ...rest }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: 'This email has been already used' };
          throw errorObject;
        }
      }
    }
  };

  const login = async ({ email, password, ...rest }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
    } catch (error) {
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === 'INVALID_PASSWORD') {
          const errorObject = { password: 'Wrong Password' };
          throw errorObject;
        }
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = { email: 'Wrong Email' };
          throw errorObject;
        }
      }
    }
  };

  const createUser = async (data) => {
    try {
      const { content } = userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <AuthContext.Provider value={{ signUp, currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
