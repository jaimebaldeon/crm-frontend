import React, { useState } from 'react';
import { generateAlbaranes, getAlbaranes, updateAlbaran, deleteAlbaran } from '../../services/albaranesService'; 
import { generateFacturas, getFacturas, updateFactura, deleteFactura } from '../../services/facturasService';  
import SearchClientForm from '../trabajos/SearchClientForm';
import ClientResultList from '../trabajos/ClientResultList';
import CertificadosResultList from './CertificadosResultList';
import ViewAlbaran from '../trabajos/ViewAlbaran';
import AlbaranForm from '../trabajos/AlbaranForm';


const CertificadosContent = () => {
    const [inputMes, setInputMes] = useState('')
    const [message, setMessage] = useState('');
    const [showCertificadoSearch, setShowCertificadoSearch] = useState(false);
    const [clientList, setClientList] = useState([]);
    const [showClientList, setShowClientList] = useState(false);
    const [certificadosList, setCertificadosList] = useState([]);
    const [showCertificadosList, setShowCertificadosList] = useState(false);
    const [albaranVerificable, setAlbaranVerificable] = useState([]);
    const [showAlbaranForm, setShowAlbaranForm] = useState(false);
    const [showExtintoresForm, setShowExtintoresForm] = useState(false);
    const [editableAlbaran, setEditableAlbaran] = useState(null);
    const [showAlbaranView, setShowAlbaranView] = useState(false);
    const [modificarAlbaran, setModificarAlbaran] = useState(false)



    const handleInputChangeMes = (e) => setInputMes(e.target.value);

    const validateMonth = (month) => {
        const validMonths = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        return validMonths.includes(month.toLowerCase());
    };

    const generateCertificadosMes = async (month) => {
        if (!validateMonth(month)) {
          setMessage('Mes no válido. (e.g., enero, febrero).');
          return;
        }
    
        try {
          const generateCertificadosResponse = await generateCertificados(month);
          setMessage(generateCertificadosResponse.message || 'Albaranes generados correctamente.');
        } catch (error) {
          setMessage('Error al generar las certificados. Inténtalo de nuevo.');
          console.error(error);
        }
    };

    const handleClientSearch = (resultList) => {
      console.log('Formulario enviado:', resultList)
      // display client search list showing columns: nombre, cif and direccion
      if (resultList.length > 0) {
        setClientList(resultList);
        setShowClientList(true);
      } else {
        setMessage("No se encontraron clientes con los datos ingresados.");
        setShowClientList(false);
      }
    
    };

    const handleClientCancel = () => {
      const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.");
      if (confirmCancel) {
        setShowCertificadoSearch(false); // Hide the ClientForm if user confirms cancellation
      }
    };

    const handleCertificadoSearch = async (selectedClient) => {
      console.log('Cliente seleccionado:', selectedClient);
      const resultList = await getFacturas(selectedClient.id_cliente);
      if (resultList.length > 0) {
        setCertificadosList(resultList);
        setShowClientList(false);
        setShowCertificadosList(true);
      } else {
        alert("No se encontraron albaranes con los datos ingresados.")
        setShowCertificadosList(false);
      }
    };

    const handleCertificadoVerfication = (selectedAlbaran) => {
      console.log('Albaran de la certificado seleccionada:', selectedAlbaran);
      setAlbaranVerificable(selectedAlbaran);
      setShowCertificadosList(false);
      if (!modificarAlbaran) {
        setShowAlbaranView(true);
      } else {
        setShowAlbaranForm(true);
      }
    };

    const handleAlbaranSubmit = async (verifiedAlbaran, hasNuevosExtintores) => {
      console.log('Albarán modificado:', verifiedAlbaran);
      setShowAlbaranForm(false); // Hide AlbaranForm
    
      if (hasNuevosExtintores) { // && !buscarExistente
        alert("Rellena los datos de los nuevos extintores")
        setEditableAlbaran(verifiedAlbaran); // Pass the albarán data to ExtintoresForm
        setShowExtintoresForm(true); // Show ExtintoresForm
      }
      else {
        const responseAlbaranUpdate = await updateAlbaran(verifiedAlbaran);
        const responseCertificadoUpdate = await updateFactura(verifiedAlbaran);
        setShowCertificadoSearch(false);
        alert("Albaran actualizado con exito")
      }
    };

    const handleAlbaranUpdate = async (extintoresData) => {
      console.log('Datos de extintores:', extintoresData);
      const responseAlbaranUpdate = await updateAlbaran(editableAlbaran);
      setShowExtintoresForm(false); // Hide ExtintoresForm after submission
      setShowCertificadoSearch(false);
      alert("Albaran actualizado con exito")
    };


    return (
        <div className="content-section">
          <h2>Certificados</h2>          
          <div className='certificados'>
            {!showCertificadoSearch && (
              <>
                <input
                  type="text"
                  placeholder="Ingrese el mes"
                  className="input-field"
                  value={inputMes} 
                  onChange={handleInputChangeMes} 
                />
                <button
                  className="action-button"
                  onClick={() => {
                    generateCertificadosMes(inputMes);
                  }}
                >
                  Generar Certificados
                </button>
                {message && <p className="message">{message}</p>}
                <button
                  className="action-button"
                  onClick={() => {
                    setShowCertificadoSearch(true);
                    setModificarAlbaran(false)
                  }}
                >
                  Buscar Certificado
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowCertificadoSearch(true);
                    setModificarAlbaran(true)
                  }}
                  // disabled={true}
                >
                  Modificar Certificado
                </button>
              </>
            )}

            {/* Show Client Search Form */}
            {showCertificadoSearch && !showClientList && !showCertificadosList && !showAlbaranForm && !showExtintoresForm && !showAlbaranView && (
              <SearchClientForm
                onSubmit={handleClientSearch}
                onCancel={handleClientCancel}
              />
            )}

            {/* Show Client Search Result List as a selection list */}
            {showClientList && clientList.length > 0 && (
              <ClientResultList
                clientList={clientList}
                onSubmit={handleCertificadoSearch}
                onCancel={() => {
                  setShowClientList(false);
                  setMessage("");
                }}
              />
            )}

            {/* Show Albaran Search Result List as a selection list */}
            {showCertificadosList && certificadosList.length > 0 && (
              <CertificadosResultList
                certificadosList={certificadosList}
                onSubmit={handleCertificadoVerfication}
                onCancel={() => {
                  setShowCertificadosList(false);
                  setMessage("");
                }}
              />
            )}

            {/* Show Albaran View */}
            {showAlbaranView && (
              <ViewAlbaran
                albaran={albaranVerificable}
                onCancel={() => {
                  setShowCertificadoSearch(false)
                  setShowAlbaranView(false);
                  setMessage("");
                }}
              />
            )}

            {/* Show Albaran Form */}
            {showAlbaranForm && (
              <AlbaranForm
                albaran={albaranVerificable}
                onSubmit={ handleAlbaranSubmit}
                onCancel={() => {
                  setShowAlbaranForm(false);
                  setMessage("");
                }}
              />
            )}

          </div>          
        </div>
    );
};

export default CertificadosContent;