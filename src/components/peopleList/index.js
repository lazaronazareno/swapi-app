import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios'
import PeopleDetails from '../peopleDetails';
import PeopleSearch from '../peopleSearch';

function PeopleList() {
  const [page, setPage] = useState(1)
  const {response, loading, error, fetchData} = useAxios({
    method:"GET",
    url:`/${page === 1 ? '' : `?${page}`}` ,
  })
  const [isSearching, setIsSearching] = useState(null)
  
  useEffect(() => {
    fetchData({
      method:"GET",
      url:`/${(page === 0 ? `` : `?page=${page}`)}` ,
    })
  },[page])
  
  const prevPage = () => {
    if(page !== 1 && page !== 0) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if(page < response.data.count) {
      setPage(page + 1)
    }
  }

  console.log('is searching' + isSearching)

  return (
    <div>
      {loading && (<h1>loading</h1>)}

      {error && (<h1>error</h1>)}

      {!loading && (<PeopleSearch isSearching={setIsSearching}/>)}
      
      { response && !loading && isSearching === null && (
        <>
          {response.data.results.map((people, index) => (
            <PeopleDetails key={index} people={people} />
          ))}
          {page > 1 && (
            <button onClick={() => prevPage()}>prev Page</button> 
          )}
          <button onClick={() => nextPage()}>next Page</button> 
        </>
      )}
      
    </div>
  )
}


export default PeopleList;