import { useState, useContext, createContext } from 'react';

export const PokemonsContext = createContext();

export default function PokemonsProvider( { children } ) {
	const [ pokemons, setPokemons ] = useState( [] );
	const [ currentPokemonId, setCurrentPokemonId ] = useState( -1 );

	// Define o Pokémon atual com base no ID atual
	const currentPokemon = pokemons[ currentPokemonId ];

	return (
		<PokemonsContext.Provider value={ { pokemons, setPokemons, currentPokemonId, setCurrentPokemonId, currentPokemon } }>
			{ children }
		</PokemonsContext.Provider>
	);
}

// Hook personalizado para utilizar o contexto de Pokémons
export const usePokemons = () => {
	return useContext( PokemonsContext );
};
