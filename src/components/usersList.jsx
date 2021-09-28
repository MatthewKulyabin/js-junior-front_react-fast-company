import React, { useState } from 'react';
import _ from 'lodash';

import { PAGE_SIZE } from '../core/CONSTS';
import { pagersNumber, paginate } from '../core/utils';
import GroupList from './groupList';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';

const UsersList = ({ users, professions, onDelete }) => {
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [page, setPage] = useState(0);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setPage(0);
  };

  const handlePagination = (index) => {
    setPage(index);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : users;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersPaged = sortedUsers && paginate(sortedUsers, page, PAGE_SIZE);

  return usersPaged ? (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setSelectedProf(null)}
          >
            Все профессии
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        {!!sortedUsers.length && (
          <>
            <SearchStatus usersCount={sortedUsers.length} />
            <UsersTable
              users={usersPaged}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={onDelete}
            />
          </>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            page={page}
            pagesNumber={pagersNumber(sortedUsers.length, PAGE_SIZE)}
            onPagination={handlePagination}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default UsersList;
