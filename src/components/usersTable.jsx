import React from 'react';
import PropTypes from 'prop-types';

import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({ users, onSort, selectedSort, onDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился раз',
    },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное', component: <Bookmark /> },
    delete: {
      component: (user) => (
        <button
          onClick={() => {
            onDelete(user._id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  };
  return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
};

export default UsersTable;
