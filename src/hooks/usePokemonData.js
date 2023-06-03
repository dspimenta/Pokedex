import { useCallback, useEffect, useState } from "react";
import { fetchPokemonData } from "../api";


const usePokemonData = (pokemonId) => {
  const [setPokemonData] = useState(null);
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
    // eslint-disable-next-line
  }, [pokemonId]);

  // Efeito que é executado quando ocorre uma mudança na dependência 'fetchPokemon'
  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  // const getPokemonDataById = (id) => {
  //   return pokemonList.find((pokemon) => pokemon.id === id) || null;
  // };

  return {
    // pokemonData: getPokemonDataById(pokemonId), // Dados do Pokémon
    isLoading, // Indica se está ocorrendo o carregamento dos dados
    error, // Mensagem de erro, caso ocorra algum problema durante a busca dos dados
  };
};

export default usePokemonData;
