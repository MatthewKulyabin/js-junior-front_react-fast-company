import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import { validator } from '../../core/utils';
import CheckBoxField from '../common/form/checkBoxField';
import TextField from '../common/form/textField';

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required('Password is Required')
      .matches(
        /^(?=.*[A-Z])/,
        'Password should have one or more capital letters'
      )
      .matches(/^(?=.*[0-9])/, 'Password should have one or more digits')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password should have one or more special symbols !@#$%^&*'
      )
      .min(8, 'Password length should be 8 or more'),
    email: yup
      .string()
      .required('Email is Required')
      .email("'Email should be like 'email@example.com'"),
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: 'Email is Required' },
  //     isEmail: { message: "Email should be like 'email@example.com'" },
  //   },
  //   password: {
  //     isRequired: {
  //       message: 'Password is Required',
  //     },
  //     isCapitalSymbol: {
  //       message: 'Password should have one or more capital letters',
  //     },
  //     isContainDigit: {
  //       message: 'Password should have one or more digits',
  //     },
  //     min: {
  //       message: `Password length should be 8 or more`,
  //       value: 8,
  //     },
  //   },
  // };

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateScheme
      .validate(data, { abortEarly: true })
      .then(() => setErrors({}))
      .catch((err) => {
        console.log(err.errors, err.inner);
        return setErrors({ [err.path]: err.message });
      });
    // setErrors(errors);
    return !Object.keys(errors).length;
  };

  useEffect(() => validate(), [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Do you wanna stay on in the system?
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        disabled={Object.keys(errors).length}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
