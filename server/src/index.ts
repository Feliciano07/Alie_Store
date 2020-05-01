import express,{Application} from 'express';
import {createServer,Server} from 'http';

import * as socketIo from 'socket.io';

import  morgan from 'morgan';
import cors from 'cors';

// import multer from 'multer';
// import path from 'path'


import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import cargaRoutes from './routes/cargaRoutes';
import adminRoutes from './routes/adminRoutes';



class Server_ND{

    public app: Application
    public io: socketIo.Server;
    public http: Server;


    constructor(){
        this.app=express();
        this.config();

        this.http=createServer(this.app);
        this.io = socketIo.listen(this.http);
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));

       


        //cors
        this.app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 1);

            // Pass to next layer of middleware
            next();
        });


    }

    routes():void{
        this.app.use('/api',indexRoutes);
        this.app.use('/api/usuario',userRoutes);
        this.app.use('/api/chat',chatRoutes);
        this.app.use('/api/carga',cargaRoutes);

        this.app.use('/api/admin',adminRoutes);

        // end points de carga de foto de usuario
    }


    start():void{

        this.http.listen(this.app.get('port'),()=>{
            console.log(`Server on port`,this.app.get('port'));
        });

        
        this.io.on('connection',(socket)=>{
            console.log('new connection made.', socket.id);

            // event on is for listen(escucha)
            socket.on('join',(data)=>{
                // event emit is for emit(emite)
                socket.join(data.id_sala); // set room donde se va mandar
                console.log(data.nombre + ' joined the room: '+ data.id_sala);
               
               // this.io.sockets.emit('chat',data);

               socket.broadcast.to(data.id_sala).emit('new user joined',{ // manda usuario que se ha unido
                   NOMBRE:data.nombre,
                   MENSAJE:'has joined this room'
               });

            })
            // message 
            socket.on('message',(data) => { 
                // a que sala quiero enviar
                this.io.in(data.id_sala).emit('new:message',{
                    NOMBRE:data.nombre,
                    MENSAJE: data.mensaje
                });
            })
            
        });

    }


}

const server=new Server_ND();
server.start();