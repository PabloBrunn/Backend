const { log } = require('console')
const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
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


    async addProduct(obj) {
        try {
            const arrayProd = await this.getProducts()
            let id
            if (!arrayProd.length) {
                id = 1
            } else {
                id = arrayProd[arrayProd.length - 1].id + 1
            }
            arrayProd.push({ ...obj, id })
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProd))
        } catch (error) {
            return error
        }
    }


    async getProductById(id) {
        try {
            const arrayProd = await this.getProducts()
            const producto = arrayProd.find((p) => p.id === id)
            if (!producto) {
                return 'Usuario con id no encontrado'
            }
            return producto
        } catch (error) {
            return error
        }
    }



    async updateProduct(id, obj) {
        try {
            const arrayProd = await this.getProducts()
            const prodEncontrado = arrayProd.findIndex((u) => u.id === id)
            if (prodEncontrado === -1) {
                return 'No hay un producto con ese id'
            }
            const producto = arrayProd[prodEncontrado]
            arrayProd[prodEncontrado] = { ...producto, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProd))
        } catch (error) {
            return error
        }
    }


    async deleteProduct(id) {
        try {
            const arrayProd = await this.getProducts()
            const nuevoArrayProductos = arrayProd.filter((u) => u.id !== id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(nuevoArrayProductos)
            )
        } catch (error) {
            return error
        }
    }

}



const producto1 = {
    title: "celular",
    description: "telefono movil",
    price: 23000,
    thumbnail: "sin imagen",
    code: 4557,
    stock: 50,
}

const producto2 = {
    title: "TV",
    description: "television",
    price: 43000,
    thumbnail: "sin imagen",
    code: 4567,
    stock: 20,
}

const producto3 = {
    title: "PC",
    description: "computadora",
    price: 28000,
    thumbnail: "sin imagen",
    code: 4593,
    stock: 30,
}

const producto4 = {
    title: "notbook",
    description: "computadora portatil",
    price: 32000,
    thumbnail: "sin imagen",
    code: 4529,
    stock: 70,
}



async function prueba() {
    const manager = new ProductManager('Products.json')
    //await manager.addProduct(producto4)
    //const consultar = await manager.getProducts()
    //console.log(consultar);
    //const consultarId = await manager.getProductById(2)
    //console.log(consultarId);
    await manager.deleteProduct(5)
    //await manager.updateProduct(4, { title: "netbook",price: 56000 })
    
}

prueba()