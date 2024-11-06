import React, { useState } from 'react';


const TrabajosContent = () => {
    const [inputMes, setInputMes] = useState('')
    const [showTrabajoSearch, setShowTrabajoSearch] = useState(false);

    const handleInputChange = (e) => setInputMes(e.target.value);

    const getAlbaranesMes = (mes) => {
        // Logic to generate albaranes for the specified month
        console.log(`Generating albaranes for month: ${mes}`);
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