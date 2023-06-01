import { useState } from "react";

const useMovesApi = () => {
  const [movesCache, setMovesCache] = useState({}); // Cache para armazenar os dados dos movimentos já obtidos

  const getMoveById = async (id) => {
    if (movesCache[id]) {
      return movesCache[id]; // Retorna os dados do movimento diretamente do cache, se disponíveis
    }

    try {
      const response = await fetch(`http://localhost:5000/moves/${id}`); // Substitua pela URL correta da sua API de movimentos
      if (!response.ok) {
        throw new Error("Erro ao obter os dados do movimento");
      }
      const data = await response.json();

      // Atualiza o cache com os dados do movimento
      setMovesCache((prevCache) => ({
        ...prevCache,
        [id]: data,
      }));

      return data;
    } catch (error) {
      console.error("Erro ao obter os dados do movimento:", error);
      throw error;
    }
  };

  return {
    getMoveById,
  };
};

export default useMovesApi;
