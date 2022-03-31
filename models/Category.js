const { Schema, model } = require('mongoose');

const categorySchema = new Schema({

    category_name: {
        type: String,
        trim: true,
        required: true
    }
    
    deleted: {
        type: Boolean,
        default: false
    },
});

module.exports = model('Category', categorySchema);