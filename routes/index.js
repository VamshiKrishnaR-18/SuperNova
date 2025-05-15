const express = require("express");

const router = express.Router();

const Product = require('../models/product-model');
const userModel = require('../models/user-model');

const isLoggedin = require('../middlewares/isLoggedin')

router.get("/", (req, res)=>{
    const error = req.query.error || "";
    res.render("index", { error, loggedIn: false });
})


router.get("/shop", isLoggedin, async (req, res)=>{

   
    const products = await Product.find({});

    res.render("shop", {products});
})


router.get("/cart", isLoggedin, async (req, res) => {
    try {
        // Fetch user with populated cart
        const user = await userModel.findOne({ email: req.user.email }).populate({
            path: "cart",
            model: "product",
            select: "name price image"
        });

        const items = user?.cart || [];
        

        res.render("cart", { items });
    } catch (err) {
        console.error("Error loading cart:", err);
        res.render('cart', { items: [] });
    }
});


router.get('/addToCart/:productId', isLoggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const productId = req.params.productId;
        
        // Check if product already exists in cart
        if (!user.cart.includes(productId)) {
            user.cart.push(productId);
            await user.save(); 
            req.flash("success", "Item added to cart!");
        } else {
            req.flash("info", "Item already in cart.");
        }

        res.redirect('/shop');
    } catch (error) {
        console.error("Error adding to cart:", error);
        req.flash("error", "Unable to add item to cart.");
        res.redirect('/shop');
    }
});


router.get('/logout', (req, res)=>{

    res.cookie("token", "");
    res.redirect("/");
})

module.exports = router;