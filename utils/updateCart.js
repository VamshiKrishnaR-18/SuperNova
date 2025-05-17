
const userModel = require('../models/user-model')

const updateCartItemQuantity = async (req, res, operation) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const itemId = req.params.item_id;

        // Find the item in the cart
        const cartItem = user.cart.find(item => item.product.toString() === itemId);

        if (!cartItem) {
            req.flash("error", "Item not found in cart.");
            return res.redirect("/cart");
        }

        // Update the quantity based on the operation
        if (operation === "increase") {
            cartItem.quantity++;
            req.flash("success", "Item quantity increased!");
        } else if (operation === "decrease") {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                req.flash("success", "Item quantity decreased!");
            } else {
                // Remove item if quantity reaches 1 or less
                user.cart = user.cart.filter(item => item.product.toString() !== itemId);
                req.flash("success", "Item removed from cart!");
            }
        }

        // Save the updated cart
        await user.save();
        res.redirect("/cart");
    } catch (err) {
        console.error("Error updating cart item:", err);
        req.flash("error", "Unable to update item quantity.");
        res.redirect("/cart");
    }
};

module.exports.updateCartItemQuantity = updateCartItemQuantity;