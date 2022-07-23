import React from 'react';
import { Link } from 'react-router-dom';

function PeopleName({people, index}) {
  
  return (
    <div>
      <Link to={`/characters/${index >= 17 ? index + 1 : index}`}>{people.name}</Link>
{/*       <span>Gender :{people.gender}</span>
      <span>Birth :{people.birth_year}</span>
      <span>Height :{people.height}</span>
      <span>Mass :{people.mass}</span>
      <span>Skin color :{people.skin_color}</span> */}
    </div>
  );
}

export default PeopleName;