
drop table mensaje;
drop table sala;
drop table usuario;
drop table tipo_usuario;

DROP SEQUENCE AUTOUSER;


DROP SEQUENCE AUTOSALA;
DROP TRIGGER TRIG_SALA;


DROP SEQUENCE AUTO_MENSAJE;
DROP TRIGGER TRIG_MENSAJE;


/* CREACION DE SALA_USUARIO 

    CREATE TABLE SALA_USUARIO (
        id_sala_usuario     INTEGER NOT NULL,
        sala        INTEGER NOT NULL,
        usuario  INTEGER NOT NULL,
        CONSTRAINT sala_usuario_pk PRIMARY KEY(id_sala_usuario),
        CONSTRAINT sala_fk FOREIGN KEY(sala) REFERENCES SALA(id_sala),
        CONSTRAINT s_usuario_fk FOREIGN KEY(usuario) REFERENCES USUARIO(id_usuario)
    );

    --DESCRIBE SALA_USUARIO;

    /*
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

*/ 


