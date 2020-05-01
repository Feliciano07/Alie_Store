        DECLARE
        id_ca INTEGER;
        BEGIN

            Select id_categoria into id_ca
            from (select id_categoria from categoria
            order by id_categoria desc )
            where rownum = 1 ;

            dbms_output.put_line(id_ca);
        END;

--CURSOR


    -- ejecucion del procedimineto 

    BEGIN
        CARGA(24,'A2','imagen','cuadros bonitos',40,20,'imagen-cuadros-hogar','ver-azul-amarillo');
    END;

--procedimiento ============================================
    CREATE OR REPLACE PROCEDURE CARGA
    (
        p_id_usuario IN INTEGER ,
        p_cod_producto in VARCHAR2,
        p_imagen in VARCHAR2,
        p_descripcion in VARCHAR2,
        p_precio_producto in INTEGER,
        p_disponible in INTEGER,
        p_cates in VARCHAR2,
        p_colores in VARCHAR2
    )
    IS
        var_producto INTEGER;
    BEGIN
        -- aca se crea el producto

        INSERT INTO PRODUCTO(cod_producto,imagen,descripcion,precio_producto,cantidad_disponible,usuario)
        VALUES(p_cod_producto,p_imagen,p_descripcion,p_precio_producto,p_disponible,p_id_usuario);

        Select id_producto into var_producto
        from (select id_producto from PRODUCTO
        order by id_producto desc )
        where rownum = 1 ;

        DECLARE
            -- categorias que vienen
            CURSOR Cursor_CATE IS
            SELECT LEVEL AS id, REGEXP_SUBSTR(p_cates, '[^-]+', 1, LEVEL) AS dato
            FROM dual
            CONNECT BY REGEXP_SUBSTR(p_cates, '[^-]+', 1, LEVEL) IS NOT NULL;

            -- colores que vienen
            CURSOR Cursor_COLOR IS 
            SELECT LEVEL AS id, REGEXP_SUBSTR(p_colores, '[^-]+', 1, LEVEL) AS dato
            FROM dual
            CONNECT BY REGEXP_SUBSTR(p_colores, '[^-]+', 1, LEVEL) IS NOT NULL;

            V_cc number;
            V_id_existe number;
            V_producto_categoria INTEGER;
        BEGIN



            -- foo loop categorias
            FOR f_cate IN Cursor_CATE LOOP

                -- mando a hacer select de categoias
                SELECT COUNT(NOMBRE_CATEGORIA) INTO V_cc 
                FROM CATEGORIA WHERE NOMBRE_CATEGORIA=f_cate.dato;

                -- caso en que no existe sea la primera iteracion
                IF(V_cc=0)
                    THEN -- no existe la categoria , se debe de insertar en la tabla
                        INSERT INTO CATEGORIA(NOMBRE_CATEGORIA) VALUES(f_cate.dato);

                END IF;
                V_cc :=0;
            END LOOP;


            -- for loop de colores
            FOR f_color IN Cursor_COLOR LOOP
                -- mando hacer un select de categorias 
                SELECT COUNT(NOMBRE_COLOR) INTO V_cc
                FROM COLOR WHERE NOMBRE_COLOR= f_color.dato;

                IF(V_cc=0)
                    THEN -- no existe el color 
                        INSERT INTO COLOR(NOMBRE_COLOR) VALUES(f_color.dato);

                    END IF;
                V_cc := 0;
            END LOOP;


            -- empiezo a relacionar producto,categoria y categoria hija
            FOR i_cate IN Cursor_CATE LOOP
                SELECT id_categoria INTO V_id_existe 
                FROM CATEGORIA WHERE NOMBRE_CATEGORIA=i_cate.dato;

                IF(i_cate.id=1)
                    THEN -- primer dato

                        INSERT INTO PRODUCTO_CATEGORIA(PRODUCTO,CATEGORIA) VALUES(var_producto,V_id_existe);

                        Select id_producto_categoria into V_producto_categoria
                        from (select id_producto_categoria from PRODUCTO_CATEGORIA
                        order by id_producto_categoria desc )
                        where rownum = 1 ;

                    ELSE
                        INSERT INTO CATEGORIA_HIJA(PRODUCTO_CATEGORIA,CATEGORIA) VALUES(V_producto_categoria,V_id_existe);

                END IF;

            END LOOP;

            -- empiezo a relacionar color, producto

            FOR i_color IN Cursor_COLOR LOOP
                SELECT id_color INTO V_id_existe
                FROM COLOR WHERE NOMBRE_COLOR=i_color.dato;

                INSERT INTO PRODUCTO_COLOR(producto,color) VALUES(var_producto,V_id_existe);

            END LOOP;

        END;

    END;
    /