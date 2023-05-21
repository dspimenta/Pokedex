import { render, screen } from '@testing-library/react';
import { Weaknesses } from '../Weaknesses';
import '@testing-library/jest-dom';

test('renders weaknesses correctly', () => {
  const types = [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } }
  ];

  render(<Weaknesses types={types} />);

// Verifica a renderização das fraquezas
  const grassLabel = screen.getByText('Fire');
  expect(grassLabel).toBeInTheDocument();
});

test('renders the correct number of weaknesses', () => {
  const types = [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison"} }
  ];

  render(<Weaknesses types={types} />);

  // Verifica o número correto de label de fraquezas
  const label = screen.getAllByTestId('effectiveness-label');
  expect(label).toHaveLength(4); // Supondo que existam 4 fraquezas para os tipos fornecidos
});
