import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQuality } from '../../../hooks/useQuality';

const QualitiesList = ({ userQualities }) => {
  const { qualities } = useQuality();
  return (
    <>
      {qualities.map((qual) =>
        userQualities.map(
          (userQual) =>
            qual._id === userQual && <Quality key={qual._id} {...qual} />
        )
      )}
    </>
  );
};

QualitiesList.propTypes = {
  userQualities: PropTypes.array,
};

export default QualitiesList;
