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
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
