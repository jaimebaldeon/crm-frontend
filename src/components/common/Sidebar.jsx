// components/common/Sidebar.jsx
import React from 'react';
import './Sidebar.css'; // Sidebar-specific styles

const Sidebar = ({ isCollapsed, toggleSidebar, activeSection, setActiveSection }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img src="/logo.ico" alt="Logo" className="sidebar-logo" />
        <span className="logo">EL TUMI</span>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      <ul className="menu-items">
        <li className={`menu-item ${activeSection === 'Home' ? 'active' : ''}`} onClick={() => setActiveSection('Home')}>
          Home
        </li>
        <li className={`menu-item ${activeSection === 'Clientes' ? 'active' : ''}`} onClick={() => setActiveSection('Clientes')}>
          Clientes
        </li>
        <li className={`menu-item ${activeSection === 'Contratos' ? 'active' : ''}`} onClick={() => setActiveSection('Contratos')}>
          Contratos
        </li>
        <li className={`menu-item ${activeSection === 'Trabajos' ? 'active' : ''}`} onClick={() => setActiveSection('Trabajos')}>
          Trabajos
        </li>
        <li className={`menu-item ${activeSection === 'Facturas' ? 'active' : ''}`} onClick={() => setActiveSection('Facturas')}>
          Facturas
        </li>
        <li className={`menu-item ${activeSection === 'Certificados' ? 'active' : ''}`} onClick={() => setActiveSection('Certificados')}>
        Certificados
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
