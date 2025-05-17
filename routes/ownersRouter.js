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
    const owner = await ownerModel.findOne({});
    const products = await Product.find({});
    
    // Ensure each product has a formatted createdAt date
    const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      createdAtFormatted: formatDate(product.createdAt),
    }));

    console.log(owner)

    res.render("adminDashboard", { products: formattedProducts ,owner});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/createproducts", async (req, res) => {
  res.render("createproducts");
});

router.post("/deleteProducts", async (req, res) => {
  try {
    const { ids } = req.body;
    await Product.deleteMany({ _id: { $in: ids } });

    res.redirect("/owners/adminDashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting products");
  }
});
module.exports = router;


router.get("/editItem/:productID/edit", async (req, res)=>{

  try{
    let product = await Product.findById(req.params.productID)

    if(!product) return res.status(404).send('product not found');

    res.render("editProduct", {product});
  }catch(err){

    console.error('err');
    res.status(500).send('Server error');


  }

 
})



module.exports = router;
