CREATE TABLE ref_productos (
    id SERIAL PRIMARY KEY,
    categoria TEXT,
    concepto TEXT,
    descripcion_corta TEXT,
    descripcion_detallada TEXT,
    mantenible TEXT,
    retimbrado TEXT,
    vida_util INTEGER
);