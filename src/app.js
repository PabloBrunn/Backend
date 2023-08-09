import express from 'express'
import { __dirname } from './utils.js'
import productRouter from './routes/product.routes.js'
import carritoRouter from './routes/cart.routes.js'
import viewsRouter from './routes/views.routes.js'
import { engine } from 'express-handlebars';
import { Server } from "socket.io";





const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))


// handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');





app.use('/api/productos',productRouter)
app.use('/api/carritos',carritoRouter)
app.use('/home',viewsRouter)





const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('cliente conectado', socket.id);

    socket.emit('allProds', products);


    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
