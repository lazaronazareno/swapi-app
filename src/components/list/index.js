import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios'

const List = ({ listUrl, listName, listIndex, listTitle }) => {
  console.log(listUrl)
  console.log(listName)
  console.log(listIndex)
  console.log(listTitle)
  const {response, loading, error, fetchData} = useAxios({
    method:"GET",
    url:  listUrl ,
  })

  useEffect(() => {
    fetchData({
      method:"GET",
      url: listUrl ,
    })
  },[])

  return (
    <div>
      {loading && (<h1>loading</h1>)}

      {error && (<h1>error</h1>)}
      
      { response && !loading && (
        <>
          {response.data.results.map((list, index) => (
            <Link to={`${listUrl}/${listIndex + 1}`}>{listTitle}</Link>
          ))}
        </>
      )}

      <Link to='/'>Back</Link>
    </div>
  );
};

export default List;