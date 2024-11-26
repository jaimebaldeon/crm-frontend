import React, { useState } from 'react';
import { generateAlbaranes } from '../../services/albaranesService';  

const TrabajosContent = () => {
    const [inputMes, setInputMes] = useState('')
    const [message, setMessage] = useState('');
    const [showTrabajoSearch, setShowTrabajoSearch] = useState(false);

    const handleInputChange = (e) => setInputMes(e.target.value);

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

    return (
        <div className="content-section">
          <h2>Trabajos</h2>
          <div className='trabajos'>
            <input
              type="text"
              placeholder="Ingrese el mes"
              className="input-field"
              value={inputMes} 
              onChange={handleInputChange} 
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
              }}
            >
              Verificar Trabajo
            </button>
          </div>
        </div>
    );
};

export default TrabajosContent;