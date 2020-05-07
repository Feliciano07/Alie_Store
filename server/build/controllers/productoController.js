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
class ProductoController {
    constructor() {
    }
    producto(req, res) {
        res.json({
            text: 'api/producto is start'
        });
    }
    get_Productos_Cliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT " +
                "pr.imagen,pr.descripcion,pr.precio_producto,pr.cantidad_disponible, " +
                "ct.nombre_categoria as padre " +
                "FROM PRODUCTO pr, " +
                "PRODUCTO_CATEGORIA pc, " +
                "CATEGORIA ct " +
                "WHERE pr.usuario= :ID_USUARIO AND pr.id_producto=pc.producto AND " +
                "pc.categoria=ct.id_categoria ";
            yield cn.exec(sql, [req.body.ID_USUARIO], function (result) {
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.json({ text: 'no tiene productos' });
                }
            });
        });
    }
    Get_Productos_App(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT " +
                "pr.imagen,pr.descripcion,pr.precio_producto,pr.cantidad_disponible, " +
                "ct.nombre_categoria as padre " +
                "FROM PRODUCTO pr, " +
                "PRODUCTO_CATEGORIA pc, " +
                "CATEGORIA ct " +
                "WHERE pr.usuario= :ID_USUARIO AND pr.id_producto=pc.producto AND " +
                "pc.categoria=ct.id_categoria ";
            yield cn.exec(sql, [req.body[0].ID_USUARIO], function (result) {
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.json({ text: 'no tiene productos' });
                }
            });
        });
    }
    Search_Producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            console.log(req.body);
            var re = " pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible ";
            var sql = "SELECT " + re +
                "FROM PRODUCTO pr,CATEGORIA ct " +
                "WHERE UPPER (pr.descripcion) LIKE UPPER(:producto) " +
                "UNION " +
                "SELECT" + re +
                "FROM PRODUCTO pr, PRODUCTO_CATEGORIA pc, CATEGORIA ct " +
                "WHERE pr.id_producto=pc.producto AND pc.categoria=ct.id_categoria and UPPER(ct.nombre_categoria) LIKE UPPER(:producto) " +
                "UNION " +
                "SELECT " + re +
                "FROM PRODUCTO pr, COLOR cr, PRODUCTO_COLOR pl " +
                "WHERE pr.id_producto=pl.producto AND pl.color=cr.id_color AND UPPER(cr.nombre_color) LIKE UPPER( :producto) ";
            yield cn.exec(sql, [req.body.producto], function (result) {
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.json({
                        text: 'no se encontro producto con: ' + req.body.producto
                    });
                }
            });
        });
    }
    Search_App(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            console.log(req.body);
            var re = " pr.imagen,pr.descripcion,pr.precio_producto,pr.fecha_publicacion,pr.cantidad_disponible ";
            var sql = "SELECT " + re +
                "FROM PRODUCTO pr,CATEGORIA ct " +
                "WHERE UPPER (pr.descripcion) LIKE UPPER(:producto) " +
                "UNION " +
                "SELECT" + re +
                "FROM PRODUCTO pr, PRODUCTO_CATEGORIA pc, CATEGORIA ct " +
                "WHERE pr.id_producto=pc.producto AND pc.categoria=ct.id_categoria and UPPER(ct.nombre_categoria) LIKE UPPER(:producto) " +
                "UNION " +
                "SELECT " + re +
                "FROM PRODUCTO pr, COLOR cr, PRODUCTO_COLOR pl " +
                "WHERE pr.id_producto=pl.producto AND pl.color=cr.id_color AND UPPER(cr.nombre_color) LIKE UPPER( :producto) ";
            yield cn.exec(sql, [req.body[0].producto], function (result) {
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.json({
                        text: 'no se encontro producto con: ' + req.body.producto
                    });
                }
            });
        });
    }
}
exports.productoController = new ProductoController();
