-- promedio de la puntuacion de los servicios de ayuda 

    SELECT sr.id_usuario, sr.nombre, sr.correo, AVG(sl.puntuacion) as promedio
    FROM USUARIO sr,
    SALA sl
    WHERE sr.tipo_usuario=1 AND sr.id_usuario=sl.usuario_ayuda
    GROUP by sr.id_usuario, sr.nombre, sr.correo
    ORDER BY AVG(sl.puntuacion) DESC;


--

-- 'YYYY-MM-DD' -- 0 es masculino y 1 femenino

-- lista de servicio de ayuda masculino que hayan nacido arriba de X year
    

    SELECT * FROM USUARIO
    WHERE genero=0 and tipo_usuario=1 and to_char(fecha_nacimiento,'YYYY') > '1998';

--

-- lista de administradores femeninos que hayan nacido abajo de Y year 

    SELECT * FROM USUARIO
    WHERE genero=1 and tipo_usuario=0 and to_char(fecha_nacimiento,'YYYY') < '2020';

--

--  top de 3 clientes con mas productos

    SELECT * FROM (
        SELECT  usr.id_usuario, usr.nombre, usr.correo, COUNT(*) as Total
        FROM 
        USUARIO usr, PRODUCTO pr
        WHERE usr.id_usuario=pr.usuario 
        GROUP BY usr.id_usuario, usr.nombre, usr.correo
        ORDER BY COUNT(*) DESC
    )
    WHERE ROWNUM<4;

-- 

-- TODOS LOS PRODUCTOS QUE TENGA X CANTIDAD DISPONIBLE 

    SELECT * FROM 
    PRODUCTO
    WHERE cantidad_disponible=20;

--

--todos los productos con su categoria 
    SELECT pr.* , ct.* FROM 
    PRODUCTO pr ,
    PRODUCTO_CATEGORIA pc,
    CATEGORIA ct
    WHERE pr.id_producto=pc.producto and pc.categoria=ct.id_categoria ;
-- 
