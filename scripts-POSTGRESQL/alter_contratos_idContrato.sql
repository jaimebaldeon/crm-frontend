CREATE SEQUENCE contratos_id_contrato_seq;

ALTER TABLE contratos 
ALTER COLUMN id_contrato 
SET DEFAULT nextval('contratos_id_contrato_seq');

SELECT MAX(id_contrato) FROM contratos; #E.g: 4711
ALTER SEQUENCE contratos_id_contrato_seq RESTART WITH 4712;
