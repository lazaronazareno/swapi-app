import React from 'react';
import { Link } from 'react-router-dom';

function PeopleName({people, index}) {
  
  return (
    <div className='listItemDiv'>
      <Link to={`/people/${index >= 17 ? index + 1 : index}/`}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${index >= 17 ? index + 1 : index}.jpg`}
          alt={`${people.name}`}
          onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
        />
        <span>{people.name}</span>
      </Link>
    </div>
  );
}

export default PeopleName;