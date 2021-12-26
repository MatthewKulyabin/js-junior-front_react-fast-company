import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityService from '../services/quality.service';

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualities();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getQualities = async () => {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setIsLoading(false);
  };

  return (
    <QualityContext.Provider value={{ qualities }}>
      {(!isLoading && children) || <h1>Quality Loading...</h1>}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
