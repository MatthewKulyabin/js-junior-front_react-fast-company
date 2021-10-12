import React, { useEffect, useState } from 'react';
import { validator } from '../core/utils';
import TextField from './textField';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
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
    console.log(data);
  };

  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-5">
          <h3 className="mb-4">Login</h3>
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
            <button
              className="btn btn-primary w-100 mx-auto"
              disabled={Object.keys(errors).length}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
