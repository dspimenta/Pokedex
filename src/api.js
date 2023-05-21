const BASE_URL = 'https://pokeapi.co/api/v2/';

const cache = {};

// Realiza uma requisição GET para a 'PokeAPI'.
const get = async (endpoint) => {
  if (!cache[endpoint]) {
    const data = await fetch(BASE_URL + endpoint).then((res) => res.json());

    cache[endpoint] = data;
  }

  return cache[endpoint];
};

// Busca todos os pokémons.
export const fetchPokemons = (limit, offset) => {
  return get(`pokemon?limit=${limit}&offset=${offset}`);
};

// Busca os dados de um pokémon específico.
export const fetchPokemonData = (pokemonId) => {
  return get(`pokemon/${pokemonId}`);
};

// Busca a cadeia de evolução de um pokémon.
export const fetchPokemonEvolutionChain = (pokemonId) => {
  return get(`pokemon-species/${pokemonId}`).then((data) => {
    const evolutionChainId = data.evolution_chain.url.match(/\/(\d+)\//)[1];

    return get(`evolution-chain/${evolutionChainId}`);
  });
};
