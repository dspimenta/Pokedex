import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import { Loader } from '../Loader';
import { usePokemons } from '../../context/PokemonsProvider';
import { useGeneration } from '../../hooks';
import { FavoriteButton } from '../FavoriteButton';
import './PokedexView.css';

function PokedexView({ generation }) {
  const { pokemons, setPokemons, setCurrentPokemonId } = usePokemons();
  const { data, isLoading } = useGeneration(generation);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    setPokemons(data);
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const favoritePokemonIds = JSON.parse(localStorage.getItem('favoritePokemonIds')) || [];

  const filteredPokemons = showFavorites
    ? pokemons.filter((pokemon) => favoritePokemonIds.includes(pokemon.id))
    : pokemons;

  return (
    <div>
      <div>
        <FavoriteButton showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
      </div>
      <div className="pokedex-view">
        {filteredPokemons.map((pokemon) => (
          <Card
            pokemon={pokemon}
            key={pokemon.id}
            onClick={() => setCurrentPokemonId(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default PokedexView;
