// components/dashboard/DashboardContent.jsx
import React from 'react';
import HomeContent from '../home/HomeContent';
import ContratosContent from '../contracts/ContratosContent';
import TrabajosContent from '../trabajos/TrabajosContent';
import './DashboardContent.css'; 

const DashboardContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return <HomeContent />;
      case 'Contratos':
        return <ContratosContent />;
      case 'Trabajos':
        return <TrabajosContent />;
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;
