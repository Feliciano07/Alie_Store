"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class UserController {
    user(req, res) {
        res.json({
            text: 'API is start'
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT * FROM USUARIO";
            yield cn.exec(sql, [], function (result) {
                res.send(result);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "INSERT INTO USUARIO(nombre,apellido,clave,correo,telefono,foto,fecha_nacimiento," +
                "direccion,credito,ganancia,clase_cliente,genero,tipo_usuario) " + // values
                "VALUES(:nombre,:apellido,:clave,:correo,:telefono,:foto,TO_DATE(:fecha_nacimiento,'YYYY-MM-DD')," +
                ":direccion,:credito,:ganancia,:clase_cliente,:genero,:tipo_usuario)";
            yield cn.exec(sql, [req.body.nombre, req.body.apellido, req.body.clave, req.body.correo,
                req.body.telefono, req.body.foto, req.body.fecha_nacimiento, req.body.direccion, req.body.credito, req.body.ganancia,
                req.body.clase_cliente, req.body.genero, req.body.tipo_usuario], function (result) { });
            var transport = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'fernandochajon122@gmail.com',
                    pass: 'cuentanueva122'
                }
            });
            var mail_option = {
                from: 'Fernando Chajon <fernandochajon122@gmail.com',
                to: req.body.correo,
                subject: 'Confirmación de cuenta',
                text: 'Hola ' + req.body.nombre,
                html: '<h1>Alie Storage</h1>' +
                    ' <h3>Bienvenido ' + req.body.nombre + '</h3> ' +
                    ' <ul> ' +
                    ' <li>Username: ' + req.body.correo + '</li> ' +
                    ' <li>password: ' + req.body.clave + '</li> ' +
                    ' </ul>' +
                    ' <p>Ingresa al link, para confirmar tu correo</p> ' +
                    ' <a href="http://localhost:3000/api/usuario/status/' + req.body.correo + '" class="btn btn-primary stretched-link">Confirmar Correo</a> ' // cuerpo de texto sin formato
            };
            transport.sendMail(mail_option, (error, info) => {
                if (error) {
                    res.json({ valor: '0' });
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                res.json({ valor: '1' });
            });
        });
    }
    UpdateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var CORREO = req.params.correo;
            var sql = "UPDATE USUARIO SET status = 1 " + " WHERE correo = :CORREO";
            yield cn.exec(sql, [CORREO], function (result) {
                if (result == undefined) {
                    res.send("Correo Confirmado");
                }
                else {
                    res.send("La confirmacion no se ha realizado");
                }
            });
        });
    }
    /**
     * async Login
     */
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            console.log(req.body);
            var sql = 'SELECT * FROM USUARIO WHERE correo = :correo AND clave = :clave  AND status = 1';
            //console.log(req.body);
            yield cn.exec(sql, [req.body.correo, req.body.clave], function (result) {
                if (result.length > 0) {
                    res.send(result[0]);
                }
                else {
                    res.status(404).json({
                        status: 'El usuario no existe o no ha sido confirmado'
                    });
                }
            });
        });
    }
    Recuperar_Pass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            // generador token 
            var hashCode = function (s) {
                var h = 0, l = s.length, i = 0;
                if (l > 0)
                    while (i < l)
                        h = (h << 18) - h + s.charCodeAt(i++) | 0;
                return h;
            };
            let hash = hashCode(JSON.stringify(req.body));
            let clave = hash.toString();
            var sql = " UPDATE USUARIO SET " +
                "CLAVE = :clave " +
                "WHERE CORREO= :correo";
            yield cn.exec(sql, [clave, req.body.correo], function (result) {
                if (result == undefined) {
                    var transport = nodemailer_1.default.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'fernandochajon122@gmail.com',
                            pass: 'cuentanueva122'
                        }
                    });
                    var mail_option = {
                        from: 'Fernando Chajon <fernandochajon122@gmail.com',
                        to: req.body.correo,
                        subject: 'Recuperacion de Clave',
                        text: 'Hola ',
                        html: '<h1>Alie Storage</h1>' +
                            ' <h3>Es un gusto poder ayuda ' + '</h3> ' +
                            ' <ul> ' +
                            ' <li>correo: ' + req.body.correo + '</li> ' +
                            ' <li>password: ' + clave + '</li> ' +
                            ' </ul>' +
                            ' <p>Ingresa al link, para iniciar sesion</p> ' +
                            ' <a href="http://localhost:4200/login' + req.body.correo + '" class="btn btn-primary stretched-link">Inicar Session</a> ' // cuerpo de texto sin formato
                    };
                    transport.sendMail(mail_option, (error, info) => {
                        if (error) {
                            res.status(404).json({
                                status: 'El usuario no existe o no ha sido confirmado'
                            });
                        }
                        console.log('Message sent: %s', info.messageId);
                        res.json({ valor: '1' });
                    });
                }
                else {
                    res.status(404).json({
                        status: 'El usuario no existe o no ha sido confirmado'
                    });
                }
            });
        });
    }
}
exports.userController = new UserController();
