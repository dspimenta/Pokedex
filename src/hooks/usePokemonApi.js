import { useState } from "react";

const usePokemonApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/pokemon");
      if (!response.ok) {
        throw new Error("Erro ao obter os dados dos pokémons");
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getPokemonById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao obter os dados do Pokémon");
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getPokemonByName = async (name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/pokemon/name/${name}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter os dados do Pokémon");
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const createPokemon = async (pokemonData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonData),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar o Pokémon");
      }
      setLoading(false);
      return { message: "Pokémon adicionado com sucesso" };
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const updatePokemon = async (id, updatedPokemon) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/pokemon/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPokemon),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar o Pokémon");
      }
      setLoading(false);
      const data = await response.json();
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const updatePokemonMoves = async (pokemonId, movesArray) => {
    try {
      const response = await fetch(
        `http://localhost:5000/pokemon/${pokemonId}/moves`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ moves: movesArray }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar os movimentos do Pokémon");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao atualizar os movimentos do Pokémon:", error);
      throw error;
    }
  };

  const updateSkillPoints = async (pokemonId, skillPoints) => {
    try {
      const response = await fetch(
        `http://localhost:5000/pokemon/${pokemonId}/skill-points/${skillPoints}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar os pontos de habilidade do Pokémon");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Erro ao atualizar os pontos de habilidade do Pokémon:",
        error
      );
      throw error;
    }
  };

  const updateMoveSkillPoints = async (pokemonId, moveId, selectedPoints) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/pokemon/moves/skill-points",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pokemonId, moveId, selectedPoints }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erro ao atualizar os pontos de habilidade do movimento do Pokémon"
        );
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return {
    getAllPokemon,
    getPokemonById,
    getPokemonByName,
    createPokemon,
    updatePokemon,
    updatePokemonMoves,
    updateMoveSkillPoints,
    updateSkillPoints,
    loading,
    error,
  };
};

export default usePokemonApi;
