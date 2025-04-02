// components/dashboard/DashboardContent.jsx
import React from 'react';
import HomeContent from '../home/HomeContent';
import ClientesContent from '../clientes/ClientesContent';
import ContratosContent from '../contracts/ContratosContent';
import TrabajosContent from '../trabajos/TrabajosContent';
import FacturasContent from '../facturas/FacturasContent';
import CertificadosContent from '../certificados/CertificadosContent';
import './DashboardContent.css'; 

const DashboardContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return <HomeContent />;
        case 'Clientes':
          return <ClientesContent />;
      case 'Contratos':
        return <ContratosContent />;
      case 'Trabajos':
        return <TrabajosContent />;
      case 'Facturas':
          return <FacturasContent />;
      case 'Certificados':
        return <CertificadosContent />;
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;
