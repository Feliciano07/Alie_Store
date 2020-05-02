"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productoController_1 = require("../controllers/productoController");
const express_1 = require("express");
class ProductoRuoter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productoController_1.productoController.producto);
        this.router.post('/obtener', productoController_1.productoController.get_Productos_Cliente);
    }
}
const productoRoutes = new ProductoRuoter();
exports.default = productoRoutes.router;
