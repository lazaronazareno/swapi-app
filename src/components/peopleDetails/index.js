import React from 'react';

function PeopleDetails({people}) {
  return (
    <div>
      <span>Name :{people.name}</span>
      <span>Gender :{people.gender}</span>
      <span>Birth :{people.birth_year}</span>
      <span>Height :{people.height}</span>
      <span>Mass :{people.mass}</span>
      <span>Skin color :{people.skin_color}</span>
    </div>
  );
}

export default PeopleDetails;