const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PowerSchema = new Schema({
    功率: Number,
    電壓: Number,
    createdAt: Date
});

const PowerPost = mongoose.model('shellyem/nows',PowerSchema);

module.exports=PowerPost