import React, { useEffect, useState } from 'react';

import api from '../api';
import { PAGE_SIZE } from '../core/CONSTS';
import { pagersNumber, paginate } from '../core/utils';
import GroupList from './groupList';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setPage(0);
  };

  const handlePagination = (index) => {
    setPage(index);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : users;
  const usersPaged = filteredUsers && paginate(filteredUsers, page, PAGE_SIZE);

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
        <SearchStatus usersCount={filteredUsers.length} />
        {!!filteredUsers.length && (
          <UsersTable users={usersPaged} handleDelete={handleDelete} />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            page={page}
            pagesNumber={pagersNumber(filteredUsers.length, PAGE_SIZE)}
            onPagination={handlePagination}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Users;
