import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'


function PeopleDetails() {
  const location = useLocation()
  const {response, loading, error, fetchData} = useAxios({})
  const title = location.pathname
  const newTitle = title.replace('people/', '')

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`${location.pathname}` ,
    })
  },[])

  console.log(response)

  return (
    <div>
      {loading && (<h1>loading</h1>)}

      {error && (<h1>error</h1>)}


      { response && !loading && (
        <div>
          <img src={`https://starwars-visualguide.com/assets/img/characters${newTitle}.jpg`} alt={`${response.data.name}`}/>
          {Object.entries(response.data).map((data, index) => {
            return <span key={index}>{data}</span>
          })}
          <Link to='/'>Back</Link>
        </div>
      )}

    </div>
  );
}

export default PeopleDetails;