import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to='/characters'>Characters</Link>
      <Link to='/films'>Films</Link>
      <Link to='/starships'>Starships</Link>
      <Link to='/vehicles'>Vehicles</Link>
      <Link to='/species'>Species</Link>
      <Link to='/planets'>Planets</Link>
    </div>
  );
};

export default Home;