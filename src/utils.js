import generations from './data/generations';

/**
 * Itera recursivamente sobre uma cadeia de evolução e a normaliza em um array.
 *
 * @param {Object} evolution - Objeto de evolução da API.
 *
 * @returns {array}
 */
export const normalizeEvolutionChain = (evolution) => {
	if (!evolution.evolves_to.length) {
		return [];
	}

	const triggersDisplayName = {
		'level-up': 'Lvl',
		trade: 'Troca',
		'use-item': 'Uso',
	};

	// Extrai o ID do Pokémon a partir da URL da 'species' (https://pokeapi.co/api/v2/pokemon-species/{id}/).
	const extractId = (url) => url.match(/\/(\d+)\//)[1];

	return evolution.evolves_to.reduce((carry, nextEvolution) => {
		const details = nextEvolution.evolution_details[0],
			currentId = extractId(evolution.species.url),
			nextId = extractId(nextEvolution.species.url);

		carry.push({
			currentId,
			nextId,
			currentName: evolution.species.name,
			nextName: nextEvolution.species.name,
			currentImage: getImageURL(currentId),
			nextImage: getImageURL(nextId),
			trigger: triggersDisplayName[details.trigger.name],
			triggerValue: details.min_level || details.min_happiness || details.item?.name.replace('-', ' ') || '',
		});

		carry.push(...normalizeEvolutionChain(nextEvolution));

		return carry;
	}, []);
};

/**
 * Obtém a URL da imagem do Pokémon pelo ID.
 *
 * @param {string} pokemonId - ID do Pokémon.
 *
 * @returns {string}
 */
export const getImageURL = (pokemonId, isShiny) => {
	const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other';
	const imgUrl = process.env.PUBLIC_URL + '/img/pokemons/' + pokemonId;
	if (parseInt(pokemonId) <= 151) {
		if (isShiny)
			return `${imgUrl}/s_${pokemonId}.gif`;
		return `${imgUrl}/${pokemonId}.gif`;
	}

	// Tem apenas PNG.
	if (parseInt(pokemonId) >= 650) {
		return `${baseURL}/official-artwork/${pokemonId}.png`;
	}

	// Tem SVG.
	return `${baseURL}/dream-world/${pokemonId}.svg`;
};

export const getTypeImageURL = (type) => {
	const imgUrl = process.env.PUBLIC_URL + '/img/types';
	return `${imgUrl}/a_${type}.png`;
};

export const getCategoryImgURL = (type) => {
	const imgUrl = process.env.PUBLIC_URL + '/img/types';
	return `${imgUrl}/${type}`;
};

export const getMoveImageURL = (name) => {
	const imgUrl = process.env.PUBLIC_URL + '/img/ability';
	return `${imgUrl}/${name}.jpg`;
};

export const getMovePokemonGifURL = (id, name) => {
	const imgUrl = process.env.PUBLIC_URL + '/img/pokemons';
	return `${imgUrl}/${id}/moves/${name}.gif`;
};

export const getMoveGifURL = (name) => {
	const imgUrl = process.env.PUBLIC_URL + '/img/moves';
	return `${imgUrl}/${name}.gif`;
};

export const getAbilityImageURL = (name) => {
	const imgUrl = process.env.PUBLIC_URL + '/img/ability';
	return `${imgUrl}/${name}.gif`;

};

/**
 * Obtém o objeto de geração pelo ID do Pokémon.
 *
 * @param {number} id - ID do Pokémon.
 *
 * @returns {Object}
 */
export const getGenerationByPokemonId = (id) => {
	return generations.find(({ offset, limit }) => {
		const firstId = offset + 1;
		const lastId = firstId + limit;

		return id >= firstId && id <= lastId;
	});
};
