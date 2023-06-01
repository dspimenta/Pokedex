import { useState, useEffect } from "react";
import moves from "../data/moves";

const usePokemonMoves = (moveId) => {
  const [moveData, setMoveData] = useState(null);

  useEffect(() => {
    const getMoveDataById = (id) => {
      
      return moves.find((move) => move.id === id) || null;
    };

    setMoveData(getMoveDataById(moveId));
  }, [moveId]);

  return moveData;
};

export default usePokemonMoves;
