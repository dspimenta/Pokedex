import { usePokemons } from '../../context/PokemonsProvider';
import { useNavigate } from 'react-router-dom';
import { getGenerationByPokemonId } from '../../utils';
import './EvolutionItem.css';

export default function EvolutionItem(props) {
  const { setCurrentPokemonId } = usePokemons();
  const navigate = useNavigate();

  const {
    currentId,
    currentName,
    currentImage,
    nextId,
    nextName,
    nextImage,
    trigger,
    triggerValue,
    onPokemonChange,
  } = props;

  const handleClick = (pokemonId) => {
    const { link } = getGenerationByPokemonId(pokemonId);

    // Navega para a página da geração do Pokémon
    if (navigate.pathname !== link) {
      navigate.push(link);
    }

    setCurrentPokemonId(pokemonId); // Define o ID do Pokémon atual
    onPokemonChange();
  };

  return (
    <div className="evolution-container">
      <div className="evolve-container evolve-from">
        <div className="image-container" onClick={() => handleClick(currentId)}>
          <div className="bg-pokeball"></div>
          <img alt={currentName} src={currentImage} />
        </div>

        <span>{currentName}</span>
      </div>

      <div className="trigger-container">
        <div className="arrow"></div>
        {trigger} {triggerValue}
      </div>

      <div className="evolve-container evolve-to" onClick={() => handleClick(nextId)}>
        <div className="image-container">
          <div className="bg-pokeball"></div>
          <img alt={nextName} src={nextImage} />
        </div>

        <span>{nextName}</span>
      </div>
    </div>
  );
}
