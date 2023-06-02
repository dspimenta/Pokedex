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
      const rockHead_p = getSelectedPointsForMove("rock_head", moves);

      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;
      let effectValue = moveData.effect[0].value;

      for (let i = 0; i < takeDown_p; i++) {
        damage += damage * 0.03;
        energy += energy * 0.03;
      }

      damage += damage * tackle_p + damage * doubleEdge_p;

      // Reducing the effect value based on the points selected for Rock Head
      effectValue -= rockHead_p * 3;

      // Creating a copy of the moveData to avoid modifying the original object
      const updatedMoveData = { ...moveData };

      // Updating the damage, energy, and effect value in the updatedMoveData
      updatedMoveData.damage = Math.round(damage);
      updatedMoveData.energy = Math.round(energy);
      updatedMoveData.effect[0].value = effectValue;

      return updatedMoveData;
    },
    [getSelectedPointsForMove]
  );

  const double_edge = useCallback(
    (moveData, moves) => {
      const tackle_p = getSelectedPointsForMove("tackle", moves) * 0.03;
      const takeDown_p = getSelectedPointsForMove("take_down", moves) * 0.03;
      const doubleEdge_p = getSelectedPointsForMove("double_edge", moves);
      const rockHead_p = getSelectedPointsForMove("rock_head", moves);

      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;
      let effectValue = moveData.effect[0].value;

      for (let i = 0; i < doubleEdge_p; i++) {
        damage += damage * 0.03;
        energy += energy * 0.03;
      }

      damage += damage * tackle_p + damage * takeDown_p;

      // Reducing the effect value based on the points selected for Rock Head
      effectValue -= rockHead_p * 3;

      // Creating a copy of the moveData to avoid modifying the original object
      const updatedMoveData = { ...moveData };

      // Updating the damage, energy, and effect value in the updatedMoveData
      updatedMoveData.damage = Math.round(damage);
      updatedMoveData.energy = Math.round(energy);
      updatedMoveData.effect[0].value = effectValue;

      return updatedMoveData;
    },
    [getSelectedPointsForMove]
  );

  const block = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Verifica se o efeito "defensive" está presente
      const defensiveEffect = moveData.effect.find(
        (effect) => effect.type === "defensive"
      );

      if (defensiveEffect) {
        // Obtém o valor do efeito de redução de dano
        let reductionValue = defensiveEffect.value;

        // Obtém o número de vezes que o movimento "Block" está selecionado
        const blockPoints = getSelectedPointsForMove("block", moves);

        // Aumenta a energia em 0.03 para cada ponto do movimento "Block"
        energy += blockPoints * moveData.baseEnergy * 0.1;

        // Aumenta o valor do efeito em 4 para cada ponto do movimento "Block"
        reductionValue += blockPoints * 4;

        // Atualiza o valor do efeito de redução de dano
        defensiveEffect.value = reductionValue;
      }

      return {
        ...moveData,
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const growl = useCallback(
    (moveData, moves) => {
      // Verifica se o efeito "status" está presente
      const statusEffect = moveData.effect.find(
        (effect) => effect.type === "status"
      );
      let energy = moveData.baseEnergy;
      if (statusEffect) {
        // Obtém o valor do efeito de redução do Ataque do alvo
        let debuffValue = statusEffect.value;

        // Obtém o número de vezes que o movimento "Growl" está selecionado
        const growlPoints = getSelectedPointsForMove("growl", moves);

        // Aumenta o valor do efeito em 5 para cada ponto do movimento "Growl"
        debuffValue += growlPoints * 5;

        // Atualiza o valor do efeito de redução do Ataque
        statusEffect.value = debuffValue;

        // Calcula a energia com base na baseEnergy do movimento
        energy += growlPoints * moveData.baseEnergy * 0.05;
      }

      return {
        ...moveData,
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const safeguard = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Verifica se o efeito "status" está presente
      const statusEffect = moveData.effect.find(
        (effect) => effect.type === "status"
      );

      if (statusEffect) {
        // Obtém o número de vezes que o movimento "Safeguard" está selecionado
        const safeguardPoints = getSelectedPointsForMove("safeguard", moves);

        // Aumenta a duração do efeito em 10 para cada ponto do movimento "Safeguard"
        statusEffect.duration += safeguardPoints * 10;

        // Calcula a energia com base nos pontos selecionados para o movimento "Safeguard"
        energy += safeguardPoints * moveData.baseEnergy * 0.03;
      }

      return {
        ...moveData,
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const harder = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Obtém o número de vezes que o movimento "Harder" está selecionado
      const harderPoints = getSelectedPointsForMove("harder", moves);

      // Calcula a energia com base nos pontos selecionados para o movimento "Harder"
      energy += harderPoints * moveData.baseEnergy * 0.03;

      // Percorre os efeitos do movimento "Harder"
      moveData.effect.forEach((effect) => {
        if (effect.type === "status") {
          // Calcula o novo valor do efeito para cada ponto do movimento "Harder"
          effect.value += harderPoints * effect.value;
        }
      });

      return {
        ...moveData,
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const tail_whip = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Obtém o número de vezes que o movimento "Tail Whip" está selecionado
      const tailWhipPoints = getSelectedPointsForMove("tail_whip", moves);

      // Calcula a energia com base nos pontos selecionados para o movimento "Tail Whip"
      energy += tailWhipPoints * moveData.baseEnergy * 0.05;

      // Percorre os efeitos do movimento "Tail Whip"
      moveData.effect.forEach((effect) => {
        if (effect.type === "status") {
          // Calcula o novo valor do efeito para cada ponto do movimento "Tail Whip"
          effect.value += tailWhipPoints * effect.value;
        }
      });

      return {
        ...moveData,
        energy: Math.round(energy),
      };
    },
    [getSelectedPointsForMove]
  );

  const protect = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let chance = moveData.effect[0].chance;

      // Obtém o número de vezes que o movimento "Protect" está selecionado
      const protectPoints = getSelectedPointsForMove("protect", moves);

      // Aumenta a energia e a chance com base nos pontos selecionados para o movimento "Protect"
      energy += protectPoints * 5;
      chance += protectPoints * 5;

      // Atualiza a energia e a chance no movimento "Protect"
      moveData.energy = energy;
      moveData.effect[0].chance = chance;

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const growth = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Aumenta a energia com base nos pontos selecionados para o movimento "Growth"
      const growthPoints = getSelectedPointsForMove("growth", moves);
      energy += growthPoints * 5;

      // Atualiza a energia e o valor dos efeitos no movimento "Growth"
      moveData.energy = energy;
      moveData.effect.forEach((effect) => {
        effect.value += growthPoints * 5;
      });

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const wrap = useCallback(
    (moveData, moves) => {
      let value = moveData.effect[0].value;
      let duration = moveData.effect[0].duration;
      let damage = moveData.damage;
      let energy = moveData.energy;

      // Obtém o número de vezes que o movimento "Wrap" está selecionado
      const wrapPoints = getSelectedPointsForMove("wrap", moves);

      // Incrementa o valor do efeito, a duração, o dano e a energia com base nos pontos selecionados
      value += wrapPoints;
      duration += wrapPoints * 5;
      damage += wrapPoints * 2;
      energy += wrapPoints * 2;

      // Atualiza os valores no movimento "Wrap"
      moveData.effect[0].value = value;
      moveData.effect[0].duration = duration;
      moveData.damage = damage;
      moveData.energy = energy;

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const energy_shield = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let defenseValue = moveData.effect[0].value;
      let bonusChance = moveData.effect[1].chance;

      // Obtém o número de vezes que o movimento "Energy Shield" está selecionado
      const energyShieldPoints = getSelectedPointsForMove(
        "energy_shield",
        moves
      );

      // Aumenta a energia em 5 para cada ponto do movimento "Energy Shield"
      energy += energyShieldPoints * 5;

      // Aumenta o valor do efeito "defensive" em 5% para cada ponto do movimento "Energy Shield"
      defenseValue += energyShieldPoints * 5;

      // Aumenta a chance do efeito "bonus" em 3% para cada ponto do movimento "Energy Shield"
      bonusChance += energyShieldPoints * 3;

      // Atualiza os valores no movimento "Energy Shield"
      moveData.energy = energy;
      moveData.effect[0].value = defenseValue;
      moveData.effect[1].chance = bonusChance;

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const scratch = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;

      // Obtém o número de vezes que o movimento "scratch" está selecionado
      const scratchPoints = getSelectedPointsForMove("scratch", moves);

      // Aumenta a energia em 3 para cada ponto do movimento "scratch"
      energy += scratchPoints * 3;

      // Aumenta o dano em 3 para cada ponto do movimento "scratch"
      damage += scratchPoints * 3;

      // Obtém o número de vezes que o movimento "slash" está selecionado
      const slashPoints = getSelectedPointsForMove("slash", moves);

      // Aumenta o dano em 2 por ponto do movimento "slash"
      damage += slashPoints * 2 * scratchPoints;

      // Atualiza os valores no movimento "scratch"
      moveData.energy = energy;
      moveData.damage = damage;

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const slash = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;

      // Obtém o número de vezes que o movimento "slash" está selecionado
      const slashPoints = getSelectedPointsForMove("slash", moves);

      // Aumenta a energia em 3.5 para cada ponto do movimento "slash"
      energy += slashPoints * 3.5;

      // Aumenta o dano em 3.2 para cada ponto do movimento "slash"
      damage += slashPoints * 3.2;

      // Obtém o número de vezes que o movimento "scratch" está selecionado
      const scratchPoints = getSelectedPointsForMove("scratch", moves);

      // Aumenta o dano em 2 por ponto do movimento "scratch"
      damage += scratchPoints * 2 * slashPoints;

      // Arredonda os valores de energia e dano
      energy = Math.round(energy);
      damage = Math.round(damage);

      // Atualiza os valores no movimento "slash"
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const rage = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;

      // Obtém o número de vezes que o movimento "rage" está selecionado
      const ragePoints = getSelectedPointsForMove("rage", moves);

      // Aumenta a energia em 3.5 para cada ponto do movimento "rage"
      energy += ragePoints * 3.5;

      // Aumenta o dano em 3.5 para cada ponto do movimento "rage"
      damage += ragePoints * 3.5;

      // Atualiza os valores no movimento "rage"
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const body_slam = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;
      let duration = moveData.effect[0].duration;
      let chance = moveData.effect[0].chance;

      // Obtém o número de vezes que o movimento "body_slam" está selecionado
      const bodySlamPoints = getSelectedPointsForMove("body_slam", moves);

      // Aumenta a energia em 2.5 para cada ponto do movimento "body_slam"
      energy += bodySlamPoints * 2.5;

      // Aumenta o dano em 4 para cada ponto do movimento "body_slam"
      damage += bodySlamPoints * 4;

      // Aumenta a duração do efeito em 4 para cada ponto do movimento "body_slam"
      duration += bodySlamPoints * 4;

      // Aumenta a chance do efeito em 5 para cada ponto do movimento "body_slam"
      chance += bodySlamPoints * 5;

      // Atualiza os valores no movimento "body_slam"
      moveData.energy = energy;
      moveData.damage = damage;
      moveData.effect[0].duration = duration;
      moveData.effect[0].chance = chance;

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const comet_punch = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;

      // Obtém o número de vezes que o movimento "comet_punch" está selecionado
      const cometPunchPoints = getSelectedPointsForMove("comet_punch", moves);

      // Aumenta a energia em 1.5 para cada ponto do movimento "comet_punch"
      energy += cometPunchPoints * 1.5;

      // Aumenta o dano em 2 para cada ponto do movimento "comet_punch"
      damage += cometPunchPoints * 2;

      // Atualiza os valores no movimento "comet_punch"
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const fury_attack = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;

      // Obtém o número de vezes que o movimento "fury_attack" está selecionado
      const furyAttackPoints = getSelectedPointsForMove("fury_attack", moves);

      // Aumenta a energia em 1.7 para cada ponto do movimento "fury_attack"
      energy += furyAttackPoints * 1.7;

      // Aumenta o dano em 2.2 para cada ponto do movimento "fury_attack"
      damage += furyAttackPoints * 2.2;

      // Arredonda os valores de energia e dano
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const pin_missile = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;

      // Obtém o número de vezes que o movimento "pin_missile" está selecionado
      const pinMissilePoints = getSelectedPointsForMove("pin_missile", moves);

      // Aumenta a energia em 1.5 para cada ponto do movimento "pin_missile"
      energy += pinMissilePoints * 1.5;

      // Aumenta o dano em 2.3 para cada ponto do movimento "pin_missile"
      damage += pinMissilePoints * 2.3;

      // Atualiza os valores no movimento "pin_missile"
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const thrash = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;
  
      // Obtém o número de vezes que o movimento "thrash" está selecionado
      const thrashPoints = getSelectedPointsForMove("thrash", moves);
  
      // Aumenta a energia em 1.5 para cada ponto do movimento "thrash"
      energy += thrashPoints * 1.5;
  
      // Aumenta o dano em 1.7 para cada ponto do movimento "thrash"
      damage += thrashPoints * 1.7;
  
      // Arredonda os valores de energia e dano
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);
  
      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const crush_claw = useCallback(
    (moveData, moves) => {
      let energy = moveData.energy;
      let damage = moveData.damage;
      let effectValue = moveData.effect[0].value;
      let effectChance = moveData.effect[0].chance;
  
      // Obtém o número de vezes que o movimento "crush_claw" está selecionado
      const crushClawPoints = getSelectedPointsForMove("crush_claw", moves);
  
      // Aumenta a energia em 2 para cada ponto do movimento "crush_claw"
      energy += crushClawPoints * 2;
  
      // Aumenta o dano em 3 para cada ponto do movimento "crush_claw"
      damage += crushClawPoints * 3;
  
      // Aumenta o valor do efeito "value" em 4 para cada ponto do movimento "crush_claw"
      effectValue += crushClawPoints * 4;
  
      // Aumenta a chance do efeito em 5 para cada ponto do movimento "crush_claw"
      effectChance += crushClawPoints * 5;
  
      // Arredonda os valores de energia e dano
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);
  
      // Atualiza os valores do efeito no movimento "crush_claw"
      moveData.effect[0].value = effectValue;
      moveData.effect[0].chance = effectChance;
  
      return moveData;
    },
    [getSelectedPointsForMove]
  );

  
  const moveCalculations = useMemo(
    () => ({
      tackle,
      take_down,
      double_edge,
      block,
      growl,
      safeguard,
      harder,
      tail_whip,
      protect,
      growth,
      wrap,
      energy_shield,
      scratch,
      slash,
      rage,
      body_slam,
      comet_punch,
      fury_attack,
      pin_missile,
      thrash,
      crush_claw,
    }),
    [tackle],
    [take_down],
    [double_edge],
    [block],
    [growl],
    [safeguard],
    [harder],
    [tail_whip],
    [protect],
    [growth],
    [wrap],
    [energy_shield],
    [scratch],
    [slash],
    [rage],
    [body_slam],
    [comet_punch],
    [fury_attack],
    [pin_missile],
    [thrash],
    [crush_claw],

  );

  useEffect(() => {
    setMovesCache({});
  }, []);

  return { calculateMoves };
};

export default useMovesCalc;
