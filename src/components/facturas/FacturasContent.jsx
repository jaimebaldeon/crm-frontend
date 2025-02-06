import React, { useState } from 'react';
import { generateAlbaranes, getAlbaranes, updateAlbaran, deleteAlbaran } from '../../services/albaranesService'; 
import { generateFacturas, getFacturas, updateFactura, deleteFactura } from '../../services/facturasService';  
import SearchClientForm from '../trabajos/SearchClientForm';
import ClientResultList from '../trabajos/ClientResultList';
import FacturasResultList from './FacturasResultList';
import ViewAlbaran from '../trabajos/ViewAlbaran';


const FacturasContent = () => {
    const [inputMes, setInputMes] = useState('')
    const [message, setMessage] = useState('');
    const [showFacturaSearch, setShowFacturaSearch] = useState(false);
    const [clientList, setClientList] = useState([]);
    const [showClientList, setShowClientList] = useState(false);
    const [facturasList, setFacturasList] = useState([]);
    const [showFacturasList, setShowFacturasList] = useState(false);
    const [albaranVerificable, setAlbaranVerificable] = useState([]);
    const [showAlbaranForm, setShowAlbaranForm] = useState(false);
    const [showExtintoresForm, setShowExtintoresForm] = useState(false);
    const [editableAlbaran, setEditableAlbaran] = useState(null);
    const [showAlbaranView, setShowAlbaranView] = useState(false);



    const handleInputChangeMes = (e) => setInputMes(e.target.value);

    const validateMonth = (month) => {
        const validMonths = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        return validMonths.includes(month.toLowerCase());
    };

    const generateFacturasMes = async (month) => {
        if (!validateMonth(month)) {
          setMessage('Mes no válido. (e.g., enero, febrero).');
          return;
        }
    
        try {
          const generateFacturasResponse = await generateFacturas(month);
          setMessage(generateFacturasResponse.message || 'Albaranes generados correctamente.');
        } catch (error) {
          setMessage('Error al generar las facturas. Inténtalo de nuevo.');
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
        setShowFacturaSearch(false); // Hide the ClientForm if user confirms cancellation
      }
    };

    const handleFacturaSearch = async (selectedClient) => {
      console.log('Cliente seleccionado:', selectedClient);
      const resultList = await getFacturas(selectedClient.id_cliente);
      if (resultList.length > 0) {
        setFacturasList(resultList);
        setShowClientList(false);
        setShowFacturasList(true);
      } else {
        alert("No se encontraron albaranes con los datos ingresados.")
        setShowFacturasList(false);
      }
    };

    const handleFacturaVerfication = (selectedAlbaran) => {
      console.log('Albaran de la factura seleccionada:', selectedAlbaran);
      setAlbaranVerificable(selectedAlbaran);
      setShowFacturasList(false);
      setShowAlbaranView(true);
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
        setShowFacturaSearch(false);
        alert("Albaran actualizado con exito")
      }
    };

    const handleAlbaranUpdate = async (extintoresData) => {
      console.log('Datos de extintores:', extintoresData);
      const responseAlbaranUpdate = await updateAlbaran(editableAlbaran);
      setShowExtintoresForm(false); // Hide ExtintoresForm after submission
      setShowFacturaSearch(false);
      alert("Albaran actualizado con exito")
    };


    return (
        <div className="content-section">
          <h2>Facturas</h2>          
          <div className='facturas'>
            {!showFacturaSearch && (
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
                    generateFacturasMes(inputMes);
                  }}
                >
                  Generar Facturas
                </button>
                {message && <p className="message">{message}</p>}
                <button
                  className="action-button"
                  onClick={() => {
                    setShowFacturaSearch(true);
                  }}
                >
                  Buscar Factura
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowFacturaSearch(true);
                  }}
                  disabled={true}
                >
                  Modificar Factura
                </button>
              </>
            )}

            {/* Show Client Search Form */}
            {showFacturaSearch && !showClientList && !showFacturasList && !showAlbaranForm && !showExtintoresForm && !showAlbaranView && (
              <SearchClientForm
                onSubmit={handleClientSearch}
                onCancel={handleClientCancel}
              />
            )}

            {/* Show Client Search Result List as a selection list */}
            {showClientList && clientList.length > 0 && (
              <ClientResultList
                clientList={clientList}
                onSubmit={handleFacturaSearch}
                onCancel={() => {
                  setShowClientList(false);
                  setMessage("");
                }}
              />
            )}

            {/* Show Albaran Search Result List as a selection list */}
            {showFacturasList && facturasList.length > 0 && (
              <FacturasResultList
                facturasList={facturasList}
                onSubmit={handleFacturaVerfication}
                onCancel={() => {
                  setShowFacturasList(false);
                  setMessage("");
                }}
              />
            )}


            {/* Show Albaran Form */}
            {showAlbaranView && (
              <ViewAlbaran
                albaran={albaranVerificable}
                onCancel={() => {
                  setShowFacturaSearch(false)
                  setShowAlbaranView(false);
                  setMessage("");
                }}
              />
            )}

          </div>          
        </div>
    );
};

export default FacturasContent;