const express = require('express');
const cors = require("cors");
const path = require("path");

const connectDb = require('./database');
const Product = require('./modals/product');
const Customer = require('./modals/customer');
const upload = require('./config/multer');

const app = express();

// ✅ CORS config — allow localhost and production frontend
app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Public access to uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDb();
app.use(express.json());

// ✅ Add product
app.post("/addproduct", upload.single('productImage'), async (req, res) => {
  try {
    const { productName, rating, price, discount } = req.body;
    const productImage = req.file.path.replace(/\\/g, "/"); // replace \ with / for cross-platform compatibility

    const products = new Product({ productName, rating, price, discount, productImage });
    await products.save();

    res.status(200).json({ message: "Product inserted successfully", products });
  } catch (err) {
    res.status(400).json({ error: err.message, message: 'Error in product adding' });
  }
});

// ✅ Get all products
app.get('/all_products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
