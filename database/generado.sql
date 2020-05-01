CREATE TABLE categoria (
    id_categoria  INTEGER NOT NULL,
    nombre        VARCHAR2(100),
    descripcion   VARCHAR2(100)
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id_categoria );

CREATE TABLE categoria_hija (
    id_categoria_hija                         INTEGER NOT NULL, 
--  ERROR: Column name length exceeds maximum allowed length(30) 
    producto_categoria_id_producto_categoria  INTEGER NOT NULL,
    categoria_id_categoria                    INTEGER NOT NULL
);

ALTER TABLE categoria_hija ADD CONSTRAINT categoria_hija_pk PRIMARY KEY ( id_categoria_hija );

CREATE TABLE color (
    id_color  INTEGER NOT NULL,
    nombre    VARCHAR2(50)
);

ALTER TABLE color ADD CONSTRAINT color_pk PRIMARY KEY ( id_color );

CREATE TABLE mensaje (
    id_mensaje          INTEGER NOT NULL,
    mensaje             VARCHAR2(4000),
    fecha_hora          DATE,
    sala_id_sala        INTEGER NOT NULL,
    usuario_id_usuario  INTEGER NOT NULL
);

ALTER TABLE mensaje ADD CONSTRAINT mensaje_pk PRIMARY KEY ( id_mensaje );

CREATE TABLE producto (
    id_producto          INTEGER NOT NULL,
    cod_producto         VARCHAR2(100),
    imagen               VARCHAR2(200),
    descripcion          VARCHAR2(200),
    precio_producto      INTEGER,
    fecha_publicacion    DATE,
    cantidad_disponible  INTEGER,
    usuario_id_usuario   INTEGER NOT NULL
);

ALTER TABLE producto ADD CONSTRAINT producto_pk PRIMARY KEY ( id_producto );

CREATE TABLE producto_categoria (
    id_producto_categoria   INTEGER NOT NULL,
    producto_id_producto    INTEGER NOT NULL,
    categoria_id_categoria  INTEGER NOT NULL
);

ALTER TABLE producto_categoria ADD CONSTRAINT producto_categoria_pk PRIMARY KEY ( id_producto_categoria );

CREATE TABLE producto_color (
    id_producto_color     INTEGER NOT NULL,
    producto_id_producto  INTEGER NOT NULL,
    color_id_color        INTEGER NOT NULL
);

ALTER TABLE producto_color ADD CONSTRAINT producto_color_pk PRIMARY KEY ( id_producto_color );

CREATE TABLE sala (
    id_sala              INTEGER NOT NULL,
    fecha_hora           DATE,
    puntuacion           INTEGER,
    estado_sala          INTEGER,
    usuario_id_usuario   INTEGER NOT NULL,
    usuario_id_usuario1  INTEGER NOT NULL
);

ALTER TABLE sala ADD CONSTRAINT sala_pk PRIMARY KEY ( id_sala );

CREATE TABLE tipo_usuario (
    id_tipousuario  INTEGER NOT NULL,
    descripcion     VARCHAR2(20)
);

ALTER TABLE tipo_usuario ADD CONSTRAINT tipo_usuario_pk PRIMARY KEY ( id_tipousuario );

CREATE TABLE usuario (
    id_usuario                   INTEGER NOT NULL,
    nombre                       VARCHAR2(30 CHAR),
    apellido                     VARCHAR2(30),
    clave                        VARCHAR2(20),
    correo                       VARCHAR2(100),
    telefono                     INTEGER,
    foto                         VARCHAR2(200),
    fecha_nacimiento             DATE,
    fecha_registro               DATE,
    direccion                    VARCHAR2(50),
    credito                      INTEGER,
    ganancia                     INTEGER,
    tipo_usuario                 CHAR(1),
    clase_cliente                CHAR(1),
    genero                       CHAR(1),
    tipo_usuario_id_tipousuario  INTEGER NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario );

ALTER TABLE categoria_hija
    ADD CONSTRAINT categoria_hija_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE categoria_hija
    ADD CONSTRAINT categoria_hija_producto_categoria_fk FOREIGN KEY ( producto_categoria_id_producto_categoria )
        REFERENCES producto_categoria ( id_producto_categoria );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_sala_fk FOREIGN KEY ( sala_id_sala )
        REFERENCES sala ( id_sala );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_usuario_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE producto_categoria
    ADD CONSTRAINT producto_categoria_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE producto_categoria
    ADD CONSTRAINT producto_categoria_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE producto_color
    ADD CONSTRAINT producto_color_color_fk FOREIGN KEY ( color_id_color )
        REFERENCES color ( id_color );

ALTER TABLE producto_color
    ADD CONSTRAINT producto_color_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE producto
    ADD CONSTRAINT producto_usuario_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE sala
    ADD CONSTRAINT sala_usuario_fk_ayuda FOREIGN KEY ( usuario_id_usuario1 )
        REFERENCES usuario ( id_usuario );

ALTER TABLE sala
    ADD CONSTRAINT sala_usuario_fk_cliente FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_tipo_usuario_fk FOREIGN KEY ( tipo_usuario_id_tipousuario )
        REFERENCES tipo_usuario ( id_tipousuario );
