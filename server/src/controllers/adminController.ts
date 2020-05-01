import {Request, Response} from 'express';
import db from '../database';
import nodemailer from 'nodemailer';


class AdminController{

    public admin (req: Request, res: Response){

        res.json({
            text: 'api admin is start'
        })
    }

    public async Create(req: Request, res: Response){
        var cn = db.db2();
        console.log(req.body);
        var sql = " BEGIN "+
                  "Registro_Admin(:nombre,:apellido,:clave,:correo,:telefono,:foto,:fecha_nacimiento,"+
                  ":direccion,:credito,:ganancia,:clase_cliente,:genero,:tipo_usuario); "+
                  "end;"
        await cn.exec(sql,[req.body.nombre, req.body.apellido, req.body.clave, req.body.correo, req.body.telefono,
            req.body.foto, req.body.fecha_nacimiento, req.body.direccion, req.body.credito, req.body.ganancia,
            req.body.clase_cliente, req.body.genero, req.body.tipo_usuario],function(result: any){
                if(result == undefined){

                    var transport= nodemailer.createTransport({
                        service : 'gmail',
                        auth:{
                            user: 'fernandochajon122@gmail.com',
                            pass: 'cuentanueva122'
                        }
                    });

                    var mail_option = {
                        from: 'Fernando Chajon <fernandochajon122@gmail.com',
                        to: req.body.correo,
                        subject : 'Cuenta Creada',
                        text: 'Hola' + req.body.nombre,
                        html: '<h1>Alie Storage</h1>'+
                        ' <h3>Ya formas parte del equipo de alie store ' +'</h3> '+
                        ' <ul> '+
                            ' <li>correo: ' + req.body.correo+ '</li> '+
                            ' <li>password: ' + req.body.clave+ '</li> '+
                        ' </ul>'+
                        ' <p>Ingresa al link, para iniciar sesion</p> '+
                        ' <a href="http://localhost:4200/login' + req.body.correo+ '" class="btn btn-primary stretched-link">Inicar Session</a> '// cuerpo de texto sin formato
                    }
                    transport.sendMail(mail_option, (error, info) => {
                        if (error) {
                            res.status(404).json({
                                status: 'El usuario no existe o no ha sido confirmado'
                            });
                        }
                        console.log('Message sent: %s', info.messageId);
                        res.json({valor:'1'});
                      });
                }else{
                    res.status(404).json({
                        status: 'El usuario no existe o no ha sido confirmado'
                    });
                }
            })
    }

    public async Listar_Usuarios(req: Request, res: Response){
        var cn = db.db2();

        var sql =" SELECT * FROM USUARIO ";

        await cn.exec(sql,[], function(result: any){
            if(result.length >=0){
                res.json(result);
            }else{
                res.status(404).json({
                    status: 'Error Oracle'
                });
            }
        })
    }

    public async UpdateUser(req: Request, res: Response){
        var cn = db .db2();
        var sql = "BEGIN " +
                  "Update_User(:NOMBRE, :APELLIDO, :CLAVE, :DIRECCION, :TELEFONO, :ID_USUARIO);"+
                  "END;"; // procedure

        await cn.exec(sql, [req.body.NOMBRE, req.body.APELLIDO, req.body.CLAVE, req.body.DIRECCION
        , req.body.TELEFONO, req.body.ID_USUARIO], function(result:any){
            if(result == undefined){
                res.json({text: 'update'});
            }else{
                res.status(404).json({
                    status: 'Error Oracle'
                });
            }
        })
    }
}


export const adminController = new AdminController();