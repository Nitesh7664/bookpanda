const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    path: String
});

const product = mongoose.model('product', productSchema);

module.exports = product;