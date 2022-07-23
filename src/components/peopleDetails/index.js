import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'


function PeopleDetails() {
  const location = useLocation()
  const {response, loading, error, fetchData} = useAxios({})

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`/people${location.pathname}` ,
    })
  },[])

  return (
    <div>
      {loading && (<h1>loading</h1>)}

      {error && (<h1>error</h1>)}


      { response && !loading && (
        <div>
          <img src={`https://starwars-visualguide.com/assets/img/characters${location.pathname}.jpg`} alt={`${response.data.name}`}/>
          <span>name : {response.data.name}</span>
          <span>Gender :{response.data.gender}</span>
          <span>Birth :{response.data.birth_year}</span>
          <span>Height :{response.data.height}</span>
          <span>Mass :{response.data.mass}</span>
          <span>Skin color :{response.data.skin_color}</span>
          <Link to='/'>Back</Link>
        </div>
      )}

    </div>
  );
}

export default PeopleDetails;