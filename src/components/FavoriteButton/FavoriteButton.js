import React from 'react';

function FavoriteButton({ showFavorites, setShowFavorites }) {
  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <button onClick={handleToggleFavorites} className='favorite-view '>
      {showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
    </button>
  );
}

export default FavoriteButton;
