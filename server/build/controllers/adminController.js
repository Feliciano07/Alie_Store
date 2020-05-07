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
class AdminController {
    admin(req, res) {
        res.json({
            text: 'api admin is start'
        });
    }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            console.log(req.body);
            var sql = " BEGIN " +
                "Registro_Admin(:nombre,:apellido,:clave,:correo,:telefono,:foto,:fecha_nacimiento," +
                ":direccion,:credito,:ganancia,:clase_cliente,:genero,:tipo_usuario); " +
                "end;";
            yield cn.exec(sql, [req.body.nombre, req.body.apellido, req.body.clave, req.body.correo, req.body.telefono,
                req.body.foto, req.body.fecha_nacimiento, req.body.direccion, req.body.credito, req.body.ganancia,
                req.body.clase_cliente, req.body.genero, req.body.tipo_usuario], function (result) {
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
                        subject: 'Cuenta Creada',
                        text: 'Hola' + req.body.nombre,
                        html: '<h1>Alie Storage</h1>' +
                            ' <h3>Ya formas parte del equipo de alie store ' + '</h3> ' +
                            ' <ul> ' +
                            ' <li>correo: ' + req.body.correo + '</li> ' +
                            ' <li>password: ' + req.body.clave + '</li> ' +
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
    Listar_Usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = " SELECT * FROM USUARIO ";
            yield cn.exec(sql, [], function (result) {
                if (result.length >= 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({
                        status: 'Error Oracle'
                    });
                }
            });
        });
    }
    UpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "BEGIN " +
                "Update_User(:NOMBRE, :APELLIDO, :CLAVE, :DIRECCION, :TELEFONO, :ID_USUARIO);" +
                "END;"; // procedure
            yield cn.exec(sql, [req.body.NOMBRE, req.body.APELLIDO, req.body.CLAVE, req.body.DIRECCION,
                req.body.TELEFONO, req.body.ID_USUARIO], function (result) {
                if (result == undefined) {
                    res.json({ text: 'update' });
                }
                else {
                    res.status(404).json({
                        status: 'Error Oracle'
                    });
                }
            });
        });
    }
    Ayuda_Year(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT * FROM USUARIO " +
                "WHERE genero=0 and tipo_usuario=1 and to_char(fecha_nacimiento,'YYYY') > :year ";
            yield cn.exec(sql, [req.body.year], function (result) {
                res.json(result);
            });
        });
    }
    Admin_Year(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT * FROM USUARIO " +
                "WHERE genero=1 and tipo_usuario=0 and to_char(fecha_nacimiento,'YYYY') < :year ";
            yield cn.exec(sql, [req.body.year], function (result) {
                res.json(result);
            });
        });
    }
    Cantidad_Disponible(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT * FROM  " +
                "PRODUCTO " +
                "WHERE cantidad_disponible=:cantidad ";
            yield cn.exec(sql, [req.body.cantidad], function (result) {
                res.json(result);
            });
        });
    }
    Promedio_Servicios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT sr.id_usuario, sr.nombre, sr.correo, AVG(sl.puntuacion) as promedio " +
                "FROM USUARIO sr, " +
                "SALA sl " +
                "WHERE sr.tipo_usuario=1 AND sr.id_usuario=sl.usuario_ayuda " +
                "GROUP by sr.id_usuario, sr.nombre, sr.correo " +
                "ORDER BY AVG(sl.puntuacion) DESC ";
            yield cn.exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    Top_Clientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT * FROM ( " +
                "SELECT  usr.id_usuario, usr.nombre, usr.correo, COUNT(*) as Total " +
                "FROM " +
                "USUARIO usr, PRODUCTO pr " +
                "WHERE usr.id_usuario=pr.usuario " +
                "GROUP BY usr.id_usuario, usr.nombre, usr.correo " +
                "ORDER BY COUNT(*) DESC " +
                ")" +
                " WHERE ROWNUM<4 ";
            yield cn.exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    Todos_Productos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT pr.*, ct.* FROM " +
                "PRODUCTO pr, " +
                "PRODUCTO_CATEGORIA pc, " +
                "CATEGORIA ct " +
                "WHERE pr.id_producto=pc.producto and pc.categoria=ct.id_categoria";
            yield cn.exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    Ascender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "BEGIN " +
                "ASCENDER_USER(:id_usuario ,:tipo_usuario, :razon); " +
                "END;";
            yield cn.exec(sql, [req.body.id_usuario, req.body.tipo_usuario, req.body.razon], function (result) {
                if (result == undefined) {
                    res.json({ text: 'ascendido' });
                }
                else {
                    res.status(404).json({
                        status: 'Error Oracle'
                    });
                }
            });
        });
    }
    Descender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "BEGIN " +
                "DESCENDER_USER(:id_usuario ,:tipo_usuario, :razon); " +
                "END;";
            yield cn.exec(sql, [req.body.id_usuario, req.body.tipo_usuario, req.body.razon], function (result) {
                if (result == undefined) {
                    res.json({ text: 'descendido' });
                }
                else {
                    res.status(404).json({
                        status: 'Error Oracle'
                    });
                }
            });
        });
    }
}
exports.adminController = new AdminController();
