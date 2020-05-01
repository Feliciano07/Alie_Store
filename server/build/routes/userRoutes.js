"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //obtener usuarios
        this.router.get('/', userController_1.userController.list);
        // create 
        this.router.post('/singup', userController_1.userController.create);
        // update status user
        this.router.get('/status/:correo', userController_1.userController.UpdateStatus);
        this.router.post('/login', userController_1.userController.Login);
        this.router.post('/recuperacion', userController_1.userController.Recuperar_Pass);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
