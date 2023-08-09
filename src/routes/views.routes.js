import { Router } from "express";
import ProductManager from '../productManager.js';


const router = Router()

const manager = new ProductManager('./Products.json');



router.get('/', async (req, res) => {
    try {
        const prods = await manager.getProducts();
        console.log(prods);
        res.render('home', { prods });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error al obtener los productos");
    }
});


router.get('/realTimeProducts',(req,res)=>{
    res.render('realTimeProducts')
})




export default router;