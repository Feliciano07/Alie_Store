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
        this.router.post('/appObtener', productoController_1.productoController.Get_Productos_App);
        this.router.post('/buscar', productoController_1.productoController.Search_Producto);
        this.router.post('/appBuscar', productoController_1.productoController.Search_App);
    }
}
const productoRoutes = new ProductoRuoter();
exports.default = productoRoutes.router;
