import React from 'react';
import effectiveness from '../../data/effectiveness.js';

export default function Strong({ types }) {
  const result = [];

  // Itera sobre o objeto de efetividade
  for (const type in effectiveness) {
    // Verifica se algum tipo do Pokémon corresponde ao tipo atual do loop
    if (types.some((item) => item.type.name === type.toLocaleLowerCase())) {
      const effectivenessValues = effectiveness[type];

      // Mapeia as informações de efetividade para cada tipo encontrado
      Object.keys(effectivenessValues).map((type) => {
        const effectivenessValue = effectivenessValues[type];
        result.push({ value: effectivenessValue, type: type });

        return { effectivenessValue, type };
      });
    }
  }

  const mergedItems = [];
  // Fusão de itens duplicados e multiplicação dos valores de efetividade
  result.forEach((item) => {
    const existingItem = mergedItems.find(
      (mergedItem) =>
        mergedItem.type === item.type && mergedItem.imagePath === item.imagePath
    );
    if (existingItem) {
      existingItem.value *= item.value;
    } else {
      mergedItems.push({ ...item });
    }
  });

  // Filtra os tipos com valor de efetividade maior ou igual a 2
  const filteredTypes = mergedItems.filter(type => type.value >= 2);

  return (
    <div>
      <h4>Forte Contra</h4>
      <div className='effectiveness'>
        {/* Renderiza os tipos fortes */}
        {filteredTypes.map((type) => (
          <div key={type.type}>
            {/* Exibe o nome do tipo e o valor de efetividade */}
            <label data-testid="effectiveness-label" className={`type-icon type_bg-${type.type.toLocaleLowerCase()}`}> {type.type} </label>
            ({type.value}x)
          </div>
        ))}
      </div>
    </div>
  );
}
