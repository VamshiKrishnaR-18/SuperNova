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
            req.flash("error", "product name, price and image are required!");
            res.redirect("/owners/admin");
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

        req.flash("success", "product created successfully!");
        res.redirect("/owners/admin")


    }catch (err){

        console.error(err);
        res.status(500).send("server error");

    }
    


});

module.exports = router;