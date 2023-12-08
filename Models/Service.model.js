const mongoose = require('mongoose')
const Category = require('./Category.model');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    tag:{
        type: String,
        required: [true, "Tag is required"]
    },
    icon:{
        type: String
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    price_for: {
        type: String,
        required: [true, "Price For is required"]
    },
    category:{
        type: Schema.Types.ObjectId,
        required: [true, "Please Select a Category"],
        ref: Category
    },
    created_at:{
        type: Date,
        default: Date()
    },
    updated_at:{
        type: Date,
        default: Date()
    }
}
);

const Service = mongoose.model('Service', CategorySchema)

module.exports = Service