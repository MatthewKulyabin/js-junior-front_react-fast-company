import React from 'react';
import PropTypes from 'prop-types';
import { useProfession } from '../../hooks/useProfession';

const Proffesion = ({ id }) => {
  const { isLoading, getProfession } = useProfession();
  const prof = getProfession(id);
  return (!isLoading && <p>{prof.name}</p>) || 'loading...';
};

Proffesion.propTypes = {
  id: PropTypes.string,
};

export default Proffesion;
