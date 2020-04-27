import {Request, Response} from 'express';
import db from '../database';


class ChatController{

    public chat (req: Request, res: Response){
        res.json({
            text: 'api/chat is start'
        });
    }

    public async Chat_Salas_Cliente(req: Request, res: Response){
        var cn = db.db2();
        var sql= "SELECT s.id_sala, s.usuario_ayuda as usuario, u.nombre FROM "+
                 "USUARIO u, SALA s "+ 
                 "WHERE s.usuario_cliente= : id_usuario AND u.id_usuario=s.usuario_ayuda AND s.estado_sala=0";
        
        await cn.exec(sql,[req.body.id_usuario],function(result: any){
            if(result.length>0){
                res.send(result);
            }else{
                res.status(404).json({
                    status: 'no tiene conversaciones'
                });
            }
        });

    }

    public async  Chat_Salas_Ayuda(req: Request, res: Response){
        var cn= db.db2();
        var sql= "SELECT s.id_sala, s.usuario_cliente as usuario,u.nombre FROM "+
                 "USUARIO u, SALA s "+
                 "WHERE s.usuario_ayuda= : id_usuario AND u.id_usuario=s.usuario_cliente AND s.estado_sala=0";

        await cn.exec(sql,[req.body.id_usuario],function(result: any){
            if(result.length>0){
                res.send(result);
            }else{
                res.status(404).json({
                    status: 'no tiene conversaciones'
                });
            }
        });

    }

    // TODO: consulta que traer el numero de conversacciones que tienen los clientes
    public async Salas_Ayuda(req: Request, res: Response){
        var cn = db.db2();
        var sql= "SELECT u.id_usuario,COUNT(*) as numero "+
                 "FROM USUARIO u,SALA s "+
                 "WHERE s.estado_sala=0 AND s.usuario_ayuda=u.id_usuario "+
                 "GROUP BY u.id_usuario";

        await cn.exec(sql,[],function(result: any){
            if(result.length>=0){
                res.send(result);
            }else{
                res.status(404).json({
                    status: 'Error'
                });
            }
        });
    }

    //  consulta que se encarga de traer los usuarios de ayuda(todo)
    public async Get_Usuario_Ayuda(req: Request, res: Response){
        var cn = db.db2();
        var sql = "SELECT id_usuario FROM usuario WHERE tipo_usuario=1";
        await cn.exec(sql,[],function(result: any){
            if(result.length>=0){
                res.send(result);
            }else{
                res.status(404).json({
                    status: 'Error'
                });
            }
        })
    }

    public async Insertar_mensajes(req: Request, res: Response){
        var cn = db.db2();
        var sql = "INSERT INTO MENSAJE(mensaje,sala,usuario) VALUES(:mensaje, :sala, :id_usuario)";
        
        await cn.exec(sql,[req.body.mensaje, req.body.sala, req.body.id_usuario],function(result: any){
            if(result==undefined){
                res.json({
                    text: "Mensaje enviado"
                })
            }else{
                res.status(404).json({
                    status: 'Error'
                });
            }
        });
    }

    public async Get_Mensajes(req: Request, res: Response){
        var cn = db.db2();
        var sql =  "SELECT msg.mensaje,msg.fecha_hora,u.nombre "+
                   "FROM MENSAJE msg,Usuario u "+
                   "WHERE sala= :id_sala AND msg.usuario=u.id_usuario";
        await cn.exec(sql,[req.body.id_sala],function(result: any){
                res.send(result);
        })
    }

    public async Nueva_Sala(req: Request, res: Response){
        var cn = db.db2();
        var sql = "INSERT INTO SALA(usuario_cliente,usuario_ayuda) VALUES(:id_cliente ,:id_ayuda)"

        await cn.exec(sql,[req.body.id_cliente, req.body.id_ayuda],function(result: any){
            if(result == undefined){
                res.json({
                    text: "sala Guardada"
                });
            }else{
                res.status(404).json({
                    status: 'Error'
                });
            }
        })
    }
    
    public async Problema_Solucionado(req: Request, res: Response){
        var cn = db.db2();
        var sql= "UPDATE SALA SET "+
                "PUNTUACION= :puntos , ESTADO_SALA = 1 "+
                "WHERE ID_SALA = :id_sala ";
        console.log(req.body);
        await cn.exec(sql,[req.body.puntos,req.body.id_sala],function(result: any){
                if(result == undefined){
                    res.json({
                        text: "Solucionado"
                    });
                }else{
                    res.status(404).json({
                        status: 'Error'
                    });
                }
        })
        
    }
}


export const chatController=new ChatController();