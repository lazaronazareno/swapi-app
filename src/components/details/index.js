import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';


const Details = ({detailsUrl}) => {
  const location = useLocation()
  const {response, loading, error, fetchData} = useAxios({})
  const title = location.pathname
  const newTitle = title.replace({detailsUrl}, '').slice(0,-1)

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`${location.pathname}` ,
    })
  },[])

  return (
    <div>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={detailsUrl} error={error} />)}

      { response && !loading && (
        <div>
          <img src={`https://starwars-visualguide.com/assets/img${newTitle}.jpg`} alt={`${response.data.name}`}/>
          {Object.entries(response.data).map((data, index) => {
            return <span key={index}>{data}</span>
          })}
          <Link to={detailsUrl}>Back</Link>
        </div>
      )}

    </div>
  );
}

export default Details;