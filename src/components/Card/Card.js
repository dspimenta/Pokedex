import { memo, useState, useEffect } from 'react';
import { getImageURL, getTypeImageURL } from '../../utils';
import './Card.css';

function Card({ pokemon, onClick }) {
  const { name, id, types } = pokemon;
  const [isShiny, setIsShiny] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Recupera os IDs dos Pokémon favoritos do armazenamento local
    const favoritePokemonIds = JSON.parse(localStorage.getItem('favoritePokemonIds')) || [];
    // Verifica se o ID do Pokémon atual está na lista de favoritos
    setIsFavorite(favoritePokemonIds.includes(id));
  }, [id]);

  if (!pokemon) {
    // Retorna nulo se não houver um Pokémon válido
    return null;
  }

  const imgURL = getImageURL(id, isShiny);
  const typeClassNames = types.map(({ type }) => 'type-' + type.name).join(' ');
  const animationClassNames = isHovered ? types.map(({ type }) => 'type-' + type.name + '-animation').join(' ') : '';
  const classNames = `card ${typeClassNames} ${animationClassNames}`;
  const paddedId = '#' + id.toString().padStart(3, '000');

  const handleShinyClick = () => {
    // Inverte o estado de "isShiny" quando o Pokémon brilhante é clicado
    setIsShiny(!isShiny);
  };

  return (
    <div className="card-container" onClick={onClick}>
      <div
        className={classNames}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-pokeball"></div>
        <span className="pokemon-id">{paddedId}</span>
        <div className="card-title">
          <h2>
            {name.replace(/-/g, ' ')}
            {isFavorite && (
              // Renderiza uma estrela de favorito se o Pokémon estiver na lista de favoritos
              <img
                alt="Favorite"
                className="favorite-star"
                src={process.env.PUBLIC_URL + '/img/star-filled.png'}
              />
            )}
          </h2>
          <div className="pokemon-types">
            {types.map(({ type }) => (
              <span className={`type type-${type.name}`} key={type.name}>
                <img alt={name} src={getTypeImageURL(type.name.toLowerCase())} />
              </span>
            ))}
          </div>
        </div>
        <div className="pokemon-image">
          <img alt={name} src={imgURL} />
          <img
            alt="shiny"
            className="pokemon-shiny"
            src={process.env.PUBLIC_URL + '/img/shiny.gif'}
            onMouseOver={handleShinyClick}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Card);
