import React, { useState, useEffect, useRef } from "react";
import useMovesApi from "../../hooks/useMovesApi";
import { getMoveImageURL, getCategoryImgURL } from "../../utils";
import { SquarePoints } from "../SquarePoints";
import { MoveToolTip } from "../MoveToolTip";
import usePokemonApi from "../../hooks/usePokemonApi";
import useMovesCalc from "../../hooks/useMovesCalc";

import "./MovesItem.css";

export default function MovesItem({
  pokemonId,
  skill,
  skillPoints,
  updateMoveSkill,
  pokemonMoves,
  pokemonLevel,
}) {
  const { getMoveById } = useMovesApi();
  const [moveData, setMoveData] = useState(null);
  const { calculateMoves } = useMovesCalc();
  const [moveCalc, setMoveCalc] = useState(null);
  const [isMoveEnabled, setIsMoveEnabled] = useState(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const { updateMoveSkillPoints } = usePokemonApi();
  const moveRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchMoveData = async () => {
      try {
        const data = await getMoveById(skill.id);
        setMoveData(data);

        const calc = calculateMoves(data, pokemonMoves);
        setMoveCalc(calc);
      } catch (error) {
        console.error("Erro ao obter os dados do movimento:", error);
      }
    };

    fetchMoveData();
  }, [getMoveById, skill.id, calculateMoves, pokemonMoves]);

  useEffect(() => {
    if (!moveData) {
      setIsMoveEnabled(false);
      return;
    }

    if (!skill.requiredMove) {
      setIsMoveEnabled(true);
      return;
    }

    if (pokemonLevel < moveCalc.level) {
      setIsMoveEnabled(false);
      return;
    }

    const requiredMoves = Array.isArray(skill.requiredMove)
      ? skill.requiredMove
      : [skill.requiredMove];

    const areRequiredMovesSelected = requiredMoves.every((moveId) => {
      const requiredSkill = pokemonMoves.find((move) => move.id === moveId);
      return requiredSkill && requiredSkill.selectedPoints > 0;
    });

    setIsMoveEnabled(areRequiredMovesSelected);
  }, [moveData, skill, pokemonMoves]);

  const handlePointsUpdate = async (points) => {
    updateMoveSkill(points);

    const updatedMoves = pokemonMoves.map((move) => {
      if (move.id === skill.id) {
        return {
          ...move,
          selectedPoints: points,
        };
      }
      return move;
    });

    try {
      await updateMoveSkillPoints(pokemonId, moveData.id, points);
      const requiredMoves = Array.isArray(skill.requiredMove)
        ? skill.requiredMove
        : [skill.requiredMove];
      const areRequiredMovesSelected = requiredMoves.every((moveId) => {
        const requiredSkill = updatedMoves.find((move) => move.id === moveId);
        return requiredSkill && requiredSkill.selectedPoints > 0;
      });

      setIsMoveEnabled(areRequiredMovesSelected);
    } catch (error) {
      console.error(
        "Erro ao atualizar os pontos de habilidade do movimento:",
        error
      );
    }
  };

  const handleToolTipToggle = () => {
    setIsToolTipVisible(!isToolTipVisible);
  };

  const handleMoveClick = () => {
    setIsToolTipVisible(!isToolTipVisible);
  };

  const handleDescriptionClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const scrollPosition = JSON.parse(
      window.sessionStorage.getItem("scrollPosition") || "{}"
    );
    if (scrollPosition[skill.id]) {
      window.scrollTo(0, scrollPosition[skill.id]);
    }
  }, [skill.id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const scrollPosition = JSON.parse(
        window.sessionStorage.getItem("scrollPosition") || "{}"
      );
      scrollPosition[skill.id] = window.scrollY;
      window.sessionStorage.setItem(
        "scrollPosition",
        JSON.stringify(scrollPosition)
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [skill.id]);

  return (
    <>
      <tr
        id={moveData?.id}
        className={`move ${isMoveEnabled ? "" : "disabled"}`}
        onClick={handleMoveClick}
        ref={moveRef}
      >
        <td className="move-level">{skill.level}</td>
        <td className="" onClick={handleToolTipToggle}>
          <img
            className="move_image"
            src={getMoveImageURL(moveData?.id)}
            alt={moveData?.id}
            onClick={handleToolTipToggle}
          />
          {moveData?.type.map((t) => (
            <label
              key={t}
              className={`type-icon type-${t.toLowerCase()}`}
              id={moveData?.id}
            >
              {t}
            </label>
          ))}
        </td>
        <td>
          <label className="move_name">{moveData?.name}</label>
          <SquarePoints
            totalSquares={skill.points}
            selectedSquares={skill.selectedPoints}
            skillPoints={skillPoints}
            updateMoveSkill={handlePointsUpdate}
            disabled={!isMoveEnabled}
            pokemonLevel={pokemonLevel}
          />
          <div
            className="move-description"
            onClick={handleDescriptionClick}
            ref={descriptionRef}
          >
            <img
              className="move_category_img"
              src={getCategoryImgURL(moveData?.categoryImg)}
              alt={moveData?.category}
            />
            <label className="move_base_description">
              &nbsp;Damage:{" "}
              <label className="damage">
                {moveCalc && moveCalc.damage !== undefined
                  ? moveCalc.damage
                  : 0}
              </label>
            </label>

            <label className="move_base_description">
              &nbsp;Energy:
              <label className="energy">
                {moveCalc && moveCalc.energy !== undefined
                  ? moveCalc.energy
                  : 0}
              </label>{" "}
            </label>
          </div>
        </td>
      </tr>
      {isToolTipVisible && (
        <tr>
          <td colSpan={3}>
            <MoveToolTip
              pokemonId={pokemonId}
              moveData={moveCalc}
              skill={skill}
              moveRef={moveRef}
              descriptionRef={descriptionRef}
            />
          </td>
        </tr>
      )}
    </>
  );
}
