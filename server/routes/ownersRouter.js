const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const Product = require("../models/product-model");


const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      // Check if an owner already exists
      let owners = await ownerModel.find();

      if (owners.length > 0) {
        return res
          .status(403)
          .send("You don't have permission to create a new owner!");
      }

      // Create a new owner
      let { fullname, email, password } = req.body;
      let createdOwner = await ownerModel.create({ fullname, email, password });

      // Respond with the created owner
      return res.status(201).send({
        message: `Owner created under name "${fullname}".`,
        owner: createdOwner,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
}

router.get("/adminDashboard", async (req, res) => {
  try {
    let owner = await ownerModel.findOne({});
    const products = await Product.find({});

    // If no owner exists, create a default one or provide default values
    if (!owner) {
      owner = {
        fullname: "Admin",
        email: "admin@supernova.com",
        picture: null
      };
    }

    // Ensure each product has a formatted createdAt date
    const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      createdAtFormatted: formatDate(product.createdAt),
    }));

    console.log(owner)

    res.json({
      success: true,
      products: formattedProducts,
      owner: owner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.get("/createproducts", async (req, res) => {
  res.json({
    success: true,
    message: "Create products endpoint"
  });
});

router.post("/deleteProducts", async (req, res) => {
  try {
    const { ids } = req.body;
    await Product.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: "Products deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting products"
    });
  }
});

router.get("/editItem/:productID/edit", async (req, res)=>{
  try{
    let product = await Product.findById(req.params.productID)

    if(!product) return res.status(404).json({
      success: false,
      message: 'Product not found'
    });

    res.json({
      success: true,
      product: product
    });
  }catch(err){
    console.error('Error fetching product:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
