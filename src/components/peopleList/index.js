import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import PeopleName from '../peopleName';
import PeopleSearch from '../peopleSearch';
import Spinner from '../spinner';

function PeopleList() {
  const [page, setPage] = useState(1)
  const {response, loading, error, fetchData} = useAxios({
    method:"GET",
    url:`/people/${page === 1 ? '' : `?${page}`}` ,
  })
  const [isSearching, setIsSearching] = useState(null)
  const [newIndex, setNewIndex] = useState(0)
  
  useEffect(() => {
    fetchData({
      method:"GET",
      url:`/${(page === 0 ? `` : `people/?page=${page}`)}` ,
    })
  },[page])
  
  const prevPage = () => {
    if(page !== 1 && page !== 0) {
      setPage(page - 1)
      setNewIndex(newIndex - 10)
    }
  }

  const nextPage = () => {
    if(page < response.data.count) {
      setPage(page + 1)
      setNewIndex(newIndex + 10)
    }
  }

  console.log('is searching' + isSearching)

  return (
    <div className='listContainer'>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={'/'} error={error} />)}

      {!loading && (<PeopleSearch isSearching={setIsSearching}/>)}
      
      { response && !loading && isSearching === null && (
        <>
          <div className='listItems'>
            {response.data.results.map((people, index) => (
              <PeopleName key={index} people={people} index={index + 1 + newIndex} />
            ))}
          </div>
          <div className='buttonsContainer'>
            {page > 1 && (
              <button className='buttonNavsP' onClick={() => prevPage()}>prev Page</button> 
            )}
            <button className='buttonNavsN' onClick={() => nextPage()}>next Page</button> 
          </div>
        </>
      )}

      <Link className='button' to={-1}>Back</Link>
      
    </div>
  )
}


export default PeopleList;