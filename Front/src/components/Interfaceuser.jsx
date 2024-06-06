import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Interfaceuser.css';
import logo from 'C:/deploiement/credit-scoring-website/deploiementbfifinal/credit-scoring-website/Front/src/assets/logo.png';

const Interfaceuser = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <aside id="sidebar" className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <ul className="sidebar-nav" id="sidebar-nav">

        </ul>

        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-image"
          />
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button ${activeButton === "improveScore" ? 'active' : ''}`}
            onClick={() => handleButtonClick("improveScore")}
          >
            <span className="icon">⭐️</span> Improve Your Score
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button ${activeButton === "loanApplication" ? 'active' : ''}`}
            onClick={() => handleButtonClick("loanApplication")}
          >
            <span className="icon">💳</span> Loan Application
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button ${activeButton === "agricultureArea" ? 'active' : ''}`}
            onClick={() => handleButtonClick("agricultureArea")}
          >
            <span className="icon">🌾</span> Agriculture Area
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button logout-button ${activeButton === "logout" ? 'active' : ''}`}
            onClick={() => handleButtonClick("logout")}
          >
            <span className="icon">👋</span> Logout
          </button>
        </div>

        <div className="spacer mt-4"></div>
      </aside>

      <div className={`toggle-button ${sidebarVisible ? 'moved' : ''}`} onClick={toggleSidebar}></div>

    </>
  );
};

export default Interfaceuser;
