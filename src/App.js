import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PokedexView } from './components/PokedexView';
import { Pokedex } from './components/Pokedex';
import { DetailsView } from './components/DetailsView';
import { Navigation } from './components/Navigation';
import { Heading } from './components/Heading';
import { withRouter } from './HOCs';
import PokemonsProvider from './context/PokemonsProvider';
import generations from './data/generations';
import './App.css';

function App() {
  const location = useLocation();

  // Check if the current route is '/pokedex'
  const isPokedexPage = location.pathname === '/pokedex';

  return (
    <PokemonsProvider>
      <div className="pokedex-app">
        <Heading />

        {!isPokedexPage && <Navigation />}

        <Routes>
        <Route path="/" element={<Pokedex />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedexView" element={<Navigate to={generations[0].link} />} />
          {generations.map(({ id, link }) => (
            <Route key={id} path={link} element={<PokedexView generation={id} />} />
          ))}
        </Routes>

        <DetailsView />
      </div>
    </PokemonsProvider>
  );
}

export default withRouter(App);
