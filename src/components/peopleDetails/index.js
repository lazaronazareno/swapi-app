import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom"
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';


function PeopleDetails() {
  const location = useLocation()
  const {response, loading, error, fetchData} = useAxios({})
  const [newData, setNewData] = useState({
    planets: {},
    species : {},
    starships : {},
    films : {},
    vehicles : {}
  })
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
      const starshipsList = []
      Promise.all(response.data.starships).then((responses) => {
        responses.map((sResponse) => axios.get(sResponse).then(response => starshipsList.push(response.data)))
      })
 /*      const species = await axios.get(response.data.species)
      const films = await axios.get(response.data.films)
      const vehicles = await axios.get(response.data.vehicles) */
      const newPlanet = await homeworld.data
      setNewData({...newData, planets : newPlanet, starships: starshipsList})
    }
  }

  console.log(newData)
  
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
                if (data[1] === response.data.name || data[1] === response.data.url ) {
                  return <span key={index}></span>
                } else if (Array.isArray(data[1])) {
                  data[1].map((dataList, index) => <span key={index}>(`${dataList}, `)</span>)
                } else if (data[1] === newData.planets.url) {
                  return <span key={index}>{data[0]} : {newData.planets.name}</span>
                }
                return <span key={index}>{`${data[0]} : ${data[1]} `}</span>
/*                 return <span key={index}>
                  {data[1] === response.data.name ? '' : `${data[0]} : `}
                  {Array.isArray(data[1]) ?
                   data[1].map((dataList, index) => (`${dataList}, `)) :
                  (data[1] === response.data.name ? '' : data[1] === newData?.url ? newData?.name : data[1])}
                  </span> */
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