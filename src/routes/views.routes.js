import { Router } from "express";
import ProductManager from '../productManager.js';


const router = Router()

const manager = new ProductManager('./Products.json');

const prods = await manager.getProducts();

router.get('/',(req,res)=>{
    res.render('home',{prods})
})


router.get('/realTimeProducts',(req,res)=>{
    res.render('realTimeProducts')
})




export default router