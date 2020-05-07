import {productoController} from '../controllers/productoController';
import {Router} from 'express';


class ProductoRuoter{
    
    public router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/',productoController.producto);

        this.router.post('/obtener',productoController.get_Productos_Cliente);

        this.router.post('/appObtener',productoController.Get_Productos_App);

        this.router.post('/buscar',productoController.Search_Producto);

        this.router.post('/appBuscar',productoController.Search_App);
    }
}

const productoRoutes =new ProductoRuoter();
export default productoRoutes.router;