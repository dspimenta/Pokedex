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
        <label>Next Level: </label>
        <label className="level">{moveData.level}</label>
        <br />
        <label>Base Damage: </label>
        <label className="base-damage">{moveData.baseDamage}</label>
        <br />
        <label>Base Energy: </label>
        <label className="base-energy">{moveData.baseEnergy}</label>
        <br />
        <label>Battle Effect: </label>
        <label className="battle-effect">{moveData.battleEffect}</label>
        {moveData.effect && moveData.effect.length > 0 && (
          <div>
            <label>Effects: </label>
            <div className="effects">
              {moveData.effect.map((effect, index) => (
                <div key={index}>
                  <div>Effect: {effect.description} </div>
                  <label> Type: </label>
                  <label className="effect-type">{effect.type}: </label>
                  <label> Value: </label>
                  <label className="effect-value">
                    {effect.value}
                    {effect.operator === "percent" && "%"}
                  </label>
                  {effect.duration > 0 && (
                    <label>
                      {" "}
                      Duration:
                      <label className="effect-duration">
                        {effect.duration}
                      </label>
                    </label>
                  )}
                  <label> Target: </label>
                  <label className="effect-target">{effect.target}</label>
                  <label> Chance: </label>
                  <label className="effect-chance">{effect.chance}%</label>
                </div>
              ))}
            </div>
          </div>
        )}
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
        <div>
          <label>Base Critical Hit Rate: </label>
          <label className="critical-hit-rate">
            {moveData.baseCriticalHitRate} %
          </label>
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
