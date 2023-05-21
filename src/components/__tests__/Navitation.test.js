import { render, screen } from '@testing-library/react';
import {Loader} from '../Loader';
import '@testing-library/jest-dom'

test('renders the loader message correctly', () => {
  render(<Loader />);
  // Verifica a renderização da mensagem do loader
  const loaderElement = screen.getByText(/Catching 'em all.../i);
  expect(loaderElement).toBeInTheDocument();
});
