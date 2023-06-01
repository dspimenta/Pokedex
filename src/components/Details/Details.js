import { memo, useState } from "react";
import About from "./Tabs/About";
import BaseStats from "./Tabs/BaseStats";
import Evolution from "./Tabs/Evolution";
import Moves from "./Tabs/Moves";
import Effectiveness from "./Tabs/Effectiveness";
import { getImageURL } from "../../utils";
import "./Details.css";

const TAB_ABOUT = "about";
const TAB_STATS = "base-stats";
const TAB_MOVES = "moves";
const TAB_EVOLUTION = "evolution";
const TAB_EFFECTIVENESS = "effectiveness";
const TAB_DEFAULT = TAB_ABOUT;

const tabs = [
  {
    id: TAB_ABOUT,
    label: "Sobre",
  },
  {
    id: TAB_STATS,
    label: "Estatísticas Básicas",
  },
  {
    id: TAB_MOVES,
    label: "Moves",
  },
  {
    id: TAB_EVOLUTION,
    label: "Evolução",
  },
  {
    id: TAB_EFFECTIVENESS,
    label: "Vantagens e Desvantagens",
  },
];

function Details({ pokemon }) {
  const [currentTab, setCurrentTab] = useState(TAB_DEFAULT);
  const [isShiny, setIsShiny] = useState(false);
  const imgURL = getImageURL(pokemon?.id, isShiny);

  if (!pokemon) {
    return null;
  }

  // Retorna o nome da classe do switch de guias.
  const getClassName = (tabName) => {
    return `tab-switch ${currentTab === tabName ? "active" : ""}`;
  };

  // Altera o Pokémon atual e volta para a primeira guia.
  const onPokemonChange = () => {
    setCurrentTab(TAB_DEFAULT);
  };

  const handleShinyClick = () => {
    setIsShiny(!isShiny);
  };

  return (
    <div className="details">
      <div>
        <img src={imgURL} className="pokemon-image" alt={pokemon.name} />
        <img
          alt="shiny"
          className="pokemon-shiny"
          src={process.env.PUBLIC_URL + "/img/shiny.gif"}
          onMouseOver={handleShinyClick}
        />
      </div>
      <div className="tabs-switch-container">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            className={getClassName(id)}
            onClick={() => setCurrentTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {(() => {
        switch (currentTab) {
          case TAB_ABOUT:
            return <About pokemon={pokemon} />;
          case TAB_STATS:
            return <BaseStats stats={pokemon.stats} />;
          case TAB_EVOLUTION:
            return (
              <Evolution pokemon={pokemon} onPokemonChange={onPokemonChange} />
            );
          case TAB_MOVES:
            return (
              <Moves pokemonId={pokemon.id} onPokemonChange={onPokemonChange} />
            );
          case TAB_EFFECTIVENESS:
            return (
              <Effectiveness
                pokemon={pokemon}
                onPokemonChange={onPokemonChange}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default memo(Details);
