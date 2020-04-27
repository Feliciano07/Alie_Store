import {Request, Response} from 'express';




class CargaController{

    

    constructor(){
       
    }

    public carga(req: Request, res: Response){
        res.json({
            text: 'api/carga is start'
        });
    }

    public async cargarFoto(req: Request, res: Response){
        res.json(req.file)
    }



    
}

export const cargaController = new CargaController();