const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({}, { collection: 'items' });

module.exports = mongoose.model('Item', itemSchema);
