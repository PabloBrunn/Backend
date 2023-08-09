import { Router } from "express";
import{__dirname} from '../utils.js'
import ProductManager from '../productManager.js'

const prods= new ProductManager(__dirname+'/Products.json')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const prod = await prods.getProducts();
        res.render('home', { prod });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error al obtener los productos");
    }
});


router.get('/realTimeProducts',async (req,res)=>{
    try {
        res.render('realTimeProducts');
    } catch (error) {
        res.status(500).send("Error al obtener los productos en vivo");
    }
})




export default router