import React, { useEffect, useState } from 'react';

import api from '../../../../api';
import { validator } from '../../../../core/utils';
import SelectField from '../../../common/form/selectField';
import TextField from '../../../common/form/textField';

const CommentForm = ({ onSubmit }) => {
  const initialComment = { userName: '', content: '' };
  const [comment, setComment] = useState(initialComment);
  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const validatorConfig = {
    userName: {
      isRequired: { message: 'User is Required' },
    },
    content: {
      isRequired: { message: 'Content is Required' },
    },
  };

  const validate = () => {
    const errors = validator(comment, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  useEffect(() => validate(), [comment]);

  const handleChange = (target) => {
    setComment((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    onSubmit(comment);
    setComment(initialComment);
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h2>New Comment</h2>
          <div className="mb-4">
            <SelectField
              name="userName"
              value={comment.userName || 'Choose...'}
              defaultOption="Choose..."
              options={users}
              onChange={handleChange}
              error={errors.userName}
            />
          </div>
          <div className="mb-4">
            <TextField
              name="content"
              label="Message"
              value={comment.content}
              onChange={handleChange}
              error={errors.content}
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={Object.keys(errors).length}
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
