import { useEffect } from 'react';
import { Card } from '../Card';
import { Loader } from '../Loader';
import { usePokemons } from '../../context/PokemonsProvider';
import { useGeneration } from '../../hooks';
import './PokedexView.css';

function PokedexView({ generation }) {
  const { pokemons, setPokemons, setCurrentPokemonId } = usePokemons();
  const { data, isLoading } = useGeneration(generation);

  useEffect(() => {
    setPokemons(data); // Atualiza a lista de Pokémon no contexto quando os dados da geração são carregados
  }, [data]);

  if (isLoading) {
    return <Loader />; // Renderiza o componente Loader enquanto os dados estão sendo carregados
  }

  return (
    <div className="pokedex-view">
      {pokemons.map((pokemon) => {
        return (
          <Card
            pokemon={pokemon}
            key={pokemon.id}
            onClick={() => setCurrentPokemonId(pokemon.id)} // Define o ID do Pokémon atual no contexto quando um Pokémon é clicado
          />
        );
      })}
    </div>
  );
}

export default PokedexView;
