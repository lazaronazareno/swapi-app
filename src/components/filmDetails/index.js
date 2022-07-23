import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'


function FilmDetails() {
  const location = useLocation()
  const {response, loading, error, fetchData} = useAxios({})

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`${location.pathname}` ,
    })
  },[])

  return (
    <div>
      {loading && (<h1>loading</h1>)}

      {error && (<h1>error</h1>)}


      { response && !loading && (
        <div>
          <img src={`https://starwars-visualguide.com/assets/img${location.pathname}.jpg`} alt={`${response.data.name}`}/>
          <span>title : {response.data.title}</span>
          <span>episode : {response.data.episode_id}</span>
          <span>director : {response.data.director}</span>
          <span>producer : {response.data.producer}</span>
          <span>release date : {response.data.release_date}</span>
          <span>opening crawl : {response.data.opening_crawl}</span>
          <Link to='/films'>Back</Link>
        </div>
      )}

    </div>
  );
}

export default FilmDetails;