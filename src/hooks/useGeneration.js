import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPokemonData, fetchPokemons } from '../api';
import generations from '../data/generations';

/**
 * Hook para obter dados de uma geração de Pokemons pelo ID.
 *
 * @param {number} generationId - ID da geração para obter os dados.
 *
 * @return {Object}
 */
export default function useGeneration(generationId) {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generation = useMemo(() => {
    return generations.find((gen) => gen.id === generationId);
  }, [generationId]);

  // Função para buscar os dados dos Pokemons da geração.
  const fetchData = useCallback(() => {
    if (generation.limit === null || generation.offset === null) {
      return;
    }

    setIsLoading(true);
    setPokemons([]);

    // Obter todos os Pokemons da geração selecionada.
    fetchPokemons(generation.limit, generation.offset).then(async ({ results }) => {
      const data = [];

      // Obter os dados de cada Pokémon específico.
      await Promise.all(
        results.map(async ({ name }) => {
          const pokemon = await fetchPokemonData(name);

          data[pokemon.id] = pokemon;
        })
      );

      setPokemons(data);
      setIsLoading(false);
    });
  }, [generation]);

  // Refetch quando houver mudança na geração.
  useEffect(() => {
    if (generationId) {
      fetchData();
    }
  }, [generationId]);

  return {
    data: pokemons, // Dados dos Pokemons da geração
    refetch: fetchData, // Função para buscar novamente os dados
    isLoading, // Indicador de carregamento
  };
}
