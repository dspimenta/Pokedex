import React from 'react';
import './Heading.css';

export default function Heading() {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <h1 className="heading" onClick={handleClick}>
      P<i></i>kédex
    </h1>
  );
}
