import fs from 'fs'


class CarritoManager {
    constructor(path) {
        this.path = path
    }

    async getCarritos() {
        try {
            if (fs.existsSync(this.path)) {
                const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(infoArchivo)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }


    async getOneCart(id) {
        const carts = await this.getCarritos()
        const cart = carts.find(c=>c.id===id)
        return cart
    }

    async crearCarrito(){
        const carts = await this.getCarritos()
        let id
            if (!carts.length) {
                id = 1
            } else {
                id = carts[carts.length - 1].id + 1
            }
            const newCart = { prods: [], id }
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return newCart
    }




    async addProd(idCarrito,idProd){
        const carritos = await this.getCarritos()
        const carrito = carritos.find(p=>p.id===idCarrito)
        const prodIndex = carrito.prods.findIndex(p=>p.carrito===idProd)
        if(prodIndex===-1){
            carrito.prods.push({prod:idProd,quantity:1})
        }else{
            carrito.prods[prodIndex].quantity++
        }
        await fs.promises.writefile(this.path,JSON.stringify(carritos))
        return carrito
    }



}




export default CarritoManager;

