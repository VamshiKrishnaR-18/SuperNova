const express = require("express");

const router = express.Router();

const Product = require("../models/product-model");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");

const {updateCartItemQuantity} = require('../utils/updateCart');

const isLoggedin = require("../middlewares/isLoggedin");

router.get("/", (req, res) => {
  const error = req.query.error || "";
  res.render("index", { error, loggedIn: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
  const products = await Product.find({});

  res.render("shop", { products });
});

router.get("/cart", isLoggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate({
            path: "cart.product",
            model: "product",
            select: "name price image bgcolor panelcolor discount"
        });

        const items = user?.cart.map(item => ({
            ...item.product.toObject(),
            quantity: item.quantity || 1
        })) || [];

        

        res.render("cart", { items });
    } catch (err) {
        console.error("Error loading cart:", err);
        res.render("cart", { items: [] });
    }
});

router.get("/profile", isLoggedin, async (req, res)=>{

    let user = await userModel.findOne({email: req.user.email});
    console.log(user);

    res.render('userProfile', {user});
})

router.get("/about",async(req,res)=>{

    let owner = await ownerModel.findOne({})
    res.render('about', {owner});
})

router.get("/addToCart/:productId", isLoggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const productId = req.params.productId;

        // Check if the product already exists in the cart
        const existingItem = user.cart.find(item => item.toString() === productId);
        
        if (existingItem) {
            // Increase the quantity if the product is already in the cart
            existingItem.quantity++;
        } else {
            // Add the product to the cart
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();
        req.flash("success", "Item added to cart!");
        res.redirect("/shop");
    } catch (error) {
        console.error("Error adding to cart:", error);
        req.flash("error", "Unable to add item to cart.");
        res.redirect("/shop");
    }
});



// Increase quantity
router.get("/cart/increase/:item_id", isLoggedin, (req, res) => updateCartItemQuantity(req, res, "increase"));

// Decrease quantity
router.get("/cart/decrease/:item_id", isLoggedin, (req, res) => updateCartItemQuantity(req, res, "decrease"));


router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
