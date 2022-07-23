import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios'

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
      url:`/?search=${search}` ,
    })
  }

  const reset = async () => {
    setIsReset(true)
    setSearch(null)
    isSearching(null)
  }

  console.log(search)

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='word'>search</label>
      <input required name='word' onChange={onChange}/>
      <button onClick={() => isSearching(search)}>search</button>
      {loading && (<h1>loading</h1>)}
      { !loading && !error && response && !isReset && (
        <div>
          {response.data.results.map(data => (
            <span key={data.name}>{data.name}</span>
          ))}

          {response.data.count === 0 && (
            <span>No results</span>
          )}

          {!isReset && (
            <button onClick={reset}>back</button>
          )}
        </div>
      )
      }
    </form>
  );
}

export default PeopleSearch;