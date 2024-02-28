const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    pictures: [String],
    name: {
        ru: String, 
        kz: String, 
        
    },
    description: {
        ru: String, 
        kz: String, 
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;