const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    image:{
        data: Buffer,
        contentType: String
    },
    name: {
        type: String,
        
    }, 
    price: {
        type: Number,
        
    }, 
    discount: {
        type: Number,
        default: 0
    }, 
    bgcolor: String, 
    panelcolor: String, 
    textcolor: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('product', productSchema);