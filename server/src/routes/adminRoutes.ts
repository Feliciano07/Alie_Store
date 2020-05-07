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

        this.router.post('/ayuda',adminController.Ayuda_Year);

        this.router.post('/admin',adminController.Admin_Year);

        this.router.post('/cantidad',adminController.Cantidad_Disponible);

        this.router.get('/promedio',adminController.Promedio_Servicios);

        this.router.get('/top',adminController.Top_Clientes);

        this.router.get('/productos',adminController.Todos_Productos);

        this.router.post('/asc',adminController.Ascender);

        this.router.post('/desc',adminController.Descender);

    }
}

const adminRoutes =new AdminRoutes();
export default adminRoutes.router;