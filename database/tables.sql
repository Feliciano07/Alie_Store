CREATE DATABASE Store;

use  Alie_Store ;

--Creacion de las tablas para usar 

--talbla de usuario y tipo 


CREATE TABLE TIPO_USUARIO (
    id_tipo_usuario  INTEGER NOT NULL,
    descripcion      VARCHAR2(20),
    CONSTRAINT tipo_usuario_pk PRIMARY KEY(id_tipo_usuario)
);

Describe TIPO_USUARIO;


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
    tipo_usuario                  INTEGER NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY(id_usuario),
    CONSTRAINT usuario_fk FOREIGN KEY(tipo_usuario) REFERENCES TIPO_USUARIO(id_tipo_usuario)
);
Describe USUARIO;

--cuando ya existe los triger
-- DROP SEQUENCE AUTOUSER;
-- DROP TRIGGER TRIG_USER;


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
    puntuacion   INTEGER NOT NULL,
    estado_sala  CHAR(1) NOT NULL, -- 0 sin solucion 1 solucionada
    CONSTRAINT sala_pk PRIMARY KEY (id_sala)
);

Describe SALA;

/*
DROP SEQUENCE AUTOSALA;
DROP TRIGGER TRIG_SALA;
*/

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

--CREACION DE SALA_USUARIO 

CREATE TABLE SALA_USUARIO (
    id_sala_usuario     INTEGER NOT NULL,
    sala        INTEGER NOT NULL,
    usuario  INTEGER NOT NULL,
    CONSTRAINT sala_usuario_pk PRIMARY KEY(id_sala_usuario),
    CONSTRAINT sala_fk FOREIGN KEY(sala) REFERENCES SALA(id_sala),
    CONSTRAINT s_usuario_fk FOREIGN KEY(usuario) REFERENCES USUARIO(id_usuario)
);

DESCRIBE SALA_USUARIO;


    DROP SEQUENCE AUTO_SALA_USUARIO;
    DROP TRIGGER TRIG_SALA_USUARIO;

--creacio de autoincrement de sala_usuario 
CREATE SEQUENCE AUTO_SALA_USUARIO
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_SALA_USUARIO
BEFORE INSERT ON SALA_USUARIO
FOR EACH ROW
BEGIN
SELECT AUTO_SALA_USUARIO.NEXTVAL INTO :NEW.id_sala_usuario FROM DUAL;
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

DESCRIBE MENSAJE;
/*
    DROP SEQUENCE AUTO_MENSAJE;
    DROP TRIGGER TRIG_MENSAJE;
*/

CREATE SEQUENCE AUTO_MENSAJE
START WITH 1
INCREMENT BY 1;

CREATE TRIGGER TRIG_MENSAJE
BEFORE INSERT ON MENSAJE
FOR EACH ROW
BEGIN
SELECT AUTO_MENSAJE.NEXTVAL INTO :NEW.id_mensaje FROM DUAL;
END;






