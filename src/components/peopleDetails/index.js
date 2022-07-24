import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';


function PeopleDetails() {
  const location = useLocation()
  const {response, loading, error, fetchData} = useAxios({})
  const [newData, setNewData] = useState()
  const title = location.pathname
  const newTitle = title.replace('people/', '')

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`${location.pathname}` ,
    })
    fetchNewData()
  },[])

  const fetchNewData = async () => {
    if(response) {
      const homeworld = await axios.get(response.data.homeworld)
      const newHome = await homeworld.data
      setNewData(newHome)
      console.log(newData)
    }
  }
  
  console.log(newData)
  console.log(response)

  return (
    <div className='detailsContainer'>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={'/'} error={error} />)}

      { response && !loading && (
        <>
          <div className='detailsItems'>
            <div className='titleContainer'>
              <h1 className='title'>{response.data.name}</h1>
              <img src={`https://starwars-visualguide.com/assets/img/characters${newTitle}.jpg`} alt={`${response.data.name}`}/>
            </div>
            <div className='detailsInfo'>
              {Object.entries(response.data).map((data, index) => {
                return <span key={index}>
                  {data[1] === response.data.name ? '' : `${data[0]} : `}
                  {Array.isArray(data[1]) ?
                   data[1].map((dataList, index) => (`${dataList}, `)) :
                  (data[1] === response.data.name ? '' : data[1] === newData?.url ? newData?.name : data[1])}
                  </span>
              })}
            </div>
          </div>
          <Link className='button' to='/'>Back</Link>
        </>
      )}

    </div>
  );
}

export default PeopleDetails;