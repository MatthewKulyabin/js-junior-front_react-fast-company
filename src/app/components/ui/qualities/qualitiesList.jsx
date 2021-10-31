import React from 'react';
import PropTypes from 'prop-types';

import Qualitie from './qualitie';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qualitie) => (
        <Qualitie
          key={qualitie._id}
          id={qualitie._id}
          color={qualitie.color}
          name={qualitie.name}
        />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
