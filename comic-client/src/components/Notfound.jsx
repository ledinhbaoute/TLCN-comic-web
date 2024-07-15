import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const img404Url = `${process.env.PUBLIC_URL}/images/404.png`;

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  const centerImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
  };

  return (
    <Link to="/" style={imageContainerStyle}>
      <img
        src={img404Url}
        style={centerImageStyle}
        alt='Not Found'
      />
    </Link>
  )
}

export default NotFound;