import ReactDOM from 'react-dom';
import { useCallback, useState } from 'react';
import { usePokemons } from '../../context/PokemonsProvider';
import { BackButton } from '../BackButton';
import { Card } from '../Card';
import { Details } from '../Details';
import { Overlay } from '../Overlay';
import './DetailsView.css';

export default function DetailsView() {
  const { currentPokemon, setCurrentPokemonId } = usePokemons();
  const [isHidden, setIsHidden] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  // Função para fechar o modal
  const closeModal = useCallback(() => {
    setIsHidden(true);
  }, []);

  // Função para lidar com o término da animação de fechamento do modal
  const handleAnimationEnd = useCallback(({ animationName }) => {
    if (animationName !== 'pull-down-center') {
      return;
    }

    setIsHidden(false);
    setCurrentPokemonId(-1);
  }, []);

  // Função para lidar com o clique no card do Pokémon
  const handleCardClick = useCallback(() => {
    setIsShiny((prevIsShiny) => !prevIsShiny);
  }, []);

  if (!currentPokemon) {
    return null;
  }

  // Renderização do modal usando ReactDOM.createPortal
  return ReactDOM.createPortal(
    <>
      <Overlay hidden={isHidden} onClick={closeModal} />

      <div className={`details-view-container ${isHidden && 'hidden'}`} onAnimationEnd={handleAnimationEnd}>
        <BackButton onClick={closeModal} />
        <Card pokemon={currentPokemon} onClick={handleCardClick} />
        <Details pokemon={currentPokemon} isShiny={isShiny} />
      </div>
    </>,
    document.body
  );
}
