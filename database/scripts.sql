INSERT INTO TIPO_USUARIO(id_tipo_usuario,descripcion) values(0,'ADMIN');
INSERT INTO TIPO_USUARIO(id_tipo_usuario,descripcion) values(1,'AYUDA');
INSERT INTO TIPO_USUARIO(id_tipo_usuario,descripcion) values(2,'CLIENTE');

SELECT * FROM TIPO_USUARIO;


INSERT INTO USUARIO(nombre,apellido,clave,correo,telefono,foto,fecha_nacimiento,
direccion,credito,ganancia,clase_cliente,genero,tipo_usuario)
VALUES('fernando','chajon','1234','fernando@hotmail.com',42719347,'url.com',TO_DATE('18/01/1998','dd/mm/yyyy'),
'direccion',100,0,0,0,0);


SELECT * FROM USUARIO;