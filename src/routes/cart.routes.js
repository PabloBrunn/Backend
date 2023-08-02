import { Router } from "express";
import CarritoManager from '../cartManager.js';


const manager = new CarritoManager('./Carrito.json');

const router = Router()

router.get('/id', async (req, res) => {
    const {id} = req.params
    try{
        const carrito = await manager.getOneCart(+id)
        res.status(200).json({ message: 'Carrito',carrito})
    } catch(error) {
        res.status(500).json({error})
    }
})

router.post('/',async(req,res)=>{
    try{
        const crearCarrito = await manager.crearCarrito()
        res.status(200).json({ message: 'carrito', carrito:crearCarrito})
    }catch (error) {
        res.status(500).json({error})
    }
})


router.post('/:idCarrito/carritos/:idProd',async(req,res)=>{
    const {idCarrito,idProd} = req.params
    try {
        const addProd = await manager.addProd(+idCarrito,+idProd)
        res.status(200).json({message:'prod-Carrito',carrito:addProd})
    } catch (error) {
        res.status(500).json({error})
    }
})


export default router
