import { render, screen } from '@testing-library/react';
import { Resist } from '../Resist';
import '@testing-library/jest-dom';

test('renders Resist correctly', () => {
  const types = [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } }
  ];

  render(<Resist types={types} />);

  // Verifica se o componente Resist é renderizado corretamente

  const grassLabel = screen.getByText('Water');
  expect(grassLabel).toBeInTheDocument();

  // Obtém todas as labels com o atributo de teste "effectiveness-label"
  const labels = screen.getAllByTestId('effectiveness-label');

  // Verifica se o número de labels é igual a 5 (assumindo 5 para os tipos fornecidos)
  expect(labels).toHaveLength(5);
});
