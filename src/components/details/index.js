import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Homeworld from '../newData/homeworld';
import NewData from '../newData/newData';
import Spinner from '../spinner';
import './details.scss';


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
    <div className='detailsContainer'>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={detailsUrl} error={error} />)}

      { response && !loading && (
        <>
          <div className='detailsItems'>
            <div className='titleContainer'>
              <h1 className='title'>{response.data.name ? response.data.name : response.data.title}</h1>
              <img
                src={`https://starwars-visualguide.com/assets/img${newTitle}.jpg`}
                alt={`${response.data.name}`}
                onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
                />
            </div>
            <div className='detailsInfo'>
              {Object.entries(response.data).map((data, index) => {
                if (data[1] === response.data.name || data[1] === response.data.url ) {
                  return <span key={index}></span>
                }
                else if (Array.isArray(data[1])) {
                  return <span className='detailsInfoImgs' key={index}>{data[0]} : 
                    <div className='detailsInfoImgsDiv'>
                      {data[1].map((dataList, index) => {
                        return <NewData url={dataList} key={index}/>
                      })}
                    </div>
                  </span>
                } else if (data[1] === response.data['homeworld']) {
                  return <span className='detailsInfoPlanetImg' key={index}>{data[0]} :<Homeworld url={response.data['homeworld']} /></span>
                  
                } else if (data[0] === 'created' || data[0] === 'edited') {
                  return <span key={index}></span>
                  
                } else {
                  return <span key={index}>{`${data[0]} : ${data[1]} `}</span>
                }
              })}
            </div>
          </div>
          <Link className='button' to={-1}>Back</Link>
        </>
      )}

    </div>
  );
}

export default Details;