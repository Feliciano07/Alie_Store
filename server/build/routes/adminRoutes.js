"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', adminController_1.adminController.admin);
        this.router.post('/crear', adminController_1.adminController.Create);
        this.router.get('/listar', adminController_1.adminController.Listar_Usuarios);
        this.router.post('/update', adminController_1.adminController.UpdateUser);
        this.router.post('/ayuda', adminController_1.adminController.Ayuda_Year);
        this.router.post('/admin', adminController_1.adminController.Admin_Year);
        this.router.post('/cantidad', adminController_1.adminController.Cantidad_Disponible);
        this.router.get('/promedio', adminController_1.adminController.Promedio_Servicios);
        this.router.get('/top', adminController_1.adminController.Top_Clientes);
        this.router.get('/productos', adminController_1.adminController.Todos_Productos);
        this.router.post('/asc', adminController_1.adminController.Ascender);
        this.router.post('/desc', adminController_1.adminController.Descender);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
