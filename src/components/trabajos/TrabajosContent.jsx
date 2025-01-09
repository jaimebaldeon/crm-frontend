import React, { useState } from 'react';
import { generateAlbaranes, getAlbaranes, updateAlbaran, deleteAlbaran } from '../../services/albaranesService';  
import SearchClientForm from './SearchClientForm';
import ClientResultList from './ClientResultList';
import AlbaranesResultList from './AlbaranesResultList';
import AlbaranForm from './AlbaranForm';
import ExtintoresForm from '../activos/ExtintoresForm';


const TrabajosContent = () => {
    const [inputMes, setInputMes] = useState('')
    const [message, setMessage] = useState('');
    const [showTrabajoSearch, setShowTrabajoSearch] = useState(false);
    const [clientList, setClientList] = useState([]);
    const [showClientList, setShowClientList] = useState(false);
    const [albaranesList, setAlbaranesList] = useState([]);
    const [showAlbaranesList, setShowAlbaranesList] = useState(false);
    const [albaranVerificable, setAlbaranVerificable] = useState([]);
    const [showAlbaranForm, setShowAlbaranForm] = useState(false);
    const [showExtintoresForm, setShowExtintoresForm] = useState(false);
    const [editableAlbaran, setEditableAlbaran] = useState(null);
    const [modificarExistente, setModificarExistente] = useState(false)
    const [inputIdAlbaran, setInputIdAlbaran] = useState('')


    const handleInputChangeMes = (e) => setInputMes(e.target.value);
    const handleInputChangeIdAlbaran = (e) => setInputIdAlbaran(e.target.value);

    const validateMonth = (month) => {
        const validMonths = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        return validMonths.includes(month.toLowerCase());
    };

    const getAlbaranesMes = async (month) => {
        if (!validateMonth(month)) {
          setMessage('Mes no válido. Introduzca un mes en español (e.g., enero, febrero).');
          return;
        }
    
        try {
          const generateAlbaranesResponse = await generateAlbaranes(month);
          setMessage(generateAlbaranesResponse.message || 'Albaranes generados correctamente.');
        } catch (error) {
          setMessage('Error al generar los albaranes. Inténtalo de nuevo.');
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
        setShowTrabajoSearch(false); // Hide the ClientForm if user confirms cancellation
      }
    };

    const handleAlbaranSearch = async (selectedClient) => {
      console.log('Cliente seleccionado:', selectedClient);
      const resultList = await getAlbaranes(selectedClient.id_cliente, modificarExistente);
      if (resultList.length > 0) {
        setAlbaranesList(resultList);
        setShowClientList(false);
        setShowAlbaranesList(true);
      } else {
        alert("No se encontraron albaranes con los datos ingresados.")
        setShowAlbaranesList(false);
      }
    };

    const handleAlbaranVerfication = (selectedAlbaran) => {
      console.log('Albaran seleccionado:', selectedAlbaran);
      setAlbaranVerificable(selectedAlbaran);
      setShowAlbaranesList(false);
      setShowAlbaranForm(true);
    };

    const handleAlbaranSubmit = async (verifiedAlbaran, hasNuevosExtintores) => {
      console.log('Albarán modificado:', verifiedAlbaran);
      setShowAlbaranForm(false); // Hide AlbaranForm
    
      if (hasNuevosExtintores) { // && !modificarExistente
        alert("Rellena los datos de los nuevos extintores")
        setEditableAlbaran(verifiedAlbaran); // Pass the albarán data to ExtintoresForm
        setShowExtintoresForm(true); // Show ExtintoresForm
      }
      else {
        const responseAlbaranUpdate = await updateAlbaran(verifiedAlbaran);
        setShowTrabajoSearch(false);
        alert("Albaran actualizado con exito")
      }
    };

    const handleAlbaranUpdate = async (extintoresData) => {
      console.log('Datos de extintores:', extintoresData);
      const responseAlbaranUpdate = await updateAlbaran(editableAlbaran);
      setShowExtintoresForm(false); // Hide ExtintoresForm after submission
      setShowTrabajoSearch(false);
      alert("Albaran actualizado con exito")
    };

    const deleteAlbaranFunct = async (idAlbaran) => {
      if (false) {
        setMessage('Mes no válido. Introduzca un mes en español (e.g., enero, febrero).');
        return;
      }
  
      try {
        const deleteAlbaranResponse = await deleteAlbaran(idAlbaran);
        alert(deleteAlbaranResponse.message || 'Albaran eliminado correctamente.');
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
  };

    return (
        <div className="content-section">
          <h2>Trabajos</h2>          
          <div className='trabajos'>
            {!showTrabajoSearch && (
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
                    getAlbaranesMes(inputMes);
                  }}
                >
                  Generar Albaranes
                </button>
                {message && <p className="message">{message}</p>}
                <button
                  className="action-button"
                  onClick={() => {
                    setShowTrabajoSearch(true);
                    setModificarExistente(false);
                  }}
                >
                  Verificar Trabajo
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setShowTrabajoSearch(true);
                    setModificarExistente(true);
                  }}
                  disabled={true}
                >
                  Modificar Trabajo
                </button>
                <input
                  type="text"
                  placeholder="Ingrese el id albaran"
                  className="input-field"
                  value={inputIdAlbaran} 
                  onChange={handleInputChangeIdAlbaran} 
                />
                <button
                  className="action-button"
                  onClick={() => {
                    deleteAlbaranFunct(inputIdAlbaran);
                  }}
                >
                  Eliminar Albaran
                </button>
              </>
            )}

            {/* Show Client Search Form */}
            {showTrabajoSearch && !showClientList && !showAlbaranesList && !showAlbaranForm && !showExtintoresForm && (
              <SearchClientForm
                onSubmit={handleClientSearch}
                onCancel={handleClientCancel}
              />
            )}

            {/* Show Client Search Result List as a selection list */}
            {showClientList && clientList.length > 0 && (
              <ClientResultList
                clientList={clientList}
                onSubmit={handleAlbaranSearch}
                onCancel={() => {
                  setShowClientList(false);
                  setMessage("");
                }}
              />
            )}

            {/* Show Albaran Search Result List as a selection list */}
            {showAlbaranesList && albaranesList.length > 0 && (
              <AlbaranesResultList
                albaranesList={albaranesList}
                onSubmit={handleAlbaranVerfication}
                onCancel={() => {
                  setShowAlbaranesList(false);
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

            {/* Show Extintores Form */}
            {showExtintoresForm && (
              <ExtintoresForm
                client={editableAlbaran.id_cliente}
                contract={editableAlbaran}
                onSubmit={ handleAlbaranUpdate }
                onCancel={() => {
                  setShowExtintoresForm(false); // Hide ExtintoresForm on cancel
                }}
              />
            )}

          </div>          
        </div>
    );
};

export default TrabajosContent;