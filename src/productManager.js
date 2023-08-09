import fs from 'fs'

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
                return ["error al cargar archivo"]
            }
        } catch (error) {
            throw new Error(`Error al cargar los productos`);
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
            return arrayProd
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

const manager = new ProductManager('./Products.json');


export default ProductManager;

