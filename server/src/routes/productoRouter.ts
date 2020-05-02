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

        this.router.post('/buscar',productoController.Search_Producto);
    }
}

const productoRoutes =new ProductoRuoter();
export default productoRoutes.router;