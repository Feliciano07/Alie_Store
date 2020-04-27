import {cargaController} from '../controllers/cargaController';

import {Router} from 'express'

import multer from 'multer';
import path from 'path'



class CargaRoutes{
    
    public router = Router();
    public upload: any;

    constructor(){
       this.configUpload();
        this.config();
    }


    config():void{
        
        this.router.get('/', cargaController.carga);
        this.router.post('/foto',this.upload.single('foto'),cargaController.cargarFoto);

    }

    configUpload(){
        let storage = multer.diskStorage({
            destination:(req, file, cb) =>{
                cb(null,'/home/fernando/Escritorio/Alie_Store/server/src/assets');
            },
            filename:(req, file, cb) => {
                cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        this.upload = multer({storage});

    }
}

const cargaRoutes = new CargaRoutes();
export default cargaRoutes.router;