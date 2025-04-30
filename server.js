const express = require('express');
const connectDb = require('./database')
const Product = require('./modals/product')
const Customer = require('./modals/customer')
const upload = require('./config/multer')
const app = express()
connectDb()
app.use(express.json())

app.post("/addproduct",upload.single('productImage'), async (req, res) => {
    try {
        const {productName,rating,price,discount}=req.body
        const productImage=req.file.path
        const products = await new Product({productName,rating,price,discount,productImage});
        await products.save()
        res.status(200).json({ message: "Product inserted successfully", products });
    } catch (err) {
        res.status(400).json({ error: err.message, message:'error in product adding'});
    }
});

app.get('/all_products', async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(200).json({message: "Products fetched successfully",data: product});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching products" });
    }
});


app.listen(5000,()=>console.log('server running on localhost 5000'))