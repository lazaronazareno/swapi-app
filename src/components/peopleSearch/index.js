import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios'
import ErrorComponent from '../error';
import Spinner from '../spinner';
import './search.scss'

function PeopleSearch({isSearching}) {
  const [search, setSearch] = useState(null)
  const {response, loading, error, fetchData} = useAxios({})
  const [isReset, setIsReset] = useState(false)

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = async (e) => {
    if(search === null) {
      e.preventDefault()
      return
    }
    e.preventDefault()
    setIsReset(false)
    await handleSearch()
    e.target.reset();
  }

  async function handleSearch() {
    console.log('handle search search ' + search)
    fetchData({
      method:'GET',
      url:`/people/?search=${search}` ,
    })
  }

  const reset = async () => {
    setIsReset(true)
    setSearch(null)
    isSearching(null)
  }

  console.log(search)

  return (
    <form className='formContainer' onSubmit={onSubmit}>
      <div className='formDiv'>
        <label htmlFor='word'>
          <input required name='word' placeholder='Search character...' onChange={onChange}/>
        </label>
        <button className='buttonSearch' onClick={() => isSearching(search)}>search</button>  
      </div>
      {loading && (<Spinner />)}
      {error && (<ErrorComponent url={'/'} error={error} />)}
      { !loading && !error && response && !isReset && (
        <div className='listItemDiv'>
          {response.data.results.map(data => (
            <Link to={data.url.replace('https://swapi.dev/api', '').slice(0,-1)} key={data.name}>
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${parseFloat(data.url.match(/(\d+)/)[0])}.jpg`}
                alt={`${data.name}`}
                onError={(e)=>{e.target.src="https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg" }}
              />
              <span>{data.name}</span>
            </Link>
          ))}

          {response.data.count === 0 && (
            <span>No results</span>
          )}

          {!isReset && (
            <button className='buttonClose' onClick={reset}>back</button>
          )}
        </div>
      )
      }
    </form>
  );
}

export default PeopleSearch;