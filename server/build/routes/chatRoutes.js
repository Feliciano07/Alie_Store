"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("../controllers/chatController");
const express_1 = require("express");
class ChatRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /* Prueba de que funciona */
        this.router.get('/', chatController_1.chatController.chat);
        /*obtener los chat de los clientes */
        this.router.post('/chatCliente', chatController_1.chatController.Chat_Salas_Cliente);
        /*Obtener los chat de los usuarios de ayuda */
        this.router.post('/chatAyuda', chatController_1.chatController.Chat_Salas_Ayuda);
        /*Obtener los usuario de ayuda que estan dando soporte */
        this.router.get('/salasAyuda', chatController_1.chatController.Salas_Ayuda);
        /*Obtener todos los usuarios de ayuda */
        this.router.get('/getUsuarioAyuda', chatController_1.chatController.Get_Usuario_Ayuda);
        /*Manda a guardar Mensajes */
        this.router.post('/insertarMensaje', chatController_1.chatController.Insertar_mensajes);
        /*Obtiene los mensajes de una sala especifica */
        this.router.post('/getMensajes', chatController_1.chatController.Get_Mensajes);
        /*Guardar una nueva sala */
        this.router.post('/insertarSala', chatController_1.chatController.Nueva_Sala);
        /*Para dar por finalizada una conversacion */
        this.router.post('/solucion', chatController_1.chatController.Problema_Solucionado);
    }
}
const chatRoutes = new ChatRoutes();
exports.default = chatRoutes.router;
