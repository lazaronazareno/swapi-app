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
  console.log(newTitle)

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`${location.pathname}` ,
    })
  },[])

  return (
    <div className='detailsContainer'>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={detailsUrl} error={error} />)}

      { response && !loading && (
        <>
          <div className='detailsItems'>
            <div className='titleContainer'>
              <h1 className='title'>{response.data.name}</h1>
              <img
                src={`https://starwars-visualguide.com/assets/img${newTitle}.jpg`}
                alt={`${response.data.name}`}
                onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
                />
            </div>
            <div className='detailsInfo'>
              {Object.entries(response.data).map((data, index) => {
                return <span key={index}>{data[1] === response.data.name ? '' : `${data[0]} : `}{Array.isArray(data[1]) ? data[1].map((dataList, index) => (`${dataList}, `)) : (data[1] === response.data.name ? '' : data[1])}</span>
              })}
            </div>
          </div>
          <Link className='button' to={detailsUrl}>Back</Link>
        </>
      )}

    </div>
  );
}

export default Details;