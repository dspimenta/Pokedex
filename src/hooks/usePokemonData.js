import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonData } from '../api';

const usePokemonData = (pokemonId) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função assíncrona para buscar os dados do Pokémon
  const fetchPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPokemonData(pokemonId);
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [pokemonId]);

  // Efeito que é executado quando ocorre uma mudança na dependência 'fetchPokemon'
  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return {
    pokemonData, // Dados do Pokémon
    isLoading, // Indica se está ocorrendo o carregamento dos dados
    error, // Mensagem de erro, caso ocorra algum problema durante a busca dos dados
  };
};

export default usePokemonData;
