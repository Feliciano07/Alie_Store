import {Request, Response} from 'express';

import db from '../database';


class ProductoController{

    constructor(){

    }

    public producto (req:Request, res: Response){
        res.json({
            text: 'api/producto is start'
        });
    }

    public async get_Productos_Cliente(req: Request, res: Response){
        var cn = db.db2();
        var sql= "SELECT "+
                 "pr.imagen,pr.descripcion,pr.precio_producto,pr.cantidad_disponible, "+
                 "ct.nombre_categoria as padre "+
                 "FROM PRODUCTO pr, "+
                 "PRODUCTO_CATEGORIA pc, "+
                 "CATEGORIA ct "+
                 "WHERE pr.usuario= :ID_USUARIO AND pr.id_producto=pc.producto AND "+
                 "pc.categoria=ct.id_categoria ";

        await cn.exec(sql,[req.body.ID_USUARIO],function(result: any){
            if(result.length > 0){
                res.json(result);
            }else{
                res.json({text: 'no tiene productos'});
            }
        })
    }

    public async Get_Productos_App(req: Request, res: Response){
        var cn = db.db2();
        var sql= "SELECT "+
                 "pr.imagen,pr.descripcion,pr.precio_producto,pr.cantidad_disponible, "+
                 "ct.nombre_categoria as padre "+
                 "FROM PRODUCTO pr, "+
                 "PRODUCTO_CATEGORIA pc, "+
                 "CATEGORIA ct "+
                 "WHERE pr.usuario= :ID_USUARIO AND pr.id_producto=pc.producto AND "+
                 "pc.categoria=ct.id_categoria ";

        await cn.exec(sql,[req.body[0].ID_USUARIO],function(result: any){
            if(result.length > 0){
                res.json(result);
            }else{
                res.json({text: 'no tiene productos'});
            }
        })
    }

    public async Search_Producto(req: Request, res: Response){
        var cn= db.db2();
        console.log(req.body);
        var re= " pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible ";

        var sql = "SELECT "+ re +
                  "FROM PRODUCTO pr,CATEGORIA ct "+
                  "WHERE UPPER (pr.descripcion) LIKE UPPER(:producto) "+
                  "UNION "+
                  "SELECT" + re +
                  "FROM PRODUCTO pr, PRODUCTO_CATEGORIA pc, CATEGORIA ct "+
                  "WHERE pr.id_producto=pc.producto AND pc.categoria=ct.id_categoria and UPPER(ct.nombre_categoria) LIKE UPPER(:producto) "+
                  "UNION "+
                  "SELECT " + re +
                  "FROM PRODUCTO pr, COLOR cr, PRODUCTO_COLOR pl "+
                  "WHERE pr.id_producto=pl.producto AND pl.color=cr.id_color AND UPPER(cr.nombre_color) LIKE UPPER( :producto) " ;

        await cn.exec(sql,[req.body.producto],function(result: any){
            if(result.length > 0){
                res.json(result);
            }else{
                res.json({
                    text: 'no se encontro producto con: '+req.body.producto
                })
            }
        })
    }

    public async Search_App(req: Request, res: Response){
        var cn= db.db2();
        console.log(req.body);
        var re= " pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible ";

        var sql = "SELECT "+ re +
                  "FROM PRODUCTO pr,CATEGORIA ct "+
                  "WHERE UPPER (pr.descripcion) LIKE UPPER(:producto) "+
                  "UNION "+
                  "SELECT" + re +
                  "FROM PRODUCTO pr, PRODUCTO_CATEGORIA pc, CATEGORIA ct "+
                  "WHERE pr.id_producto=pc.producto AND pc.categoria=ct.id_categoria and UPPER(ct.nombre_categoria) LIKE UPPER(:producto) "+
                  "UNION "+
                  "SELECT " + re +
                  "FROM PRODUCTO pr, COLOR cr, PRODUCTO_COLOR pl "+
                  "WHERE pr.id_producto=pl.producto AND pl.color=cr.id_color AND UPPER(cr.nombre_color) LIKE UPPER( :producto) " ;

        await cn.exec(sql,[req.body[0].producto],function(result: any){
            if(result.length > 0){
                res.json(result);
            }else{
                res.json({
                    text: 'no se encontro producto con: '+req.body.producto
                })
            }
        })

    }


}

export const productoController =new ProductoController();