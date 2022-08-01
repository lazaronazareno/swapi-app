import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Page not Found</h1>
      <Link className='button' to={-1}>Back</Link>
    </div>
  );
}

export default NotFound;