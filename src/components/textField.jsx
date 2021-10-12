import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  inputClass = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputClasses = () => {
    return (
      (!inputClass && 'form-control') ||
      'form-control' + (error ? ' is-invalid' : ' is-valid')
    );
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          id={name}
          {...{
            type: showPassword ? 'text' : type,
            placeholder: placeholder ? placeholder : '',
            name,
            value,
            onChange,
          }}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && (
          <div className="invalid-feedback" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

TextField.defaultProps = { type: 'text' };

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
