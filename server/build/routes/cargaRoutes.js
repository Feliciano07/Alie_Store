"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const cargaController_1 = require("../controllers/cargaController");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class CargaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configUpload();
        this.config();
    }
    config() {
        this.router.get('/', cargaController_1.cargaController.carga);
        this.router.post('/foto', this.upload.single('foto'), cargaController_1.cargaController.cargarFoto);
    }
    configUpload() {
        let storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, '/home/fernando/Escritorio/Alie_Store/server/src/assets');
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
            }
        });
        this.upload = multer_1.default({ storage });
    }
}
const cargaRoutes = new CargaRoutes();
exports.default = cargaRoutes.router;
