import { memo } from 'react';
import ReactDOM from 'react-dom';
import './Overlay.css';

function Overlay({ onClick, hidden }) {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className={`overlay ${hidden && 'hidden'}`} // Adiciona a classe 'hidden' para ocultar o overlay se a prop 'hidden' for verdadeira
    />,
    document.body // Renderiza o componente como um portal no elemento raiz do documento
  );
}

export default memo(Overlay);
