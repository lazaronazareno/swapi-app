import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';
import './list.scss'

const List = ({ listUrl, listTitle }) => {
  const [page, setPage] = useState(1)
  const [newIndex, setNewIndex] = useState(0)
  const {response, loading, error, fetchData} = useAxios({
    method:"GET",
    url: `${listUrl}/${page === 1 ? '' : `?page=${page}`}` ,
  })

  useEffect(() => {
    fetchData({
      method:"GET",
      url: `${listUrl}/${page === 1 ? '' : `?page=${page}`}` ,
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

  return (
    <div className='listContainer'>
      {loading && (<Spinner />)}

      {error && (<ErrorComponent url={'/'} error={error} />)}
      
      { response && !loading && (
        <div className='listItems'>
          {response.data.results.map((list, index) => (
            <div className='listItemDiv' key={index}>
              <Link to={list.url.replace('https://swapi.dev/api', '')}>
                <img
                src={`https://starwars-visualguide.com/assets/img${listUrl}/${parseFloat(list.url.match(/(\d+)/)[0])}.jpg`}
                alt={`${list.name}`}
                onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
                />
                <span>{list[listTitle]}</span>
              </Link>
            </div>
          ))}
          {page > 1 && (
            <button className='buttonNavsP' onClick={() => prevPage()}>prev Page</button> 
          )}
          {response.data.results.length === 10 && (
            <button className='buttonNavsN' onClick={() => nextPage()}>next Page</button> 
          )}
        </div>
      )}

      <Link className='button' to={-1}>Back</Link>
    </div>
  );
};

export default List;