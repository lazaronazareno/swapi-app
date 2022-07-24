import React from 'react';
import { Link } from 'react-router-dom';

const ErrorComponent = ({error, url}) => {
  console.log(error)
  return (
    <div>
      <h1>{error.message}</h1>
      <Link to={url}>Back</Link>
    </div>
  );
};

export default ErrorComponent;