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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let energy = moveData.baseEnergy;
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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;
      let duration = moveData.effect[0].duration;
      let chance = moveData.effect[0].chance;

      // Obtém o número de vezes que o movimento "body_slam" está selecionado
      const bodySlamPoints = getSelectedPointsForMove("body_slam", moves);

      // Aumenta a energia em 2.5 para cada ponto do movimento "body_slam"
      energy += bodySlamPoints * 4.5;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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

  const fury_swipes = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtém o número de vezes que o movimento "fury_swipes" está selecionado
      const furySwipesPoints = getSelectedPointsForMove("fury_swipes", moves);

      // Aumenta a energia em 2 para cada ponto do movimento "fury_swipes"
      energy += furySwipesPoints * 2;

      // Aumenta o dano em 3 para cada ponto do movimento "fury_swipes"
      damage += furySwipesPoints * 3;

      // Obtém o número de vezes que o movimento "technician" está selecionado
      const technicianPoints = getSelectedPointsForMove("technician", moves);

      // Aumenta o dano em 5 para cada ponto do movimento "technician"
      damage += technicianPoints * 5;

      // Arredonda os valores de energia e dano
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const thrash = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

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
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;
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

  const mega_kick = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;
      let accuracy = moveData.baseAccuracy;

      // Obtain the number of times the "mega_kick" move is selected
      const megaKickPoints = getSelectedPointsForMove("mega_kick", moves);

      // Increase the energy by 2.5 for each point of the "mega_kick" move
      energy += megaKickPoints * 2.5;

      // Increase the damage by 5 for each point of the "mega_kick" move
      damage += megaKickPoints * 5;

      // Obtain the number of times the "keen_eye" move is selected
      const keenEyePoints = getSelectedPointsForMove("keen_eye", moves);

      // Increase the accuracy by 2 for each point of the "keen_eye" move
      accuracy += keenEyePoints * 2;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);
      moveData.accuracy = Math.round(accuracy);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const mega_punch = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;
      let accuracy = moveData.baseAccuracy;

      // Obtain the number of times the "mega_punch" move is selected
      const megaPunchPoints = getSelectedPointsForMove("mega_punch", moves);

      // Increase the energy by 2.5 for each point of the "mega_punch" move
      energy += megaPunchPoints * 2.5;

      // Increase the damage by 5 for each point of the "mega_punch" move
      damage += megaPunchPoints * 5;

      // Obtain the number of times the "keen_eye" move is selected
      const keenEyePoints = getSelectedPointsForMove("keen_eye", moves);

      // Increase the accuracy by 2 for each point of the "keen_eye" move
      accuracy += keenEyePoints * 2;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);
      moveData.accuracy = Math.round(accuracy);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const dizzy_punch = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "dizzy_punch" move is selected
      const dizzyPunchPoints = getSelectedPointsForMove("dizzy_punch", moves);

      // Increase the energy by 3 for each point of the "dizzy_punch" move
      energy += dizzyPunchPoints * 3;

      // Increase the damage by 5 for each point of the "dizzy_punch" move
      damage += dizzyPunchPoints * 5;

      // Increase the duration and chance by 5 for each point of the "dizzy_punch" move
      moveData.effect[0].duration += dizzyPunchPoints * 5;
      moveData.effect[0].chance += dizzyPunchPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const pound = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "pound" move is selected
      const poundPoints = getSelectedPointsForMove("pound", moves);

      // Increase the energy by 1.5 for each point of the "pound" move
      energy += poundPoints * 1.5;

      // Increase the damage by 2 for each point of the "pound" move
      damage += poundPoints * 2;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const quick_attack = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "quick_attack" move is selected
      const quickAttackPoints = getSelectedPointsForMove("quick_attack", moves);

      // Increase the energy by 2.5 for each point of the "quick_attack" move
      energy += quickAttackPoints * 2.5;

      // Increase the damage by 3 for each point of the "quick_attack" move
      damage += quickAttackPoints * 3;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const rapid_spin = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "rapid_spin" move is selected
      const rapidSpinPoints = getSelectedPointsForMove("rapid_spin", moves);

      // Increase the energy by 4 for each point of the "rapid_spin" move
      energy += rapidSpinPoints * 4;

      // Increase the damage by 5 for each point of the "rapid_spin" move
      damage += rapidSpinPoints * 5;

      // Increase the value and chance by 5 for each point of the "rapid_spin" move (effect[1])
      moveData.effect[1].value += rapidSpinPoints * 5;
      moveData.effect[1].chance += rapidSpinPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const extreme_speed = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "extreme_speed" move is selected
      const extremeSpeedPoints = getSelectedPointsForMove(
        "extreme_speed",
        moves
      );

      // Increase the energy by 4 for each point of the "extreme_speed" move
      energy += extremeSpeedPoints * 4;

      // Increase the damage by 5 for each point of the "extreme_speed" move
      damage += extremeSpeedPoints * 5;

      // Increase the duration by 2 and chance by 3.5 for each point of the "extreme_speed" move (effect[0])
      moveData.effect[0].duration += extremeSpeedPoints * 2;
      moveData.effect[0].chance += extremeSpeedPoints * 3.5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const skull_bash = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "skull_bash" move is selected
      const skullBashPoints = getSelectedPointsForMove("skull_bash", moves);

      // Increase the energy by 4 for each point of the "skull_bash" move
      energy += skullBashPoints * 4;

      // Increase the damage by 5 for each point of the "skull_bash" move
      damage += skullBashPoints * 5;

      // Increase the value by 5 for each point of the "skull_bash" move (effect[0])
      moveData.effect[0].value += skullBashPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const slam = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "slam" move is selected
      const slamPoints = getSelectedPointsForMove("slam", moves);

      // Increase the energy by 3 for each point of the "slam" move
      energy += slamPoints * 3;

      // Increase the damage by 5 for each point of the "slam" move
      damage += slamPoints * 5;

      // Increase the duration by 3 and chance by 5 for each point of the "slam" move (effect[0])
      moveData.effect[0].duration += slamPoints * 3;
      moveData.effect[0].chance += slamPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const giga_impact = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "giga_impact" move is selected
      const gigaImpactPoints = getSelectedPointsForMove("giga_impact", moves);

      // Reduce the energy by 3 for each point of the "giga_impact" move
      energy -= gigaImpactPoints * 3;

      // Increase the damage by 5 for each point of the "giga_impact" move
      damage += gigaImpactPoints * 5;

      // Reduce the duration by 3 and chance by 5 for each point of the "giga_impact" move (effect[0])
      moveData.effect[0].duration -= gigaImpactPoints * 3;
      moveData.effect[0].chance -= gigaImpactPoints * 5;

      // Apply the bonus from the "early-bird" move
      const earlyBirdPoints = getSelectedPointsForMove("early-bird", moves);
      moveData.effect[0].duration -= earlyBirdPoints * 2;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const headbutt = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "headbutt" move is selected
      const headbuttPoints = getSelectedPointsForMove("headbutt", moves);

      // Increase the energy by 5 for each point of the "headbutt" move
      energy += headbuttPoints * 5;

      // Increase the damage by 5 for each point of the "headbutt" move
      damage += headbuttPoints * 5;

      // Increase the duration by 5 and chance by 5 for each point of the "headbutt" move (effect[0])
      moveData.effect[0].duration += headbuttPoints * 5;
      moveData.effect[0].chance += headbuttPoints * 5;

      // Apply the bonus from the "sheer_force" move
      const sheerForcePoints = getSelectedPointsForMove("sheer_force", moves);
      damage += sheerForcePoints * 2;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const horn_attack = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "horn_attack" move is selected
      const hornAttackPoints = getSelectedPointsForMove("horn_attack", moves);

      // Increase the energy by 3 for each point of the "horn_attack" move
      energy += hornAttackPoints * 3;

      // Increase the damage by 4 for each point of the "horn_attack" move
      damage += hornAttackPoints * 4;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const hyper_beam = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "hyper_beam" move is selected
      const hyperBeamPoints = getSelectedPointsForMove("hyper_beam", moves);

      // Increase the energy by 2 for each point of the "hyper_beam" move
      energy += hyperBeamPoints * 2;

      // Increase the damage by 5 for each point of the "hyper_beam" move
      damage += hyperBeamPoints * 5;

      // Decrease the effect[0] duration by 3 and chance by 5 for each point of the "hyper_beam" move
      moveData.effect[0].duration -= hyperBeamPoints * 3;
      moveData.effect[0].chance -= hyperBeamPoints * 5;

      // Increase the effect[1] duration by 3 and chance by 5 for each point of the "hyper_beam" move
      moveData.effect[1].duration += hyperBeamPoints * 3;
      moveData.effect[1].chance += hyperBeamPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const hyper_fang = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "hyper_fang" move is selected
      const hyperFangPoints = getSelectedPointsForMove("hyper_fang", moves);

      // Increase the energy by 4 for each point of the "hyper_fang" move
      energy += hyperFangPoints * 4;

      // Increase the damage by 5 for each point of the "hyper_fang" move
      damage += hyperFangPoints * 2.5;

      // Obtain the number of times the "super_fang" move is selected
      const superFangPoints = getSelectedPointsForMove("super_fang", moves);

      // Increase the damage by 2 for each point of the "super_fang" move
      damage += superFangPoints * 2;

      // Increase the effect[0] duration by 3 and chance by 5 for each point of the "hyper_fang" move
      moveData.effect[0].duration += hyperFangPoints * 3;
      moveData.effect[0].chance += hyperFangPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const super_fang = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "super_fang" move is selected
      const superFangPoints = getSelectedPointsForMove("super_fang", moves);

      // Increase the damage by 3 for each point of the "super_fang" move
      energy -= superFangPoints * 3;

      // Obtain the number of times the "hyper_fang" move is selected
      const hyperFangPoints = getSelectedPointsForMove("hyper_fang", moves);

      // Reduce the energy by 2 for each point of the "hyper_fang" move
      energy -= hyperFangPoints * 2;

      // Increase the effect[0] value by 3 for each point of the "super_fang" move
      moveData.effect[0].value += superFangPoints * 3;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const tri_attack = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "tri_attack" move is selected
      const triAttackPoints = getSelectedPointsForMove("tri_attack", moves);

      // Increase the energy by 5 for each point of the "tri_attack" move
      energy += triAttackPoints * 5;

      // Increase the damage by 5 for each point of the "tri_attack" move
      damage += triAttackPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const max_strike = useCallback(
    (moveData, moves) => {
      let damage = moveData.baseDamage;
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "max_strike" move is selected
      const maxStrikePoints = getSelectedPointsForMove("max_strike", moves);

      // Increase the energy by 5 for each point of the "max_strike" move
      energy += maxStrikePoints * 5;

      // Increase the damage by 5 for each point of the "max_strike" move
      damage += maxStrikePoints * 5;

      // Apply the effect on duration and chance
      moveData.effect[0].duration += maxStrikePoints * 3;
      moveData.effect[0].chance += maxStrikePoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const defense_curl = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;

      // Obtain the number of times the "defense_curl" move is selected
      const defenseCurlPoints = getSelectedPointsForMove("defense_curl", moves);

      // Increase the energy by 5 for each point of the "defense_curl" move
      energy += defenseCurlPoints * 5;

      // Apply the effect on value
      moveData.effect[0].value += defenseCurlPoints * 3;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const disable = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let damage = moveData.baseDamage;

      // Obtain the number of times the "disable" move is selected
      const disablePoints = getSelectedPointsForMove("disable", moves);

      // Increase the energy by 4 for each point of the "disable" move
      energy += disablePoints * 4;

      // Apply the effect on duration
      moveData.effect[0].duration += disablePoints * 6;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const double_team = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let damage = moveData.baseDamage;

      // Obtain the number of times the "double_team" move is selected
      const doubleTeamPoints = getSelectedPointsForMove("double_team", moves);

      // Increase the energy by 5 for each point of the "double_team" move
      energy += doubleTeamPoints * 5;

      // Apply the effect on value
      moveData.effect[0].value += doubleTeamPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const endure = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let damage = moveData.baseDamage;

      // Obtain the number of times the "endure" move is selected
      const endurePoints = getSelectedPointsForMove("endure", moves);

      // Increase the energy by 5.5 for each point of the "endure" move
      energy += endurePoints * 5.5;

      // Apply the effect on value
      moveData.effect[0].value += endurePoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const self_destruct = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let damage = moveData.baseDamage;

      // Obtain the number of times the "self_destruct" move is selected
      const selfDestructPoints = getSelectedPointsForMove(
        "self_destruct",
        moves
      );

      // Increase the energy by 5 for each point of the "self_destruct" move
      energy += selfDestructPoints * 5;

      // Increase the damage by 10 for each point of the "self_destruct" move
      damage += selfDestructPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const explosion = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let damage = moveData.baseDamage;

      // Obtain the number of times the "explosion" move is selected
      const explosionPoints = getSelectedPointsForMove("explosion", moves);

      // Increase the energy by 5.5 for each point of the "explosion" move
      energy += explosionPoints * 5.5;

      // Increase the damage by 5 for each point of the "explosion" move
      damage += explosionPoints * 5;

      // Obtain the number of times the "self_destruct" move is selected
      const selfDestructPoints = getSelectedPointsForMove(
        "self_destruct",
        moves
      );

      // Add bonus damage from "self_destruct" move
      damage += selfDestructPoints * 5;

      // Round the energy and damage values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const flash = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "flash" move is selected
      const flashPoints = getSelectedPointsForMove("flash", moves);

      // Increase the energy by 2 for each point of the "flash" move
      energy += flashPoints * 2;

      // Increase the value by 5 for each point of the "flash" move
      value += flashPoints * 5;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const focus_energy = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "focus_energy" move is selected
      const focusEnergyPoints = getSelectedPointsForMove("focus_energy", moves);

      // Increase the energy by 5 for each point of the "focus_energy" move
      energy += focusEnergyPoints * 5;

      // Increase the value by 5 for each point of the "focus_energy" move
      value += focusEnergyPoints * 5;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const last_resort = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let damage = moveData.baseDamage;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "last_resort" move is selected
      const lastResortPoints = getSelectedPointsForMove("last_resort", moves);

      // Increase the energy by 3 for each point of the "last_resort" move
      energy += lastResortPoints * 3;

      // Increase the damage by 3 for each point of the "last_resort" move
      damage += lastResortPoints * 3;

      // Increase the value by 5 for each point of the "last_resort" move
      value += lastResortPoints * 5;

      // Round the energy, damage, and value values
      moveData.energy = Math.round(energy);
      moveData.damage = Math.round(damage);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const leer = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "leer" move is selected
      const leerPoints = getSelectedPointsForMove("leer", moves);

      // Increase the energy by 3 for each point of the "leer" move
      energy += leerPoints * 3;

      // Increase the value by 5 for each point of the "leer" move
      value += leerPoints * 5;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const screech = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "screech" move is selected
      const screechPoints = getSelectedPointsForMove("screech", moves);

      // Increase the energy by 6 for each point of the "screech" move
      energy += screechPoints * 6;

      // Increase the value by 6 for each point of the "screech" move
      value += screechPoints * 6;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const shell_smash = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let values = moveData.effects.map((effect) => effect.value);

      // Obtain the number of times the "shell_smash" move is selected
      const shellSmashPoints = getSelectedPointsForMove("shell_smash", moves);

      // Increase the energy by 5 for each point of the "shell_smash" move
      energy += shellSmashPoints * 5;

      // Increase the values of effects 0, 1, and 2 by 3 for each point of the "shell_smash" move
      for (let i = 0; i < 3; i++) {
        values[i] += shellSmashPoints * 3;
      }

      // Increase the values of effects 3 and 4 by 5 for each point of the "shell_smash" move
      for (let i = 3; i < 5; i++) {
        values[i] += shellSmashPoints * 5;
      }

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects.forEach((effect, index) => {
        effect.value = Math.round(values[index]);
      });

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const recover = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "recover" move is selected
      const recoverPoints = getSelectedPointsForMove("recover", moves);

      // Increase the energy by 5 for each point of the "recover" move
      energy += recoverPoints * 5;

      // Increase the value by 10 for each point of the "recover" move
      value += recoverPoints * 10;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const scary_face = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "scary_face" move is selected
      const scaryFacePoints = getSelectedPointsForMove("scary_face", moves);

      // Increase the energy by 5 for each point of the "scary_face" move
      energy += scaryFacePoints * 5;

      // Increase the value by 5 for each point of the "scary_face" move
      value += scaryFacePoints * 5;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const sing = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let duration = moveData.effects[0].duration;

      // Obtain the number of times the "sing" move is selected
      const singPoints = getSelectedPointsForMove("sing", moves);

      // Increase the energy by 5 for each point of the "sing" move
      energy += singPoints * 5;

      // Increase the duration by 5 for each point of the "sing" move
      duration += singPoints * 5;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].duration = Math.round(duration);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const smokescreen = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "smokescreen" move is selected
      const smokescreenPoints = getSelectedPointsForMove("smokescreen", moves);

      // Increase the energy by 5 for each point of the "smokescreen" move
      energy += smokescreenPoints * 5;

      // Increase the value by 3 for each point of the "smokescreen" move
      value += smokescreenPoints * 3;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const supersonic = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let duration = moveData.effects[0].duration;

      // Obtain the number of times the "supersonic" move is selected
      const supersonicPoints = getSelectedPointsForMove("supersonic", moves);

      // Increase the energy by 5 for each point of the "supersonic" move
      energy += supersonicPoints * 5;

      // Increase the duration by 5 for each point of the "supersonic" move
      duration += supersonicPoints * 5;

      // Round the energy and duration values
      moveData.energy = Math.round(energy);
      moveData.effects[0].duration = Math.round(duration);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const swords_dance = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "swords_dance" move is selected
      const swordsDancePoints = getSelectedPointsForMove("swords_dance", moves);

      // Increase the energy by 5 for each point of the "swords_dance" move
      energy += swordsDancePoints * 5;

      // Increase the value by 3 for each point of the "swords_dance" move
      value += swordsDancePoints * 3;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const sweet_scent = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let value = moveData.effects[0].value;

      // Obtain the number of times the "sweet_scent" move is selected
      const sweetScentPoints = getSelectedPointsForMove("sweet_scent", moves);

      // Increase the energy by 5 for each point of the "sweet_scent" move
      energy += sweetScentPoints * 5;

      // Increase the value by 5 for each point of the "sweet_scent" move
      value += sweetScentPoints * 5;

      // Round the energy and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].value = Math.round(value);

      return moveData;
    },
    [getSelectedPointsForMove]
  );

  const protective_shield = useCallback(
    (moveData, moves) => {
      let energy = moveData.baseEnergy;
      let chance = moveData.effects[0].chance;
      let value = moveData.effects[1].value;

      // Obtain the number of times the "protective_shield" move is selected
      const protectiveShieldPoints = getSelectedPointsForMove(
        "protective_shield",
        moves
      );

      // Increase the energy by 5 for each point of the "protective_shield" move
      energy += protectiveShieldPoints * 5;

      // Increase the chance by 5 for each point of the "protective_shield" move
      chance += protectiveShieldPoints * 5;

      // Increase the value by 5 for each point of the "protective_shield" move
      value += protectiveShieldPoints * 5;

      // Round the energy, chance, and value values
      moveData.energy = Math.round(energy);
      moveData.effects[0].chance = Math.round(chance);
      moveData.effects[1].value = Math.round(value);

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
      fury_swipes,
      thrash,
      crush_claw,
      mega_kick,
      mega_punch,
      dizzy_punch,
      pound,
      quick_attack,
      rapid_spin,
      extreme_speed,
      skull_bash,
      slam,
      giga_impact,
      headbutt,
      horn_attack,
      hyper_beam,
      hyper_fang,
      super_fang,
      tri_attack,
      max_strike,
      defense_curl,
      disable,
      double_team,
      endure,
      self_destruct,
      explosion,
      flash,
      focus_energy,
      last_resort,
      leer,
      screech,
      shell_smash,
      recover,
      scary_face,
      sing,
      smokescreen,
      supersonic,
      swords_dance,
      sweet_scent,
      protective_shield,
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
    [fury_swipes],
    [thrash],
    [crush_claw],
    [mega_kick],
    [mega_punch],
    [dizzy_punch],
    [pound],
    [quick_attack],
    [rapid_spin],
    [extreme_speed],
    [skull_bash],
    [slam],
    [giga_impact],
    [headbutt],
    [horn_attack],
    [hyper_beam],
    [hyper_fang],
    [super_fang],
    [tri_attack],
    [max_strike],
    [defense_curl],
    [disable],
    [double_team],
    [endure],
    [self_destruct],
    [explosion],
    [flash],
    [focus_energy],
    [last_resort],
    [leer],
    [screech],
    [shell_smash],
    [recover],
    [scary_face],
    [sing],
    [smokescreen],
    [supersonic],
    [swords_dance],
    [sweet_scent],
    [protective_shield]
  );

  useEffect(() => {
    setMovesCache({});
  }, []);

  return { calculateMoves };
};

export default useMovesCalc;
