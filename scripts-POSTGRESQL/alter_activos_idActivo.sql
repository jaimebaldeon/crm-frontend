CREATE SEQUENCE activos_id_activo_seq;

ALTER TABLE activos 
ALTER COLUMN id_activo 
SET DEFAULT nextval('activos_id_activo_seq');

SELECT MAX(id_activo) FROM activos; #E.g: 15972
ALTER SEQUENCE activos_id_activo_seq RESTART WITH 15973;
