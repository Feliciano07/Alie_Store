import {Router} from 'express'

import {userController} from '../controllers/userController';


class UserRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        //obtener usuarios
        this.router.get('/',userController.list);

        // create 
        this.router.post('/singup',userController.create);

        // update status user
        this.router.get('/status/:correo',userController.UpdateStatus);

        this.router.post('/login',userController.Login);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;