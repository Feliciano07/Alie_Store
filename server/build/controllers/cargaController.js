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
class CargaController {
    constructor() {
    }
    /*public carga(req: Request, res: Response){
        res.json({
            text: 'api/carga is start'
        });
    }*/
    carga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "SELECT * FROM PRODUCTO";
            yield cn.exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    cargarFoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(req.file);
        });
    }
    Cargar_Productos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cn = database_1.default.db2();
            var sql = "BEGIN " +
                "CARGA(:id_usuario, :codigo, :imagen, :descripcion, :precio, :cantidad, :categoria, :color); " +
                "END;";
            yield cn.exec(sql, [
                req.body.id_usuario,
                req.body.productos.codigo, req.body.productos.imagen, req.body.productos.descripcion, req.body.productos.precio,
                req.body.productos.cantidad, req.body.productos.categoria, req.body.productos.color
            ], function (result) {
                if (result == undefined) {
                    res.json({ text: 'ingresado' });
                }
                else {
                    res.status(404).json({
                        status: 'El usuario no existe o no ha sido confirmado'
                    });
                }
            });
        });
    }
}
exports.cargaController = new CargaController();
