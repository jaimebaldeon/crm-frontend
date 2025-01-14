CREATE TABLE IF NOT EXISTS clientes
(
    id_cliente integer NOT NULL DEFAULT nextval('clientes_id_cliente_seq'::regclass),
    nombre text COLLATE pg_catalog."default",
    cif text COLLATE pg_catalog."default",
    direccion text COLLATE pg_catalog."default",
    cp text COLLATE pg_catalog."default",
    ciudad text COLLATE pg_catalog."default",
    provincia text COLLATE pg_catalog."default",
    actividad text COLLATE pg_catalog."default",
    horario text COLLATE pg_catalog."default",
    iban text COLLATE pg_catalog."default",
    telefono text COLLATE pg_catalog."default",
    direccion_facturacion text COLLATE pg_catalog."default",
    categoria_establecimiento text COLLATE pg_catalog."default",
    CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente),
    CONSTRAINT unique_cliente_constraint UNIQUE (nombre, cif, direccion)
);

CREATE TABLE IF NOT EXISTS contratos
(
    id_contrato integer NOT NULL DEFAULT nextval('contratos_id_contrato_seq'::regclass),
    id_cliente integer NOT NULL,
    productos_servicios text COLLATE pg_catalog."default",
    cantidades text COLLATE pg_catalog."default",
    precios text COLLATE pg_catalog."default",
    cuota numeric(10,2),
    tipo character varying(50) COLLATE pg_catalog."default",
    mes character varying(50) COLLATE pg_catalog."default",
    "año" integer,
    fecha_fin date,
    estado character varying(50) COLLATE pg_catalog."default",
    notas_adicionales text COLLATE pg_catalog."default",
    fecha_inicio date,
    CONSTRAINT contratos_pkey PRIMARY KEY (id_contrato),
    CONSTRAINT contratos_id_cliente_fkey FOREIGN KEY (id_cliente)
        REFERENCES public.clientes (id_cliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS activos
(
    id_activo integer NOT NULL DEFAULT nextval('activos_id_activo_seq'::regclass),
    id_cliente integer NOT NULL,
    nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    cantidad integer NOT NULL,
    marca_modelo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    tipo character varying(100) COLLATE pg_catalog."default",
    n_identificador character varying(50) COLLATE pg_catalog."default",
    fecha_fabricacion integer,
    fecha_retimbrado integer,
    estado character varying(50) COLLATE pg_catalog."default" NOT NULL,
    ubicacion character varying(255) COLLATE pg_catalog."default",
    notas character varying(255) COLLATE pg_catalog."default",
    id_contrato integer NOT NULL,
    CONSTRAINT activos_pkey PRIMARY KEY (id_activo),
    CONSTRAINT activos_id_cliente_fkey FOREIGN KEY (id_cliente)
        REFERENCES public.clientes (id_cliente) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_activos_id_contrato FOREIGN KEY (id_contrato)
        REFERENCES public.contratos (id_contrato) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE mapping_categoria (
    General VARCHAR(255),
    Subcategoria VARCHAR(255),
    Especifico VARCHAR(255)
);

