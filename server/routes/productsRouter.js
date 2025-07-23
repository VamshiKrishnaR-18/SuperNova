const express = require('express');
const multer = require("multer");
const Product = require('../models/product-model');

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({storage: storage});


router.post("/create", upload.single("image"),async (req, res)=>{

    try{

        let{ name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

        if(!name || !price || !req.file){
            return res.status(400).json({
                success: false,
                message: "Product name, price and image are required!"
            });
        }


        const product = new Product({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image:{
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            product: {
                id: product._id,
                name: product.name,
                price: product.price,
                discount: product.discount
            }
        });

    }catch (err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
    


});

router.post("/:productID/edit",upload.single("image"), async (req, res)=>{

  try {
    
    const {image, name, price, discount, panelcolor, bgcolor, textcolor} = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.productID,
      {image, name, price, discount, panelcolor, bgcolor, textcolor},
      {new: true, runValidators: true}
    );

    await product.save();

    if(!product) return res.status(404).json({
        success: false,
        message: 'Product not found!'
    });

    res.json({
        success: true,
        message: "Product details updated!",
        product: product
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Server error"
    });
  }


})

module.exports = router;