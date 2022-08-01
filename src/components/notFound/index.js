import React from 'react';
import { Link } from 'react-router-dom';
import  logo  from './logo.png'

function NotFound() {
  return (
    <div className='notfoundContainer'>
      <img src={logo} alt='Star Wars R2D2 vector, Brendon Beeslaar' />
      <h1>404 Page not Found</h1>
      <Link className='button' to={-1}>Back</Link>
    </div>
  );
}

export default NotFound;