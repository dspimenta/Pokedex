import React from 'react';
import { memo } from 'react';
import { getImageURL } from '../../utils';
import { Weaknesses } from '../Weaknesses';
import  usePokemonData  from '../../hooks/usePokemonData';
import './Pokedex.css';

let currentPokemonId = 1; // Variável global para armazenar o ID do Pokémon atual

const Pokedex = () => {
  const [pokemonId, setPokemonId] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const { pokemonData, isLoading, error } = usePokemonData(pokemonId);
  const [isShiny, setIsShiny] = React.useState(false); // Estado para a versão brilhante
  const [showStats, setShowStats] = React.useState(false); // Estado para alternar a visibilidade das estatísticas
  const [favoritePokemonIds, setFavoritePokemonIds] = React.useState(() => {
    const storedIds = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    return storedIds || [];
  });

  const imgURL = pokemonData ? getImageURL(pokemonData.id, isShiny) : '';
  const bgImage = showStats ? 'pokedex-background_2.png' : 'pokedex-background.png';

  const handlePrevClick = () => {
    currentPokemonId = currentPokemonId - 1;
    setPokemonId(currentPokemonId);
  };

  const handleNextClick = () => {
    currentPokemonId = currentPokemonId + 1;
    setPokemonId(currentPokemonId);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (pokemonData) {
      currentPokemonId = pokemonData.id;
      setPokemonId(searchValue);
      setSearchValue('');
    }
  };

  const handleShinyClick = () => {
    setIsShiny(!isShiny); // Alterna o estado isShiny
  };

  const handleDetailClick = () => {
    setShowStats(!showStats); // Alterna o estado showStats
  };

  const handleFavoriteClick = () => {
    const newFavoritePokemonIds = [...favoritePokemonIds];
    if (newFavoritePokemonIds.includes(pokemonId)) {
      const index = newFavoritePokemonIds.indexOf(pokemonId);
      newFavoritePokemonIds.splice(index, 1);
    } else {
      newFavoritePokemonIds.push(pokemonId);
    }
    setFavoritePokemonIds(newFavoritePokemonIds);
  };

  const isPrevDisabled = pokemonId === 1; // Verifica se o pokemonId é 1

  // Manipula o erro e define o ID do Pokémon como 1
  React.useEffect(() => {
    if (error) {
      currentPokemonId = 1;
      setPokemonId(currentPokemonId);
    }
  }, [error]);

  React.useEffect(() => {
    // Atualiza currentPokemonId sempre que pokemonData.id mudar
    if (pokemonData) {
      currentPokemonId = pokemonData.id;
    }
  }, [pokemonData]);

  React.useEffect(() => {
    localStorage.setItem('favoritePokemonIds', JSON.stringify(favoritePokemonIds));
  }, [favoritePokemonIds]);

  const isFavorite = favoritePokemonIds.includes(pokemonId);

  // Renderiza os dados do Pokémon ou a mensagem de carregamento
  return (
    <main>
      <div className="pokedex">
        {isLoading ? (
          <div className="loading-message">Carregando...</div>
        ) : (
          <>
            {pokemonData && !showStats && (
              <>
                <h1 className={`pokemon__data ${!showStats ? 'hidden' : ''}`}>
                  <span className="star">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        `/img/${isFavorite ? 'star-filled.png' : 'star-empty.png'}`
                      }
                      alt="Favorito"
                      className="star"
                      onClick={handleFavoriteClick}
                    />
                  </span>
                  <span>
                    <img src={process.env.PUBLIC_URL + '/img/shiny.gif'} alt="pokemon" className="pokemon__shiny" onClick={handleShinyClick} />
                  </span>
                </h1>
                <img src={imgURL} alt="pokemon" className="pokemon__image" />

                <h1 className={`pokemon__data ${!showStats ? 'hidden' : ''}`}>
                  <span className="pokemon__number">#{pokemonData.id}</span>
                  <span className="pokemon__name"> {pokemonData.name}</span>
                  <div className="pokemon__types">
                    {pokemonData.types.map(({ type }) => (
                      <span className={`type-icon type_bg-${type.name}`} key={type.name}>
                        {type.name}
                      </span>
                    ))}
                  </div>
                </h1>
              </>
            )}
            {pokemonData && showStats && (
              <h1 className="pokemon__detail">
                <div>
                  <Weaknesses
                    types={pokemonData.types}
                  />
                  <div className="pokemon__stats">
                    {pokemonData.stats.map((stat) => (
                      <p key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                      </p>
                    ))}
                  </div>
                </div>
              </h1>
            )}
          </>
        )}
        <form className="form" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="input__search"
            placeholder="Nome ou Número"
            required
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
        <div className="buttons">
          <button className="button btn-prev" onClick={handlePrevClick} disabled={isPrevDisabled}>
            Anterior &lt;
          </button>
          <button className="button btn-details" onClick={handleDetailClick}>
            {showStats ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
          </button>
          <button className="button btn-next" onClick={handleNextClick}>
            Próximo &gt;
          </button>
        </div>
        <img
          src={process.env.PUBLIC_URL + `/img/${bgImage}`}
          alt="pokedex"
          className="pokedex_bg"
        />
      </div>
    </main>
  );
};

export default memo(Pokedex);
