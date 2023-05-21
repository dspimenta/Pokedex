import React from 'react';
import { Weaknesses } from '../../Weaknesses';
import { Resist } from '../../Resist';
import { Strong } from '../../Strong';
import { Weak } from '../../Weak';

function Effectiveness({ pokemon }) {

  return (
    <div className="tab tab-effectiveness">
      <Weaknesses
        types={pokemon.types}
      />
      <Resist
        types={pokemon.types}
      />
      <Strong
        types={pokemon.types}
      />
      <Weak
        types={pokemon.types}
      />
    </div>
  );
}

export default Effectiveness;
