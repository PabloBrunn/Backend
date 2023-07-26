import express from 'express'
import ProductManager from './productManager.js';

const manager = new ProductManager('Products.json');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/productos', async (req, res) => {
    try {
        const { limit } = req.query; 
        const prod = await manager.getProducts();

        const limitNumber = limit;
        const productsLimited = limitNumber ? prod.slice(0, limitNumber) : prod;

        res.status(200).json({ message: 'productos', prod: productsLimited });
    } catch (error) {
        res.status(500).json({ error });
    }
});


app.get('/api/productos/:idProd', async (req, res) => {
    const { idProd } = req.params
    try {
        const prod = await manager.getProductById(+idProd) // Utiliza la instancia manager
        res.status(200).json({ message: 'productos', prod })
    } catch (error) {
        res.status(500).json({ error })
    }
})


app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})