-- STORE PROCEDURE PARA LA CREACION DE USUARIOS POR EL AMIN

    CREATE OR REPLACE PROCEDURE Registro_Admin
    (
        p_nombre in VARCHAR2,
        p_apellido in VARCHAR2,
        p_clave in VARCHAR2,
        p_correo in VARCHAR2,
        p_telefono in INTEGER,
        p_foto IN VARCHAR2,
        p_fecha_nacimiento IN VARCHAR2,
        p_direccion IN VARCHAR2,
        p_credito IN INTEGER,
        p_ganancia IN INTEGER,
        p_clase_cliente IN INTEGER,
        p_genero IN INTEGER,
        p_tipo_usuario IN INTEGER
    )
    IS 
    BEGIN
        INSERT INTO USUARIO(nombre,apellido,clave,correo,telefono,foto,fecha_nacimiento,
        direccion,credito,ganancia,clase_cliente,genero,status,tipo_usuario)
        VALUES(p_nombre,p_apellido,p_clave,p_correo ,p_telefono,p_foto,TO_DATE(p_fecha_nacimiento,'YYYY-MM-DD'),
        p_direccion,p_credito,p_ganancia,p_clase_cliente,p_genero,1,p_tipo_usuario);

        INSERT INTO BITACORA(texto) values('creacion de usuario por parte de un administrador');

    END;
    /

    -- ejecucin del procedmiento
    BEGIN
    Registro_Admin('PruebaAdmin','chajon','1234','fernando@hotmail.com',42719347,'url.com','18/01/1998','direccion',100,0,0,0,0);
    END;
--

-- script para actualizar datos 

    CREATE OR REPLACE PROCEDURE Update_User(
        p_nombre in VARCHAR2,
        p_apellido in VARCHAR2,
        p_clave in VARCHAR2,
        p_direccion in VARCHAR2,
        p_telefono in INTEGER,
        p_id in INTEGER
    )
    IS 
    BEGIN

        UPDATE USUARIO SET
        nombre=p_nombre, apellido=p_apellido, clave=p_clave,
        direccion=p_direccion, telefono=p_telefono
        WHERE ID_USUARIO=p_id;

        INSERT INTO BITACORA(texto) VALUES('Modificacion de datos de usuario:' || p_nombre);

    END;
    /

    -- ejecucion 
    BEGIN
    Update_User('cambio','usuario','la misma','USA',00000,32);
    END;

-- 

-- script ascender a un usuario 

    CREATE OR REPLACE PROCEDURE ASCENDER_USER(
        p_id_usuario in INTEGER,
        p_tipo_usuario in INTEGER,
        p_razon in VARCHAR2
    )
    IS 
    BEGIN

        IF(p_tipo_usuario=0)
            THEN 

                UPDATE USUARIO 
                SET tipo_usuario=p_tipo_usuario
                WHERE id_usuario=p_id_usuario;

                INSERT INTO BITACORA(texto) VALUES('Se Ascendio a admin al usuario: '|| p_id_usuario || ' por:' || p_razon);
        ELSE

                UPDATE USUARIO 
                SET tipo_usuario=p_tipo_usuario
                WHERE id_usuario=p_id_usuario;

                INSERT INTO BITACORA(texto) VALUES('Se Ascendio a ayuda al usuario: '|| p_id_usuario || ' por:' || p_razon);
        END IF;

    END;
    /

    BEGIN
        ASCENDER_USER(5,0,'Por su contribucion al sistema');
    END;

-- 



-- scrip descender a un usuario 

    CREATE OR REPLACE PROCEDURE DESCENDER_USER(
        p_id_usuario in INTEGER,
        p_tipo_usuario in INTEGER,
        p_razon in VARCHAR2
    )
    IS 
    BEGIN

        IF(p_tipo_usuario=1)
            THEN 

                UPDATE USUARIO 
                SET tipo_usuario=p_tipo_usuario
                WHERE id_usuario=p_id_usuario;

                INSERT INTO BITACORA(texto) VALUES('Se descendio a ayuda al usuario: '|| p_id_usuario || ' por:' || p_razon);
        ELSE

                UPDATE USUARIO 
                SET tipo_usuario=p_tipo_usuario
                WHERE id_usuario=p_id_usuario;

                INSERT INTO BITACORA(texto) VALUES('Se descendio a usuario al usuario: '|| p_id_usuario || ' por:' || p_razon);
        END IF;

    END;
    /

    -- ejecucion
    BEGIN
        DESCENDER_USER(21,2,'Por no ayudar');
    END;

--
    