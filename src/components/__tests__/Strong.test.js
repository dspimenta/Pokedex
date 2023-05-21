import { render, screen } from '@testing-library/react';
import { Strong } from '../Strong';
import '@testing-library/jest-dom';

test('renderiza Strong corretamente', () => {
  const types = [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } }
  ];

  render(<Strong types={types} />);

  // Verifica a renderização do componente Strong

  const grassLabel = screen.getByText('Water');
  expect(grassLabel).toBeInTheDocument();

  const labels = screen.getAllByTestId('effectiveness-label');
  expect(labels).toHaveLength(2); // Assume-se que existem 2 para os tipos fornecidos
});
