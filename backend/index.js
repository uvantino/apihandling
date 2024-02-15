import express from 'express'
// const cors = require('cors')
const app = express();

// app.use(cors());

app.get('/api/products', (req, res) => {
    const products = [
        {
        id: 1,
        name: 'table wooden',
        price: 200,
        image: "",
    }
    ,{
        id: 2,
        name: 'cloths',
        price: 300,
        image: "",
    }]
    if (req.query.search) {
        const filterProducts = products.filter(product =>
            product.name.includes(req.query.search));
        res.send(filterProducts);
        return;
    }

    setTimeout(() => {
        res.send(products)
    }, 3000)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})