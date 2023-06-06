import React, { useState, useEffect } from "react";
import "./SquarePoints.css";

const SquarePoints = ({ totalSquares, selectedSquares, skillPoints, updateMoveSkill, disabled }) => {
  const [skillSquares, setSkillSquares] = useState(Array(totalSquares).fill(false));

  useEffect(() => {
    if (selectedSquares > 0) {
      const updatedSquares = skillSquares.map((square, index) => index < selectedSquares);
      setSkillSquares(updatedSquares);
    }
  }, []);

  const onSquareClick = (index) => {
    if (!disabled && skillPoints > 0 && selectedSquares < totalSquares) {
      const emptySquareIndex = skillSquares.findIndex((square) => square === false);

      if (emptySquareIndex !== -1) {
        const updatedSquares = skillSquares.map((square, idx) => {
          if (idx === emptySquareIndex) {
            return true;
          }
          return square;
        });

        setSkillSquares(updatedSquares);

        const selectedCount = updatedSquares.filter((square) => square).length;
        updateMoveSkill(selectedCount);
      }
    }
  };

  return (
    <div className={`square-points ${disabled ? "disabled" : ""}`}>
    {skillSquares.map((isFull, index) => (
      <div
        key={index}
        className={`square ${isFull ? "square-full" : disabled ? "square-disabled" : ""}`}
        onClick={() => onSquareClick(index)}
      ></div>
    ))}
  </div>
  );
};

export default SquarePoints;
