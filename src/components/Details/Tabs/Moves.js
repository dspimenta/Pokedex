import React, { useState, useEffect, useRef } from "react";
import usePokemonApi from "../../../hooks/usePokemonApi";
import { MovesItem } from "../../MovesItem";

export default function Moves({ pokemonId }) {
  const { getPokemonById, updateSkillPoints, loading, error } = usePokemonApi();
  const [pokemonData, setPokemonData] = useState(null);
  const [skillPoints, setSkillPoints] = useState(0);
  const [allMoves, setAllMoves] = useState([]);
  const isDataFetched = useRef(false);
  const movesContainerRef = useRef(null);

  const updateMoveSkill = async (points) => {
    const updatedSkillPoints = skillPoints - 1;
    setSkillPoints(updatedSkillPoints);
    await updateSkillPoints(pokemonId, updatedSkillPoints);

    // Atualiza os dados do Pokémon após a atualização dos pontos de habilidade
    const updatedPokemonData = await getPokemonById(pokemonId);
    setPokemonData(updatedPokemonData);
    setAllMoves(updatedPokemonData.moves);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (!isDataFetched.current) {
          const data = await getPokemonById(pokemonId);
          setPokemonData(data);
          setSkillPoints(data.skill_points);
          setAllMoves(data.moves);
          isDataFetched.current = true;
        }
      } catch (error) {
        console.error("Erro ao obter os dados do Pokémon:", error);
      }
    };

    fetchPokemonData();
  }, [getPokemonById, pokemonId]);

  useEffect(() => {
    if (movesContainerRef.current) {
      movesContainerRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao obter os dados do Pokémon: {error}</div>;
  }

  if (!pokemonData) {
    return null;
  }

  return (
    <div className="moves pokemon__moves" ref={movesContainerRef}>
      <h2>Moves</h2>
      <label>Skill Points: {skillPoints}</label>

      <table className="moves-table">
        <thead>
          <tr>
            <th>Lvl</th>
            <th>Move / Type</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {pokemonData.moves.map((skill, index) => {
            return (
              <MovesItem
                pokemonId={pokemonId}
                key={skill.id}
                skill={skill}
                skillPoints={skillPoints}
                updateMoveSkill={updateMoveSkill}
                allMoves={allMoves}
                pokemonMoves={pokemonData.moves}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
