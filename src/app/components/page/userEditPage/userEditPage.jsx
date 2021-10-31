import React, { useState, useEffect } from 'react';

import api from '../../../api';
import { useParams, useHistory } from 'react-router';
import UserForm from '../../ui/userForm';

const UserEditPage = () => {
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();

  const userId = params.id;

  useEffect(() => {
    // Modifying user for UserForm.jsx
    api.users.getById(userId).then((data) => {
      setUser({
        name: data.name,
        email: data.email,
        sex: data.sex,
        profession: data.profession.name,
        qualities: data.qualities,
      });
    });
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, [userId]);

  const handleEdit = (data) => {
    let newProfession;
    let newQualities = [];

    // If user.profession was changed => changing new user profession to an object from string
    // If user.qualities was changed => changing new user qualities array to new array with [{_id: ..., name: ..., color: ...}], from [{label: ..., value: ...}]
    // If user.profession and .qualities was not changed => leave it like it is
    newProfession =
      typeof data.profession !== 'string'
        ? data.profession
        : Object.keys(professions)
            .map(
              (profession) =>
                console.log(professions[profession].name, data.profession) ||
                (professions[profession].name === data.profession &&
                  professions[profession])
            )
            .filter((profession) => profession)[0];

    !data.qualities[0].value
      ? (newQualities = data.qualities)
      : Object.keys(qualities).map((qualitie) => {
          data.qualities.map(
            (dataQualitie) =>
              qualities[qualitie]._id === dataQualitie.value &&
              newQualities.push(qualities[qualitie])
          );
        });

    data = {
      name: data.name,
      email: data.email,
      profession: newProfession,
      sex: data.sex,
      qualities: newQualities,
    };

    api.users.update(userId, data);
  };

  const handleBack = () => {
    history.replace(`/users/${userId}`);
  };

  return user ? (
    <div className="container mt-5 ">
      <button className="btn btn-primary" onClick={handleBack}>
        <i class="bi bi-caret-left"></i> Back
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-5">
          <UserForm editData={user} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default UserEditPage;
