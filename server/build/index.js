"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socketIo = __importStar(require("socket.io"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// import multer from 'multer';
// import path from 'path'
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const cargaRoutes_1 = __importDefault(require("./routes/cargaRoutes"));
class Server_ND {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.http = http_1.createServer(this.app);
        this.io = socketIo.listen(this.http);
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
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
    routes() {
        this.app.use('/api', indexRoutes_1.default);
        this.app.use('/api/usuario', userRoutes_1.default);
        this.app.use('/api/chat', chatRoutes_1.default);
        this.app.use('/api/carga', cargaRoutes_1.default);
        // end points de carga de foto de usuario
    }
    start() {
        this.http.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        });
        this.io.on('connection', (socket) => {
            console.log('new connection made.', socket.id);
            // event on is for listen(escucha)
            socket.on('join', (data) => {
                // event emit is for emit(emite)
                socket.join(data.id_sala); // set room donde se va mandar
                console.log(data.nombre + ' joined the room: ' + data.id_sala);
                // this.io.sockets.emit('chat',data);
                socket.broadcast.to(data.id_sala).emit('new user joined', {
                    NOMBRE: data.nombre,
                    MENSAJE: 'has joined this room'
                });
            });
            // message 
            socket.on('message', (data) => {
                // a que sala quiero enviar
                this.io.in(data.id_sala).emit('new:message', {
                    NOMBRE: data.nombre,
                    MENSAJE: data.mensaje
                });
            });
        });
    }
}
const server = new Server_ND();
server.start();
