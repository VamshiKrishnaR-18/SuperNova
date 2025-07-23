
const userModel = require('../models/user-model')

const updateCartItemQuantity = async (req, res, operation) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const itemId = req.params.item_id;

        // Find the item in the cart
        const cartItem = user.cart.find(item => item.product.toString() === itemId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart."
            });
        }

        let message = "";
        // Update the quantity based on the operation
        if (operation === "increase") {
            cartItem.quantity++;
            message = "Item quantity increased!";
        } else if (operation === "decrease") {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                message = "Item quantity decreased!";
            } else {
                // Remove item if quantity reaches 1 or less
                user.cart = user.cart.filter(item => item.product.toString() !== itemId);
                message = "Item removed from cart!";
            }
        }

        // Save the updated cart
        await user.save();
        res.json({
            success: true,
            message: message
        });
    } catch (err) {
        console.error("Error updating cart item:", err);
        res.status(500).json({
            success: false,
            message: "Unable to update item quantity."
        });
    }
};

module.exports.updateCartItemQuantity = updateCartItemQuantity;