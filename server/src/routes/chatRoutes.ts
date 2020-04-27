import {chatController} from '../controllers/chatController';
import { Router } from 'express';

class ChatRoutes{

    public router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        /* Prueba de que funciona */
        this.router.get('/',chatController.chat);
        /*obtener los chat de los clientes */
        this.router.post('/chatCliente',chatController.Chat_Salas_Cliente);
        /*Obtener los chat de los usuarios de ayuda */
        this.router.post('/chatAyuda',chatController.Chat_Salas_Ayuda);

        /*Obtener los usuario de ayuda que estan dando soporte */
        this.router.get('/salasAyuda',chatController.Salas_Ayuda);

        /*Obtener todos los usuarios de ayuda */
        this.router.get('/getUsuarioAyuda',chatController.Get_Usuario_Ayuda);

        /*Manda a guardar Mensajes */
        this.router.post('/insertarMensaje',chatController.Insertar_mensajes);

        /*Obtiene los mensajes de una sala especifica */
        this.router.post('/getMensajes',chatController.Get_Mensajes);

        /*Guardar una nueva sala */
        this.router.post('/insertarSala',chatController.Nueva_Sala);

        /*Para dar por finalizada una conversacion */
        this.router.post('/solucion',chatController.Problema_Solucionado); 
        
    }
}

const chatRoutes = new ChatRoutes();
export default chatRoutes.router;