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


}

export const productoController =new ProductoController();