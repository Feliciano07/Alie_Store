import {Request, Response} from 'express'

import db from '../database';
import nodemailer from 'nodemailer';
 

class UserController{

    public user(req: Request, res: Response){
        res.json({
            text: 'API is start'
        })
    }

    public async list(req: Request, res: Response){
        var cn= db.db2();
        var sql = "SELECT * FROM USUARIO";

        await cn.exec(sql,[],function(result: any){
                
                res.send(result);
        });
    }

    public  async create(req: Request, res: Response){
        

        var cn =db.db2();
        var sql ="INSERT INTO USUARIO(nombre,apellido,clave,correo,telefono,foto,fecha_nacimiento,"+
                "direccion,credito,ganancia,clase_cliente,genero,tipo_usuario) "+ // values
                "VALUES(:nombre,:apellido,:clave,:correo,:telefono,:foto,TO_DATE(:fecha_nacimiento,'YYYY-MM-DD'),"+
                ":direccion,:credito,:ganancia,:clase_cliente,:genero,:tipo_usuario)";
        await cn.exec(sql,[req.body.nombre,req.body.apellido,req.body.clave,req.body.correo,
                    req.body.telefono,req.body.foto,req.body.fecha_nacimiento,req.body.direccion,req.body.credito,req.body.ganancia,
                    req.body.clase_cliente,req.body.genero,req.body.tipo_usuario],function(result: any){});

        
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
            subject : 'Confirmación de cuenta',
            text: 'Hola ' +req.body.nombre,
            html: '<h1>Alie Storage</h1>'+
            ' <h3>Bienvenido ' +req.body.nombre+ '</h3> '+
            ' <ul> '+
                ' <li>Username: ' + req.body.correo+ '</li> '+
                ' <li>password: ' + req.body.clave+ '</li> '+
            ' </ul>'+
            ' <p>Ingresa al link, para confirmar tu correo</p> '+
            ' <a href="http://localhost:3000/api/usuario/status/' + req.body.correo+ '" class="btn btn-primary stretched-link">Confirmar Correo</a> '// cuerpo de texto sin formato
        }
        transport.sendMail(mail_option, (error, info) => {
            if (error) {
              res.json({valor: '0'})
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json({valor:'1'});
          });
       
    }

    public async UpdateStatus(req: Request, res: Response){
        var cn=db.db2();
        var CORREO=req.params.correo
        var sql ="UPDATE USUARIO SET status = 1 "+ " WHERE correo = :CORREO";
        await cn.exec(sql,[CORREO],function(result: any){
            if(result == undefined){
                res.send("Correo Confirmado");
            }else{
                res.send("La confirmacion no se ha realizado");
            }
        });
    }

    /**
     * async Login
     */
    public async Login(req: Request, res: Response) {
        var cn =db.db2();
        var sql = 'SELECT * FROM USUARIO WHERE correo = :correo AND clave = :clave  AND status = 1';
        //console.log(req.body);
        await cn.exec(sql,[req.body.correo,req.body.clave],function(result: any){
            if(result.length>0){
                res.send(result[0]);
            }else{

                res.status(404).json({
                    status: 'El usuario no existe o no ha sido confirmado'
                });
            }
        });

    }

    public async Recuperar_Pass(req: Request, res: Response){
        var cn = db.db2();
        // generador token 
        var hashCode = function(s: any) {
            var h = 0, l = s.length, i = 0;
            if ( l > 0 )
              while (i < l)
                h = (h << 18) - h + s.charCodeAt(i++) | 0;
            return h;
          };
          let hash=hashCode(JSON.stringify(req.body));
          let clave =hash.toString();

        var sql = " UPDATE USUARIO SET "+
                    "CLAVE = :clave "+
                    "WHERE CORREO= :correo";

        await cn.exec(sql,[clave,req.body.correo],function(result: any){
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
                    subject : 'Recuperacion de Clave',
                    text: 'Hola ',
                    html: '<h1>Alie Storage</h1>'+
                    ' <h3>Es un gusto poder ayuda ' +'</h3> '+
                    ' <ul> '+
                        ' <li>correo: ' + req.body.correo+ '</li> '+
                        ' <li>password: ' + clave+ '</li> '+
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
        });
        
        
    }
}

export const userController =new UserController();
