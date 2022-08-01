import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';
import Homeworld from '../newData/homeworld';
import NewData from '../newData/newData';


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

  
  return (
    <div className='detailsContainer'>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={'/'} error={error} />)}

      { response && !loading && (
        <>
          <div className='detailsItems'>
            <div className='titleContainer'>
              <h1 className='title'>{response.data.name}</h1>
              <img src={`https://starwars-visualguide.com/assets/img/characters${newTitle.slice(0, -1)}.jpg`} alt={`${response.data.name}`}/>
            </div>
            <div className='detailsInfo'>
              {Object.entries(response.data).map((data, index) => {

                if (data[1] === response.data.name || data[1] === response.data.url ) {
                  return <span key={index}></span>
                }
                else if (Array.isArray(data[1])) {
                  return <span className='detailsInfoImgs' key={index}>{data[0]} : 
                    <div className='detailsInfoImgsDiv'>
                      {data[1].map(dataList => {
                        return <NewData url={dataList} />
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

export default PeopleDetails;