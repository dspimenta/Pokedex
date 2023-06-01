import React from "react";
import {
  getMoveGifURL,
  getMovePokemonGifURL,
  getCategoryImgURL,
} from "../../utils";
import "./MoveToolTip.css";

const MoveToolTip = ({ pokemonId, moveData, skill }) => {
  const gifURL = skill.custom
    ? getMovePokemonGifURL(pokemonId, skill.id)
    : getMoveGifURL(skill.id);

  return (
    <div className="tooltip">
      <div className="tooltiptext">
        <div>
          <img className="gift-container" src={gifURL} alt={moveData.id} />
        </div>
        <label className="description">{moveData.description}</label>
        <br />
        <label>Base Damage: </label>
        <label className="base-damage">{moveData.baseDamage}</label>
        <br />
        <label>Base Energy: </label>
        <label className="base-energy">{moveData.baseEnergy}</label>
        <br />
        <label>Battle Effect: </label>
        <label className="battle-effect">{moveData.battleEffect}</label>
        <div className="base-status">
        <label> Damage: </label>
          <span className="damage">{moveData.damage}</span>
          <label>&nbsp; Energy: </label>
          <span className="energy">{moveData.energy}</span>
          <label>&nbsp;Accuracy: </label>
          <span className="accuracy">{moveData.accuracy}</span>
        </div>
        <div>
          <img
            src={getCategoryImgURL(moveData.categoryImg)}
            alt={moveData.categoryImg}
          />
        </div>
        <div>
          <label>Category: </label>
          <label className="category">{moveData.category}</label>
        </div>
        {moveData.requiredMove && moveData.requiredMove.length > 0 && (
          <>
            <label>Required move: </label>
            <div className="required-move">
              {moveData.requiredMove.map((required) => (
                <label key={required}>{required}</label>
              ))}
            </div>
          </>
        )}
        {moveData.bonuses && moveData.bonuses.length > 0 && (
          <>
            <label>Receives bonuses from: </label>
            <div className="bonuses">
              {moveData.bonuses.map((bonus, index) => (
                <div key={index}>
                  <label className="bonus">{bonus.name} : </label>
                  {bonus.bonus}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoveToolTip;
