import React from 'react';
import PropTypes from 'prop-types';

function Qualitie({ id, color, name }) {
  return (
    <span key={id} className={`badge m-2 bg-${color}`}>
      {name}
    </span>
  );
}

Qualitie.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Qualitie;
