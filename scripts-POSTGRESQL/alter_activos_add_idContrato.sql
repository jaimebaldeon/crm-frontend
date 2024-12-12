ALTER TABLE activos ADD COLUMN id_contrato INT;

UPDATE activos
SET id_contrato = (
  SELECT contratos.id_contrato
  FROM contratos
  WHERE contratos.id_cliente = activos.id_cliente AND contratos.estado='Activo'
  ORDER BY contratos.fecha_inicio DESC
  LIMIT 1
);

-- Make contract_id mandatory
ALTER TABLE activos ALTER COLUMN id_contrato SET NOT NULL;

-- Add a foreign key constraint
ALTER TABLE activos
ADD CONSTRAINT fk_activos_id_contrato
FOREIGN KEY (id_contrato) REFERENCES contratos(id_contrato);

-- Remove client_id
ALTER TABLE activos DROP COLUMN id_cliente;