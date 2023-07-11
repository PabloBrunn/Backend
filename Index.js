

class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !stock || !code) {
            console.log("Faltan datos que completar");
        } else {
            const verificarCode = this.products.find(o => o.code === code);
            if (verificarCode) {
                console.log("El código se repite");
            } else {
                let id = this.products.length + 1;
                const newProduct = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                };
                this.products.push(newProduct);
            }
        }
    }

    getProductById(id) {
        const product = this.products.find(o => o.id === id);
        if (product) {
            console.log(product);
        } else {
            console.log("El producto no existe");
        }
    }
}

const manager = new ProductManager();

manager.addProduct("remera", "remera xl", 500, "sin imagen", 4567, 50)
manager.addProduct("remera chica", "remera l", 600, "sin imagen", 4347, 40)

console.log(manager.getProducts())

manager.getProductById(2)