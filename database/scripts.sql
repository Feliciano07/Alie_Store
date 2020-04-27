INSERT INTO TIPO_USUARIO(id_tipo_usuario,descripcion) values(0,'ADMIN');
INSERT INTO TIPO_USUARIO(id_tipo_usuario,descripcion) values(1,'AYUDA');
INSERT INTO TIPO_USUARIO(id_tipo_usuario,descripcion) values(2,'CLIENTE');

SELECT * FROM TIPO_USUARIO;


INSERT INTO USUARIO(nombre,apellido,clave,correo,telefono,foto,fecha_nacimiento,
direccion,credito,ganancia,clase_cliente,genero,tipo_usuario)
VALUES('fernando','chajon','1234','fernando@hotmail.com',42719347,'url.com',TO_DATE('18/01/1998','dd/mm/yyyy'),
'direccion',100,0,0,0,0);


INSERT INTO USUARIO(nombre,apellido,clave,correo,telefono,foto,fecha_nacimiento,
direccion,credito,ganancia,clase_cliente,genero,tipo_usuario)
VALUES('Feliciano','chajon','1234','fernando07@hotmail.com',42719347,'url.com',TO_DATE('18/01/1998','dd/mm/yyyy'),
'direccion',100,0,0,0,1);



UPDATE USUARIO SET  
status=1 where id_usuario=1;

UPDATE USUARIO SET  
status=1 where id_usuario=2;



SELECT * FROM USUARIO;

/*
    clase de clientes 
    Diamante 50 000   0
    Platino 25 000    1
    oro 10 000        2
    plata 5 000       3
    bronce 1 000      4
*/
/*
    Masculino 0
    Femenino 1
*/

/*
    para la creacion de salas vamos 
    a utilizar u store procedure
*/

-- ================= scripta para armar la sala de chat ==============

    --cuando no mas se arma
    INSERT INTO SALA(usuario_cliente,usuario_ayuda) VALUES(1,2);
    Select *
    from (select * from SALA
    order by id_sala desc )
    where rownum = 1 ;

    -- scripts para obtener las salas en las que esta un usuario 

    --cliente
    SELECT s.id_sala,s.usuario_ayuda as usuario,u.nombre FROM
    Usuario u, sala s
    WHERE s.usuario_cliente=17 AND u.id_usuario=s.usuario_ayuda AND s.estado_sala=0;

    --ayuda
    SELECT s.id_sala, s.usuario_cliente as usuario,u.nombre FROM
    USUARIO u, SALA s
    WHERE s.usuario_ayuda=16 AND u.id_usuario=s.usuario_cliente AND s.estado_sala=0;

--***********************************************************************


-- ======== SCRIPT PARA OBTENER LOS USUARIO DE AYUDA Y el numero de conversaciones activas========

    -- este script trae los usuarios ayuda que ya tiene conversacinones
    SELECT u.id_usuario,COUNT(*) as numero
    FROM USUARIO u,SALA s 
    WHERE s.estado_sala=0 AND s.usuario_ayuda=u.id_usuario
    GROUP BY u.id_usuario

    -- este trae a todos los ayuda
    SELECT id_usuario FROM usuario WHERE tipo_usuario=1;

--**********************************************************************************

-- ============== SCRIT PARA MANDAR INSERTAR LOS MENSAJES =============================

    INSERT INTO MENSAJE(mensaje,sala,usuario) VALUES('hola',10,13);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('Hola como puedo ayudart',10,7);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('Como puedo subir productos',10,13);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('con gusto, en la parte inferio tenemos una seccion que explica',10,7);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('Donde dice preguntas frecuentes',10,13);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('si en esa parte, podrias echar un vistazo',10,7);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('Genial, esta bien explicado',10,13);

    INSERT INTO MENSAJE(mensaje,sala,usuario) values('es un gusto poder ayudar',10,7);

-- *************************************************************************************


--============ Script para obtener los mensajes que pertenecen a una sala en especifica======

    SELECT msg.mensaje,msg.fecha_hora,u.nombre 
    FROM MENSAJE msg,Usuario u 
    WHERE sala=9 AND msg.usuario=u.id_usuario;

--*******************************************************************************************


-- =========== SCRIPT PARA DAR POR SOLUCIONADA LA CONVERSACIONE=============================
    UPDATE SALA SET 
    PUNTUACION=5 , ESTADO_SALA = 1
    WHERE ID_SALA = 23;
--*****************************************************************************************


