import React from 'react';

function Qualitie({ id, color, name }) {
  return (
    <span key={id} className={`badge m-2 bg-${color}`}>
      {name}
    </span>
  );
}

export default Qualitie;
