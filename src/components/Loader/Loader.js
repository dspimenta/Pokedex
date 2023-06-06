import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader">
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div className="loading-text"> Catching 'em all...</div>
      </div>
    </div>
  );
}

export default Loader;
