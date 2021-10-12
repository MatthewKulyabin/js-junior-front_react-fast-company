import React, { useState } from 'react';
import _ from 'lodash';

import { PAGE_SIZE } from '../core/CONSTS';
import { pagersNumber, paginate } from '../core/utils';
import GroupList from './groupList';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import TextField from './textField';

const UsersList = ({ users, professions, onDelete }) => {
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(0);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchUser('');
    setPage(0);
  };

  const handlePagination = (index) => {
    setPage(index);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = ({ target }) => {
    setSearchUser(target.value);
    setSelectedProf(null);
  };

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : users;
  const foundedUsers =
    !selectedProf &&
    searchUser &&
    users.filter((user) => user.name.includes(searchUser)).length
      ? users.filter((user) => user.name.includes(searchUser))
      : filteredUsers;
  const sortedUsers = _.orderBy(foundedUsers, [sortBy.path], [sortBy.order]);
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
            onClick={() => {
              setSelectedProf(null);
            }}
          >
            Все профессии
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        {!!sortedUsers.length && (
          <>
            <SearchStatus usersCount={sortedUsers.length} />
            <TextField
              placeholder="Search..."
              name="searchByName"
              inputClass={false}
              value={searchUser}
              onChange={handleSearch}
            />
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
