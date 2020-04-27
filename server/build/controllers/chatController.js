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
class ChatController {
    chat(req, res) {
        res.json({
            text: 'api/chat is start'
        });
    }
    Chat_Salas_Cliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT s.id_sala, s.usuario_ayuda as usuario, u.nombre FROM " +
                "USUARIO u, SALA s " +
                "WHERE s.usuario_cliente= : id_usuario AND u.id_usuario=s.usuario_ayuda AND s.estado_sala=0";
            yield cn.exec(sql, [req.body.id_usuario], function (result) {
                if (result.length > 0) {
                    res.send(result);
                }
                else {
                    res.status(404).json({
                        status: 'no tiene conversaciones'
                    });
                }
            });
        });
    }
    Chat_Salas_Ayuda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT s.id_sala, s.usuario_cliente as usuario,u.nombre FROM " +
                "USUARIO u, SALA s " +
                "WHERE s.usuario_ayuda= : id_usuario AND u.id_usuario=s.usuario_cliente AND s.estado_sala=0";
            yield cn.exec(sql, [req.body.id_usuario], function (result) {
                if (result.length > 0) {
                    res.send(result);
                }
                else {
                    res.status(404).json({
                        status: 'no tiene conversaciones'
                    });
                }
            });
        });
    }
    // TODO: consulta que traer el numero de conversacciones que tienen los clientes
    Salas_Ayuda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT u.id_usuario,COUNT(*) as numero " +
                "FROM USUARIO u,SALA s " +
                "WHERE s.estado_sala=0 AND s.usuario_ayuda=u.id_usuario " +
                "GROUP BY u.id_usuario";
            yield cn.exec(sql, [], function (result) {
                if (result.length >= 0) {
                    res.send(result);
                }
                else {
                    res.status(404).json({
                        status: 'Error'
                    });
                }
            });
        });
    }
    //  consulta que se encarga de traer los usuarios de ayuda(todo)
    Get_Usuario_Ayuda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT id_usuario FROM usuario WHERE tipo_usuario=1";
            yield cn.exec(sql, [], function (result) {
                if (result.length >= 0) {
                    res.send(result);
                }
                else {
                    res.status(404).json({
                        status: 'Error'
                    });
                }
            });
        });
    }
    Insertar_mensajes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "INSERT INTO MENSAJE(mensaje,sala,usuario) VALUES(:mensaje, :sala, :id_usuario)";
            yield cn.exec(sql, [req.body.mensaje, req.body.sala, req.body.id_usuario], function (result) {
                if (result == undefined) {
                    res.json({
                        text: "Mensaje enviado"
                    });
                }
                else {
                    res.status(404).json({
                        status: 'Error'
                    });
                }
            });
        });
    }
    Get_Mensajes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT msg.mensaje,msg.fecha_hora,u.nombre " +
                "FROM MENSAJE msg,Usuario u " +
                "WHERE sala= :id_sala AND msg.usuario=u.id_usuario";
            yield cn.exec(sql, [req.body.id_sala], function (result) {
                res.send(result);
            });
        });
    }
    Nueva_Sala(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "INSERT INTO SALA(usuario_cliente,usuario_ayuda) VALUES(:id_cliente ,:id_ayuda)";
            yield cn.exec(sql, [req.body.id_cliente, req.body.id_ayuda], function (result) {
                if (result == undefined) {
                    res.json({
                        text: "sala Guardada"
                    });
                }
                else {
                    res.status(404).json({
                        status: 'Error'
                    });
                }
            });
        });
    }
    Problema_Solucionado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "UPDATE SALA SET " +
                "PUNTUACION= :puntos , ESTADO_SALA = 1 " +
                "WHERE ID_SALA = :id_sala ";
            console.log(req.body);
            yield cn.exec(sql, [req.body.puntos, req.body.id_sala], function (result) {
                if (result == undefined) {
                    res.json({
                        text: "Solucionado"
                    });
                }
                else {
                    res.status(404).json({
                        status: 'Error'
                    });
                }
            });
        });
    }
}
exports.chatController = new ChatController();
