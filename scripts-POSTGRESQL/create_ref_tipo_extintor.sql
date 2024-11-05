CREATE TABLE IF NOT EXISTS ref_tipo_extintor
(
    id integer NOT NULL DEFAULT nextval('ref_tipo_extintor_id_seq'::regclass),
    extintor text COLLATE pg_catalog."default" NOT NULL,
    tipo text COLLATE pg_catalog."default",
    CONSTRAINT ref_tipo_extintor_pkey PRIMARY KEY (id),
    CONSTRAINT fk_extintor_concepto FOREIGN KEY (extintor)
        REFERENCES public.ref_productos (concepto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)