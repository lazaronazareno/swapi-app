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
    homeworld: {},
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
  },[])

  useEffect(() => {
    fetchNewData()
  },[response])

  const fetchNewData = async () => {
    if(response) {
      let getList = ['homeworld', 'films']
      getList.forEach(url => fetching(url))
    }
  }

  const fetching = async (url) => {
    if(Array.isArray(response.data[url])) {
      let list = []
      response.data[url].forEach(el=> axios.get(el).then(res => {
        list.push(res.data)
      }))
      setNewData({...newData , [url] : list})
    } else {
      await axios.get(response.data[url]).then(res => setNewData({...newData, [url] : res.data}))
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
                }
                else if (Array.isArray(data[1])) {
                  return <span className='detailsInfoImgs' key={index}>{data[0]} : 
                  <div className='detailsInfoImgsDiv'>
                    {data[1].map((dataList, index) => {
                    if(newData.films[index]){

                      if(dataList === newData.films[index].url) {

                        return<Link to={newData.films[index].url.replace('https://swapi.dev/api', '')} className='detailsInfoImg' key={index}>
                            <img
                            src={`https://starwars-visualguide.com/assets/img${newData.films[index].url.replace('https://swapi.dev/api', '').slice(0, -1)}.jpg`}
                            alt={`${newData.films[index].title}`}
                            onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
                            />
                            {newData.films[index].title}
                            </Link>
                      }
                    }
                    return <span key={index}></span>
                  })}</div></span>

                } else if (data[1] === newData.homeworld.url) {
                  return <Link className='detailsInfoImg' to={newData.homeworld.url.replace('https://swapi.dev/api', '')} key={index}>{data[0]} :
                      <img
                        src={`https://starwars-visualguide.com/assets/img${newData.homeworld.url.replace('https://swapi.dev/api', '').slice(0, -1)}.jpg`}
                        alt={`${newData.homeworld.name}`}
                        onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
                      />
                    {newData.homeworld.name}
                    </Link>
                    
                } else {
                  return <span key={index}>{`${data[0]} : ${data[1]} `}</span>
                }
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