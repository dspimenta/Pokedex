import { useMemo } from 'react';
import { normalizeEvolutionChain } from '../utils';

// Hook para normalizar uma cadeia de evolução em um array.
const useNormalizeEvolutionChain = ({ chain, id }) => {
  return useMemo(() => {
    return { evolutionChain: chain ? normalizeEvolutionChain(chain) : [] };
  }, [id]);
};

export default useNormalizeEvolutionChain;
