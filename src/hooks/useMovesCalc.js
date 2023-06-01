import { useState, useMemo, useCallback, useEffect } from "react";

const useMovesCalc = () => {
  const [movesCache, setMovesCache] = useState({});

  const getSelectedPointsForMove = useCallback((moveId, moves) => {
    const selectedMove = moves && moves.find((move) => move.id === moveId);
    return selectedMove ? selectedMove.selectedPoints : 0;
  }, []);

  const calculateMoveData = useCallback((moveData, moves) => {
    if (moveCalculations[moveData.id]) {
      return moveCalculations[moveData.id](moveData, moves);
    } else {
      return [moveData];
    }
  }, []);

  const calculateMoves = useCallback(
    (moveData, moves) => {
      try {
        if (movesCache[moveData.id]) {
          return movesCache[moveData.id];
        }

        const calculatedMove = calculateMoveData(moveData, moves);

        setMovesCache((prevCache) => ({
          ...prevCache,
          [moveData.id]: calculatedMove,
        }));

        return calculatedMove;
      } catch (error) {
        console.error("Erro ao calcular os atributos do movimento:", error);
        return [];
      }
    },
    [movesCache, calculateMoveData]
  );

  const tackle = useCallback(
    (moveData, moves) => {
      const tackle_p = getSelectedPointsForMove("tackle", moves);
      const takeDown_p = getSelectedPointsForMove("take_down", moves) * 0.05;
      const doubleEdge_p =
        getSelectedPointsForMove("double_edge", moves) * 0.05;

      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      for (let i = 0; i < tackle_p; i++) {
        damage += damage * 0.03;
        energy += energy * 0.03;
      }

      damage += damage * takeDown_p + damage * doubleEdge_p;

      return {
        ...moveData,
        damage: Math.round(damage),
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const take_down = useCallback(
    (moveData, moves) => {
      const tackle_p = getSelectedPointsForMove("tackle", moves) * 0.03;
      const takeDown_p = getSelectedPointsForMove("take_down", moves);
      const doubleEdge_p =
        getSelectedPointsForMove("double_edge", moves) * 0.03;

      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      for (let i = 0; i < takeDown_p; i++) {
        damage += damage * 0.03;
        energy += energy * 0.03;
      }

      damage += damage * tackle_p + damage * doubleEdge_p;

      return {
        ...moveData,
        damage: Math.round(damage),
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const moveCalculations = useMemo(
    () => ({
      tackle,
      take_down,
      // Outras funções de cálculo para movimentos adicionais podem ser adicionadas aqui
    }),
    [tackle]
  );

  useEffect(() => {
    setMovesCache({});
  }, []);

  return { calculateMoves };
};

export default useMovesCalc;
