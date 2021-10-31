import React, { useEffect, useState } from 'react';

import { validator } from '../../core/utils';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const UserForm = ({ editData, onEdit }) => {
  const [data, setData] = useState();

  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    editData
      ? setData(editData)
      : setData({
          email: '',
          password: '',
          profession: '',
          sex: 'male',
          qualities: [],
          licence: false,
        });
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is Required' },
      isEmail: { message: "Email should be like 'email@example.com'" },
    },
    password: {
      isRequired: {
        message: 'Password is Required',
      },
      isCapitalSymbol: {
        message: 'Password should have one or more capital letters',
      },
      isContainDigit: {
        message: 'Password should have one or more digits',
      },
      min: {
        message: `Password length should be 8 or more`,
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Profession is required',
      },
    },
    qualities: {
      isRequired: {
        message: 'Qualities are required',
      },
    },
    licence: {
      isRequired: {
        message: 'Licence agreement is required',
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  useEffect(() => validate(), [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    if (onEdit) {
      onEdit(data);
      return;
    }
  };

  return (
    (data && (
      <form onSubmit={handleSubmit}>
        {editData && data.name && (
          <TextField
            name="name"
            label="Name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
        )}
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        {data.password && (
          <TextField
            label="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
        )}
        <SelectField
          name="profession"
          label="Choose your profession"
          options={professions}
          onChange={handleChange}
          defaultOption="Choose..."
          value={data.profession || 'Choose...'}
          error={errors.profession}
        />
        <RadioField
          label="Choose sex of your own"
          options={[
            { name: 'Male', value: 'male', _id: 1 },
            { name: 'Female', value: 'female', _id: 2 },
            { name: 'Other', value: 'other', _id: 3 },
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
        />
        <MultiSelectField
          defaultData={data.qualities}
          label="Choose qualities of your own"
          options={qualities}
          onChange={handleChange}
          name="qualities"
        />
        {!editData && (
          <CheckBoxField
            name="licence"
            value={data.licence}
            onChange={handleChange}
            error={errors.licence}
          >
            Do you agree with <a>licence</a> agreement?
          </CheckBoxField>
        )}

        <button
          className="btn btn-primary w-100 mx-auto"
          disabled={Object.keys(errors).length}
        >
          Submit
        </button>
      </form>
    )) || <h1>Loading</h1>
  );
};

export default UserForm;
