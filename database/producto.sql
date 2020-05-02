	
-- consulta para poder traer los productos de un cliente especifico
	SELECT
	pr.imagen,pr.descripcion,pr.precio_producto,pr.cantidad_disponible,
	ct.nombre_categoria as padre
	FROM PRODUCTO pr,
	PRODUCTO_CATEGORIA pc,
	CATEGORIA ct
	WHERE pr.usuario=15 AND pr.id_producto=pc.producto AND
	pc.categoria=ct.id_categoria ;

-- 

-- BUSQUEDA DE PRODUTOS DADA UNA PALABRA ESPECIFICA ESCRITA POR EL USUARIO 

    SELECT pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible
    FROM
	PRODUCTO pr,
    CATEGORIA ct
	WHERE UPPER (pr.descripcion) LIKE UPPER('%compu%') 
    UNION
    SELECT pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible
    FROM 
    PRODUCTO pr,
    PRODUCTO_CATEGORIA pc,
    CATEGORIA ct 
    WHERE pr.id_producto=pc.producto AND pc.categoria=ct.id_categoria and UPPER(ct.nombre_categoria) LIKE UPPER('%elec%')
    UNION
    SELECT pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible
    FROM 
    PRODUCTO pr,
    COLOR cr,
    PRODUCTO_COLOR pl
    WHERE pr.id_producto=pl.producto AND pl.color=cr.id_color AND UPPER(cr.nombre_color) LIKE UPPER('%amarillo%')
	
	;