const { Schema, model } = require('mongoose');
const subCategorySchema = new Schema({

    
    subCategory_name: {
        type: String,
        trim: true,
        required: true
    }
    type: {
        type: String,
        trim: true,
        required: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    model: {
        type: Number
    },

    category: [
        ref: "Category",
        type: Schema.ObjectId //Relación entre el schema SubCategory y el de Category
    ]
    deleted: {
        type: Boolean,
        default: false
    }
    
   
});

module.exports = model('SubCategory', subCategorySchema);