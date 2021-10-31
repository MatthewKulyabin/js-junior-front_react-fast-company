import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import LoginForm from '../../ui/loginForm';

const MultiSelectField = ({ defaultData, label, options, onChange, name }) => {
  let defaultValue =
    defaultData &&
    Object.keys(defaultData).map((optionName) => {
      if (defaultData[optionName]._id)
        return (
          defaultData[optionName]._id && {
            label: defaultData[optionName].name,
            value: defaultData[optionName]._id,
          }
        );
      return defaultData[optionName];
    });
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;
  const handleChange = (value) => {
    defaultValue = [...value];
    onChange({ name, value: defaultValue });
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Select
        value={defaultValue}
        closeMenuOnSelect={false}
        options={optionsArray}
        isMulti
        className="basic-multi-select mb-4"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default MultiSelectField;
