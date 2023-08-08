import express from 'express';
import { ProductManager } from './desafioEntregable2.js';

const productManager = new ProductManager();

const app = express();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    const product = await productManager.getProductById(2)
    console.log(product);

    const { limit } = req.query;
    const productos =  await productManager.getProducts();

    if (limit) {
        res.send(productos.slice(0, limit))
    } else {
        res.send(productos)
    }
})

app.get('/products/:id', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params['id']));

    if (product) {
        res.send(product);
    } else {
        res.send(`No Existe el Producto`);
    }
})

app.get('*', (req, res) => {
    res.status(404).send({status:"Error", error:"Pagina no encontrada"})
})


app.listen(PORT, () => {
    console.log(`Server on Port: 4000`);
})