class ProductManager {
    constructor(){
        this.products = [];
        this.idAutoIncremental = 1;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Todos los campos deben ser obligatorios");
        } else if (this.products.find((product) => product.code === code)) {
            return console.log("Ya existe un producto con ese codigo");
        } else {
            const newProduct = {
                id: this.idAutoIncremental,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.idAutoIncremental++;

            this.products.push(newProduct);
        }
    }

    getProducts = () => {
        return console.log(this.products);
    }
}


const testing = () => {
    const productManager = new ProductManager;

    productManager.getProducts();

    productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

    productManager.getProducts();

    productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
}

testing();