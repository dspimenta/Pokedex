import React from 'react';
import { NavLink } from 'react-router-dom';
import generations from '../../data/generations';
import './Navigation.css';

function Navigation() {
  const handleLinkClick = (link) => {
    window.location.href = link; // Redireciona para o link ao clicar no NavLink
  };

  return (
    <div className="navigation-container">
      <h3 className="navigation-title">Selecione a Geração:</h3>

      <div className="links-container">
        {generations.map(({ id, link, text }) => (
          <NavLink
            key={id}
            exact
            to={link}
            className="navigation-link"
            activeClassName="active"
            onClick={() => handleLinkClick(link)} // Chama a função handleLinkClick ao clicar no NavLink
          >
            {text}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
