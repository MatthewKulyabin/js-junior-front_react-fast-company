import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };

  const getInputClasses = () => {
    return (
      'form-check-input form-control' + (error ? ' is-invalid' : ' is-valid')
    );
  };

  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label
        className="form-check-label"
        htmlFor="flexCheckDefault"
        style={{ paddingLeft: 10 }}
      >
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CheckBoxField;
