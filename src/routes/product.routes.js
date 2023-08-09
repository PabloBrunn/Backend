import { Router } from "express";
import{__dirname} from '../utils.js'
import ProductManager from '../productManager.js'

const prods= new ProductManager(__dirname+'/Products.json')

const router = Router()

router.get('/', async (req, res) => {
    
    try {
        const { limit } = req.query; 
        const prod =  await prods.getProducts()
        const limitNumber = limit;
        const productsLimited = limitNumber ? prod.slice(0, limitNumber) : prod;

        res.status(200).json({ message: 'productos', prod: productsLimited });
    } catch (error) {
        res.status(500).json({ error });
    }
});


router.get('/:idProd', async (req, res) => {
    const { idProd } = req.params
    try {
        const prod = await prods.getProductById(+idProd) 
        res.status(200).json({ message: 'productos', prod })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/',async(req,res)=>{
    console.log(req.body);
    try {
        const newProd = await prods.addProduct(req.body)
        res.status(200).json({ message: 'Product created', user: newProd })
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.delete('/:idProd',async(req,res)=>{
    const {idProd} = req.params
try {
    const prodDelete = await prods.deleteProduct(+idProd)
    res.status(200).json({message:'Product deleted'})
} catch (error) {
    res.status(500).json({ error })
}
})


router.put('/:idProd',async(req,res)=>{
    const {idProd} = req.params
    try {
        const prodUpdated = await prods.updateProduct(+idProd,req.body)
        res.status(200).json({message: 'Product updated'})
    } catch (error) {
        res.status(500).json({ error })
    }
})



export default router