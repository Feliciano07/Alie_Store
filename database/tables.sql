CREATE DATABASE Store;

use  Alie_Store ;

--Creacion de las tablas para usar 

--talbla de usuario y tipo 


CREATE TABLE TIPO_USUARIO (
    id_tipo_usuario  INTEGER NOT NULL,
    descripcion      VARCHAR2(20),
    CONSTRAINT tipo_usuario_pk PRIMARY KEY(id_tipo_usuario)
);

-- Describe TIPO_USUARIO;


CREATE TABLE USUARIO (
    id_usuario                    INTEGER NOT NULL,
    nombre                        VARCHAR2(30) NOT NULL,
    apellido                      VARCHAR2(30) NOT NULL,
    clave                         VARCHAR2(20) NOT NULL,
    correo                        VARCHAR2(100) NOT NULL,
    telefono                      INTEGER NOT NULL,
    foto                          VARCHAR2(200) NOT NULL,
    fecha_nacimiento              DATE NOT NULL,
    fecha_registro                DATE DEFAULT SYSDATE,
    direccion                     VARCHAR2(50) NOT NULL,
    credito                       INTEGER NOT NULL,
    ganancia                      INTEGER NOT NULL,
    clase_cliente                 INTEGER NOT NULL,
    genero                        INTEGER NOT NULL,
    status                        INTEGER DEFAULT 0 NOT NULL ,
    tipo_usuario                  INTEGER NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY(id_usuario),
    CONSTRAINT usuario_fk FOREIGN KEY(tipo_usuario) REFERENCES TIPO_USUARIO(id_tipo_usuario)
);



-- SE CREA EL AUTO INCREMENTABLE PARA LA TABLA USUARIO

    CREATE SEQUENCE AUTOUSER
    START WITH 1
    INCREMENT BY 1;




-- SE CREA UN TRIGGER PARA QUE SE INSERTE AUTOMATICAMENTE EL AUTOINCREMENTABLE EN LA TABLA USUARIO
    CREATE TRIGGER TRIG_USER
    BEFORE INSERT ON USUARIO
    FOR EACH ROW
    BEGIN
    SELECT AUTOUSER.NEXTVAL INTO :NEW.id_usuario FROM DUAL;
    END;



--creacion de sala
CREATE TABLE SALA (
    id_sala      INTEGER NOT NULL,
    fecha_hora   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    puntuacion   INTEGER DEFAULT 0 NOT NULL,
    estado_sala  INTEGER DEFAULT 0 NOT NULL, -- 0 sin solucion 1 solucionada
    usuario_cliente INTEGER not NULL,
    usuario_ayuda   INTEGER NOT NULL,
    CONSTRAINT sala_pk PRIMARY KEY (id_sala),
    CONSTRAINT usuario_fk1 FOREIGN KEY(usuario_cliente) REFERENCES USUARIO(id_usuario),
    CONSTRAINT usuario_fk2 FOREIGN KEY(usuario_ayuda) REFERENCES USUARIO(id_usuario)
);

--Describe SALA;





--creacion de secuencia de sala 

    CREATE SEQUENCE AUTOSALA
    START WITH 1
    INCREMENT BY 1;

--CREACION DE TRIGER AUTOINCREMENTAL DE SAL A
    CREATE TRIGGER TRIG_SALA
    BEFORE INSERT ON SALA 
    FOR EACH ROW 
    BEGIN
    SELECT AUTOSALA.NEXTVAL INTO :NEW.id_sala FROM DUAL;
    END;





--creacion de tabla de mensajes 


CREATE TABLE MENSAJE (
    id_mensaje          INTEGER NOT NULL,
    mensaje             VARCHAR2(4000) NOT NULL,
    fecha_hora          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sala                INTEGER NOT NULL,
    usuario             INTEGER NOT NULL,
    CONSTRAINT mensaje_pk PRIMARY KEY (id_mensaje),
    CONSTRAINT m_sala_fk FOREIGN KEY(sala) REFERENCES SALA(id_sala),
    CONSTRAINT m_usuario_fk FOREIGN KEY(usuario) REFERENCES USUARIO(id_usuario)
);

-- Sequencia de mensajes
    CREATE SEQUENCE AUTO_MENSAJE
    START WITH 1
    INCREMENT BY 1;


-- trigger de mensajes
    CREATE TRIGGER TRIG_MENSAJE
    BEFORE INSERT ON MENSAJE
    FOR EACH ROW
    BEGIN
    SELECT AUTO_MENSAJE.NEXTVAL INTO :NEW.id_mensaje FROM DUAL;
    END;


-- Manejo de productos   

    -- cracion de tabla de producto 
    CREATE TABLE PRODUCTO(
        id_producto INTEGER NOT NULL,
        cod_producto VARCHAR2(100) NOT NULL,
        imagen VARCHAR2(200) NOT NULL,
        descripcion VARCHAR2(200) NOT NULL,
        precio_producto INTEGER NOT NULL,
        fecha_publicacion DATE DEFAULT SYSDATE,
        cantidad_disponible INTEGER NOT NULL,
        usuario INTEGER NOT NULL,
        CONSTRAINT producto_pk PRIMARY KEY(id_producto),
        CONSTRAINT usuario_fk3 FOREIGN KEY(usuario) REFERENCES USUARIO(id_usuario)
    );


    -- CREACION DE EL AUTOINCREMENTAL DE PRODUCTOS 
        CREATE SEQUENCE AUTO_PRODUCTO
        START WITH 1
        INCREMENT BY 1;

        CREATE TRIGGER TRIG_PRODUCTO
        BEFORE INSERT ON PRODUCTO
        FOR EACH ROW
        BEGIN
        SELECT AUTO_PRODUCTO.NEXTVAL INTO :NEW.id_producto FROM DUAL;
        END;




    -- Cracion de tabla de colores
    CREATE TABLE  COLOR(
        id_color INTEGER NOT NULL,
        nombre_color VARCHAR2(50) NOT NULL,
        CONSTRAINT color_pk PRIMARY KEY(id_color)
    );

    -- CREACION DE LA SEQUENCIA DE COLORES
        CREATE SEQUENCE AUTO_COLOR
        START WITH 1
        INCREMENT BY 1;

        CREATE TRIGGER TRIG_COLOR
        BEFORE INSERT ON COLOR
        FOR EACH ROW
        BEGIN 
        SELECT AUTO_COLOR.NEXTVAL INTO :NEW.id_color FROM DUAL;
        END;


    -- CREACION DE TABLA COLOR_PRODUCTO 
    CREATE TABLE PRODUCTO_COLOR(
        id_producto_color INTEGER NOT NULL,
        producto INTEGER NOT NULL,
        color INTEGER NOT NULL,
        CONSTRAINT producto_color_pk PRIMARY KEY(id_producto_color),
        CONSTRAINT producto_fk1 FOREIGN KEY(producto) REFERENCES PRODUCTO(id_producto),
        CONSTRAINT color_fk FOREIGN KEY(color) REFERENCES COLOR(id_color)
    );

    --  CREACION DE LA SEQUENCIA DE COLORES Y PRODUCTOS 
        CREATE SEQUENCE AUTO_PRO_COLOR
        START WITH 1
        INCREMENT BY 1;

        CREATE TRIGGER TRIG_PRO_COLOR
        BEFORE INSERT ON PRODUCTO_COLOR
        FOR EACH ROW 
        BEGIN
        SELECT AUTO_PRO_COLOR.NEXTVAL INTO :NEW.id_producto_color FROM DUAL;
        END;


    -- creacion de tabla de categoria 
    CREATE TABLE CATEGORIA(
        id_categoria INTEGER NOT NULL,
        nombre_categoria VARCHAR2(100) NOT NULL,
        descripcion VARCHAR2(100) NOT NULL,
        CONSTRAINT categoria_pk PRIMARY KEY(id_categoria)
    );

    -- CREACION DE LA SEQUENCIA DE CATEGORIA 
        CREATE SEQUENCE AUTO_CATEGORIA
        START WITH 1
        INCREMENT BY 1;

        CREATE TRIGGER TRIG_CATEGORIA
        BEFORE INSERT ON CATEGORIA
        FOR EACH ROW 
        BEGIN 
        SELECT AUTO_CATEGORIA.NEXTVAL INTO :NEW.id_categoria FROM DUAL;
        END;

    -- CREACION DE TABLA DE PRODUCTO_CATEGORIA 
    CREATE TABLE PRODUCTO_CATEGORIA(
        id_producto_categoria INTEGER NOT NULL,
        producto INTEGER NOT NULL,
        categoria INTEGER NOT NULL,
        CONSTRAINT producto_categoria_pk PRIMARY KEY(id_producto_categoria),
        CONSTRAINT producto_fk2 FOREIGN KEY(producto) REFERENCES PRODUCTO(id_producto),
        CONSTRAINT categoria_fk1 FOREIGN KEY(categoria) REFERENCES CATEGORIA(id_categoria)
    );

    -- CREACION DE LA SEQUENCIA DE PRODUCTO  CATEGORIA 
        CREATE SEQUENCE AUTO_PRO_CATEGORIA
        START WITH 1
        INCREMENT BY 1;

        CREATE TRIGGER TRIG_PRO_CATEGORIA
        BEFORE INSERT ON PRODUCTO_CATEGORIA
        FOR EACH ROW 
        BEGIN 
        SELECT AUTO_PRO_CATEGORIA.NEXTVAL INTO :NEW.id_producto_categoria FROM DUAL;
        END;

    --CREACION DE TABLA CATEGORIA HIJA 
    CREATE TABLE CATEGORIA_HIJA(
        id_categoria_hija INTEGER NOT NULL,
        producto_categoria INTEGER NOT NULL,
        categoria INTEGER NOT NULL,
        CONSTRAINT categoria_hija_pk PRIMARY KEY(id_categoria_hija),
        CONSTRAINT producto_categoria_fk3 FOREIGN KEY(producto_categoria) REFERENCES PRODUCTO_CATEGORIA(id_producto_categoria),
        CONSTRAINT categoria FOREIGN KEY(categoria) REFERENCES CATEGORIA(id_categoria)
    );

    -- CREACION DE LA SEQUENCIA DE CATEGORIA HIJAS
        CREATE SEQUENCE AUTO_CATEGORIA_HIJA
        START WITH 1
        INCREMENT BY 1;

        CREATE TRIGGER TRIG_CATEGORIA_HIJA
        BEFORE INSERT ON CATEGORIA_HIJA
        FOR EACH ROW
        BEGIN
        SELECT AUTO_CATEGORIA_HIJA.NEXTVAL INTO :NEW.id_categoria_hija FROM DUAL;
        END;

    -- CREACION DE TABLA DE BITACORA
    CREATE TABLE BITACORA(
    cod_bitacora INTEGER NOT NULL PRIMARY KEY,
    texto VARCHAR2(500) NOT NULL,
    fecha DATE DEFAULT SYSDATE
    );

    -- SE CREA EL AUTO INCREMENTABLE PARA LA TABLA BITACORA
    CREATE SEQUENCE AUTOBITACORA
    START WITH 1
    INCREMENT BY 1;

    -- SE CREA UN TRIGGER PARA QUE SE INSERTE AUTOMATICAMENTE EL AUTOINCREMENTABLE EN LA TABLA BITACORA
    CREATE TRIGGER TRIG_BITACORA
    BEFORE INSERT ON BITACORA
    FOR EACH ROW
    BEGIN
    SELECT AUTOBITACORA.NEXTVAL INTO :NEW.cod_bitacora FROM DUAL;
    END;

