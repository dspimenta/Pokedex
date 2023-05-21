import { render, screen } from '@testing-library/react';
import { Weak } from '../Weak';
import '@testing-library/jest-dom';

test('renderiza Weak corretamente', () => {
  const types = [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } }
  ];

  render(<Weak types={types} />);

  // Verifica a renderização das fraquezas
  const grassLabel = screen.getByText('Fire');
  expect(grassLabel).toBeInTheDocument();

  const label = screen.getAllByTestId('effectiveness-label');
  expect(label).toHaveLength(7); // Assumindo que existem 7 fraquezas para os tipos dados

});
