CREATE SEQUENCE clientes_id_cliente_seq;

ALTER TABLE clientes 
ALTER COLUMN id_cliente 
SET DEFAULT nextval('clientes_id_cliente_seq');

SELECT MAX(id_cliente) FROM clientes; #E.g: 1234
ALTER SEQUENCE clientes_id_cliente_seq RESTART WITH #1235;
