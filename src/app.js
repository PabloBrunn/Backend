import express from 'express'
import { __dirname } from './utils.js'
import productRouter from './routes/product.routes.js'
import carritoRouter from './routes/cart.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))





app.use('/api/productos',productRouter)
app.use('/api/carritos',carritoRouter)





app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})