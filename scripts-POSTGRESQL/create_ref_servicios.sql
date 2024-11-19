CREATE TABLE ref_servicios (
    id SERIAL PRIMARY KEY,
    categoria TEXT NOT NULL,
    concepto TEXT NOT NULL,
    descripcion_corta TEXT,
    descripcion_detallada TEXT,
    recurrente TEXT,
    producto_asociado TEXT
);
