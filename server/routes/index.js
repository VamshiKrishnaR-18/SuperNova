const express = require("express");

const router = express.Router();

const Product = require("../models/product-model");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");

const {updateCartItemQuantity} = require('../utils/updateCart');

const isLoggedin = require("../middlewares/isLoggedin");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SuperNova API is running",
    endpoints: {
      auth: "/users/register, /users/login, /users/logout",
      shop: "/shop",
      cart: "/cart",
      profile: "/profile",
      about: "/about"
    }
  });
});

router.get("/shop", isLoggedin, async (req, res) => {
  try {
    const products = await Product.find({});

    // Convert image buffer to base64 for JSON response
    const productsWithImages = products.map(product => ({
      ...product.toObject(),
      image: {
        data: product.image.data.toString('base64'),
        contentType: product.image.contentType
      }
    }));

    res.json({
      success: true,
      products: productsWithImages
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products"
    });
  }
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
            quantity: item.quantity || 1,
            image: {
                data: item.product.image.data.toString('base64'),
                contentType: item.product.image.contentType
            }
        })) || [];

        res.json({
            success: true,
            items: items
        });
    } catch (err) {
        console.error("Error loading cart:", err);
        res.status(500).json({
            success: false,
            message: "Error loading cart",
            items: []
        });
    }
});

router.get("/profile", isLoggedin, async (req, res)=>{
    try {
        let user = await userModel.findOne({email: req.user.email}).select('-password');

        res.json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user profile"
        });
    }
})

router.get("/about", async (req, res) => {
    try {
        let owner = await ownerModel.findOne({});

        res.json({
            success: true,
            owner: owner || {
                fullname: "SuperNova Team",
                email: "info@supernova.com",
                picture: "/images/default-avatar.png"
            }
        });
    } catch (error) {
        console.error("Error fetching about info:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching about information"
        });
    }
})

router.post("/addToCart/:productId", isLoggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const productId = req.params.productId;

        // Check if the product already exists in the cart
        const existingItem = user.cart.find(item => item.product.toString() === productId);

        if (existingItem) {
            // Increase the quantity if the product is already in the cart
            existingItem.quantity++;
        } else {
            // Add the product to the cart
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();
        res.json({
            success: true,
            message: "Item added to cart!"
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            message: "Unable to add item to cart."
        });
    }
});



// Increase quantity
router.post("/cart/increase/:item_id", isLoggedin, (req, res) => updateCartItemQuantity(req, res, "increase"));

// Decrease quantity
router.post("/cart/decrease/:item_id", isLoggedin, (req, res) => updateCartItemQuantity(req, res, "decrease"));


router.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

module.exports = router;
