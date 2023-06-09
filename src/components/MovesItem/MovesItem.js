import React, { useState, useEffect, useRef } from "react";
import useMovesApi from "../../hooks/useMovesApi";
import { getMoveImageURL, getCategoryImgURL } from "../../utils";
import { SquarePoints } from "../SquarePoints";
import { MoveToolTip } from "../MoveToolTip";
import usePokemonApi from "../../hooks/usePokemonApi";
import useMovesCalc from "../../hooks/useMovesCalc";
import { Loader } from "../Loader";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoveData = async () => {
      try {
        setIsLoading(true);
        const data = await getMoveById(skill.id);
        setMoveData(data);

        const calc = calculateMoves(data, pokemonMoves);
        setMoveCalc(calc);
      } catch (error) {
        console.error("Error fetching move data:", error);
      }
    };

    fetchMoveData();
    setIsLoading(false);
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
  }, [moveData, skill, pokemonMoves, moveCalc, pokemonLevel]);

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
      console.error("Error updating move skill points:", error);
    }
  };

  const handleToolTipToggle = () => {
    setIsToolTipVisible(!isToolTipVisible);
  };
  const movesContainer = document.querySelector(".moves.pokemon__moves");

  const handleMoveClick = () => {
    setIsToolTipVisible(!isToolTipVisible);
    // Scroll to the last stored scroll position
    if (movesContainer) {
      const scrollPositionLast = movesContainer.scrollTop;
      console.log("Scroll Position:", scrollPositionLast);
      sessionStorage.setItem("scrollPosition", scrollPositionLast);
    }
  };

  const handleDescriptionClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (movesContainer) {
      movesContainer.scrollTo(0, parseInt(scrollPosition - 68, 10));
    }
  }, [skill.id]);

  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (movesContainer) {
    movesContainer.scrollTo(0, parseInt(scrollPosition, 10));
  }
  return (
    <>
      <div>{isLoading && <Loader />}</div>
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
            {moveData?.type.map((t) => (
              <label
                key={t}
                className={`type-icon type-${t.toLowerCase()} type-description`}
                id={moveData?.id}
              >
                {t}
              </label>
            ))}
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
