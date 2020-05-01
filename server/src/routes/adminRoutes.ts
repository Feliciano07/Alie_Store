import {Router} from 'express';

import {adminController} from '../controllers/adminController';


class AdminRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',adminController.admin);

        this.router.post('/crear',adminController.Create);

        this.router.get('/listar',adminController.Listar_Usuarios);

        this.router.post('/update',adminController.UpdateUser);
    }
}

const adminRoutes =new AdminRoutes();
export default adminRoutes.router;