import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios'

const FilmList = () => {
  const {response, loading, error, fetchData} = useAxios({
    method:"GET",
    url:`/films` ,
  })

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`/films` ,
    })
  },[])

  return (
    <div>
      {loading && (<h1>loading</h1>)}

      {error && (<h1>error</h1>)}
      
      { response && !loading && (
        <>
          {response.data.results.map((film, index) => (
            <Link to={`/films/${index + 1}`}>{film.episode_id}{film.title}</Link>
          ))}
        </>
      )}

      <Link to='/'>Back</Link>
    </div>
  );
};

export default FilmList;