import React from 'react';
import { Link } from 'react-router-dom';
import './error.css';

export const ErrorPage = () => {
  return (
    <div className='errorContainer'>
      <img src={'images/notFound.png'} className='img' alt='error' />
      <h1 style={{ textAlign: 'center' }}>
        <Link to='/' className='goHome'>
          Go to Home
        </Link>
      </h1>
    </div>
  );
};
