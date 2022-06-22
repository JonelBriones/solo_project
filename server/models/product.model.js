const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product's name is required"],
    },
    description: {
        type: String,
        required: [true, "Product's description is required"]
    },
    category: {
        type:String,
        required: [true, "Product's category is required"]
    },
    price: {
        type:Number,
        required: [true, "Product's price is required"]
    },
    image: {
        type:String,
        required: [true, "Product's image is required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
    
}, {timestamps: true});
 

module.exports = mongoose.model('Product', ProductSchema);