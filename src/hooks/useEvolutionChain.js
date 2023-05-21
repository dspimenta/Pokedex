import { useEffect, useState } from 'react';
import { useNormalizeEvolutionChain } from '.';
import { fetchPokemonEvolutionChain } from '../api';

// Hook para obter a cadeia de evolução pelo ID do Pokémon.
const useEvolutionChain = (pokemonId) => {
  // Estado para armazenar a evolução atual do Pokémon
  const [currentEvolution, setCurrentEvolution] = useState([]);
  // Estado para indicar se os dados estão sendo carregados
  const [isLoading, setIsLoading] = useState(false);
  // Utiliza o hook useNormalizeEvolutionChain para normalizar a cadeia de evolução
  const { evolutionChain } = useNormalizeEvolutionChain(currentEvolution);

  useEffect(() => {
    // Verifica se o ID do Pokémon foi fornecido
    if (pokemonId) {
      setIsLoading(true); // Define isLoading como true para exibir o indicador de carregamento

      // Chama a função fetchPokemonEvolutionChain para obter a cadeia de evolução do Pokémon
      fetchPokemonEvolutionChain(pokemonId).then((evolution) => {
        setCurrentEvolution(evolution); // Atualiza o estado currentEvolution com os dados obtidos
        setIsLoading(false); // Define isLoading como false para indicar que o carregamento foi concluído
      });
    }
  }, [pokemonId]);

  return {
    currentEvolution, // Evolução atual do Pokémon
    evolutionChain, // Cadeia de evolução normalizada
    isLoading, // Indicador de carregamento
  };
};

export default useEvolutionChain;
