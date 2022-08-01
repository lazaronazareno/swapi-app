import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';


const Homeworld = ({url}) => {
  const {response, loading, error, fetchData} = useAxios({})

  useEffect(() => {
    fetchData({
      method:"GET",
      url: url ,
    })
  },[])

  return (
    <>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={url} error={error} />)}

      { response && !loading && (
        <Link className='detailsInfoImg' to={response.data.url.replace('https://swapi.dev/api', '')}>
          <img
            src={`https://starwars-visualguide.com/assets/img${response.data.url.replace('https://swapi.dev/api', '').slice(0, -1)}.jpg`}
            alt={`${response.data.name}`}
            onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
          />
          {response.data.name}
        </Link>
      )}

    </>
  );
}

export default Homeworld;