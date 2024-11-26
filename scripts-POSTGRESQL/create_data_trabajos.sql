CREATE TABLE data_trabajos (
    id_albaran SERIAL PRIMARY KEY,
    id_contrato INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    productos_servicios TEXT[], -- Array of products/services
    cantidades TEXT[],          -- Array of quantities
    precios TEXT[],             -- Array of prices
    cuota NUMERIC(10, 2),       -- Allow decimals for monetary values, nullable
    mes VARCHAR(20),            -- Month as a string (e.g., NOVIEMBRE)
    año INTEGER,               -- Year in YYYY format
    estado VARCHAR(20),         -- Status (e.g., Aceptado)
    nota VARCHAR(3),            -- YES/NO equivalent for Nota
    notas_adicionales TEXT,     -- Additional notes (nullable)
    Fecha DATE                  -- Date of the record
);
