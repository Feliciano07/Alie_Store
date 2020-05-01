import {Request, Response} from 'express';

import db from '../database';


class CargaController{

    

    constructor(){
       
    }

    /*public carga(req: Request, res: Response){
        res.json({
            text: 'api/carga is start'
        });
    }*/

    public async carga(req: Request, res: Response){
        var cn = db.db2();
        var sql= "SELECT * FROM PRODUCTO";
        await cn.exec(sql,[],function(result: any){
            res.json(result);
        })
    }


    public async cargarFoto(req: Request, res: Response){
        res.json(req.file)
    }


    public async Cargar_Productos(req: Request, res: Response){
        var cn = db.db2();

        var sql = "BEGIN "+ 
                    "CARGA(:id_usuario, :codigo, :imagen, :descripcion, :precio, :cantidad, :categoria, :color); "+
                  "END;";

                await cn.exec(sql,[
                    req.body.id_usuario,
                    req.body.productos.codigo, req.body.productos.imagen, req.body.productos.descripcion, req.body.productos.precio,
                    req.body.productos.cantidad, req.body.productos.categoria, req.body.productos.color
                ],function(result: any){
                    if(result == undefined){
                        res.json(
                            {text: 'ingresado'}
                        )
                    }else{
                        res.status(404).json({
                            status: 'El usuario no existe o no ha sido confirmado'
                        });
                    }
                });
    }


    
}

export const cargaController = new CargaController();