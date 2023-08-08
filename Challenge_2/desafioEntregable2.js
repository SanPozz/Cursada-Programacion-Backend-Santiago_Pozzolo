import { promises as fs } from 'fs'

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = this.incrementarID();
    }

    incrementarID() {
        if (!this.constructor.latestID) {
            this.constructor.latestID = 1;
        } else {
            this.constructor.latestID++;
        }
        return this.constructor.latestID;
    }
}

class ProductManager {
    constructor() {
        this.path = './products.txt';
        this.products = [];
    }


    async getProducts() {
        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        console.log(this.products);
    }

    async addProduct(product) {
        try {
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    
            if (this.products.find(producto => producto.id === product.id)) {
                return "Producto ya agregado";
            }
    
            this.products.push(product);

            console.log(this.products);
            // let stringifiedProducts = JSON.stringify(this.products)
            // console.log(stringifiedProducts);
    
            await fs.writeFile('./products.txt', JSON.stringify(this.products));
    
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.error("Error al agregar el producto:", error.message);
        }
    }
    
    

    async getProductById(id) {
        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const prodSearch = this.products.find(producto => producto.id === id)
        if (prodSearch) {
            console.log(producto)
        } else {
            console.log("Producto no existe")
        }
    }
    
    async updateProduct (id, { title, description, price, thumbnail, code, stock, }) {

        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));

        const indice = this.products.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            this.products[indice].title = title
            this.products[indice].description = description
            this.products[indice].price = price
            this.products[indice].thumbnail = thumbnail
            this.products[indice].code = code
            this.products[indice].stock = stock
            
            await fs.writeFile(this.path, JSON.stringify(this.products))
        
        } else {
            console.log("Producto no encontrado")
        }
    }
    
    async deleteProduct(id) {
        try {
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const index = this.products.findIndex((product) => product.id === id);

            if (index === -1) {
                console.log("Producto no encontrado");

                return;
            }

            this.products.splice(index, 1); // Eliminar el producto del array

            await fs.writeFile(this.path, JSON.stringify(this.products)); // Guardar el array actualizado en el archivo

            console.log("Producto eliminado correctamente");

        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
        }
    }
}



const product1 = new Product("Celular", "Este producto es un celular", 2000, "Sin imagen", "abc123", 25);
const product2 = new Product("Monitor", "Este es un producto es un monitor", 3000, "Sin imagen", "abc456", 25);
const product3 = new Product("Teclado", "Este es un producto es un teclado", 1500, "Sin imagen", "abc789", 25);
const product4 = new Product("Mouse", "Este es un producto es un mouse", 1000, "Sin imagen", "def123", 25);
const product5 = new Product("Microfono", "Este es un producto es un microfono", 2500, "Sin imagen", "def456", 25);

const productManager = new ProductManager()

await productManager.getProducts();

// Luego, agrega los productos uno por uno.
await productManager.addProduct(product1);
await productManager.addProduct(product2);
await productManager.addProduct(product3);
await productManager.addProduct(product4);
await productManager.addProduct(product5);

// Finalmente, obtén todos los productos actualizados.
await productManager.getProducts();

// productManager.getProductById(1);

// productManager.updateProduct(1, { title: "productoCambiado",description: "Este es un producto cambiado", price: 300, thumbnail: "Sin imagen", code: "abc123", stock: 15 });

// productManager.getProducts();

// productManager.deleteProduct(1);

// productManager.getProducts();
