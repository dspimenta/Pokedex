/**
 * Função responsável por reportar as métricas de desempenho da web.
 * Recebe uma função de callback onPerfEntry.
 *
 * @param {Function} onPerfEntry - Função de callback para lidar com as métricas de desempenho.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
