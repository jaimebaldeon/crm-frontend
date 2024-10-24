CREATE TABLE clientes (
    Id_Cliente INT PRIMARY KEY,
    Nombre TEXT,
    CIF TEXT,
    Direccion TEXT,
    CP TEXT,
    Ciudad TEXT,
    Provincia TEXT,
    Actividad TEXT,
    Horario TEXT,
    IBAN TEXT,
    Telefono TEXT,
    Direccion_Facturacion TEXT,
    Categoria_Establecimiento TEXT
);

CREATE TABLE contratos (
    Id_Contrato INT PRIMARY KEY,                 -- Unique identifier for each contract
    Id_Cliente INT NOT NULL,                     -- Foreign key reference to the Clients table (ensure there's a Clients table)
    Productos_Servicios TEXT,                    -- List of products or services offered, stored as text
    Cantidades TEXT,                             -- List of quantities (assuming as a text field storing array-like data)
    Precios TEXT,                                -- List of prices (as text to store array-like values)
    Cuota DECIMAL(10, 2),                        -- Amount of the fee or quota (e.g., annual or monthly fee)
    Tipo VARCHAR(50),                            -- Type of contract (e.g., 'Anual')
    Mes VARCHAR(50),                             -- Month of the contract (e.g., 'NOVIEMBRE')
    Año INT,                                     -- Year of the contract
    Fecha_Fin DATE,                              -- End date of the contract
    Estado VARCHAR(50),                          -- Status of the contract (e.g., 'Activo')
    Notas_Adicionales TEXT,                      -- Additional notes regarding the contract (may contain long text)
    Fecha_Inicio DATE,                           -- Start date of the contract
    FOREIGN KEY (Id_Cliente) REFERENCES clientes(Id_Cliente)  -- Assuming 'clientes' table exists and has an Id_Cliente column
);

CREATE TABLE activos (
    Id_Activo INT PRIMARY KEY,            -- Unique identifier for each asset
    Id_Cliente INT NOT NULL,              -- Foreign key linking to the clients table
    Nombre VARCHAR(255) NOT NULL,         -- Name of the asset (e.g., EXTINTOR POLVO 6 KG)
    Cantidad INT NOT NULL,                -- Quantity of the asset (e.g., 1)
    Marca_Modelo VARCHAR(255) NOT NULL,   -- Brand or model of the asset (e.g., FAEX)
    Tipo VARCHAR(100),                    -- Type of the asset (e.g., ABC 6kg, CO2-5KG)
    N_Identificador VARCHAR(50),          -- Asset identifier number (e.g., 6613938)
    Fecha_Fabricacion INT,                -- Year the asset was manufactured (e.g., 2022)
    Fecha_Retimbrado INT,                 -- Year of the asset's last retimbrado (inspection), nullable
    Estado VARCHAR(50) NOT NULL,          -- Current status of the asset (e.g., ACTIVO)
    Ubicacion VARCHAR(255),               -- Location of the asset (e.g., 1º PLANTA)
    Notas VARCHAR(255),                    -- Additional notes (e.g., 30, 31, etc.)
    FOREIGN KEY (Id_Cliente) REFERENCES clientes(Id_Cliente)  -- Assuming 'clientes' table exists and has an Id_Cliente column
);


CREATE TABLE mapping_categoria (
    General VARCHAR(255),
    Subcategoria VARCHAR(255),
    Especifico VARCHAR(255)
);

