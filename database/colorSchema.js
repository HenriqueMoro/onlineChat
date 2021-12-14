const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ColorSchema = new mongoose.Schema({
    author:String,
    color: String
      
})
module.exports = mongoose.model("Color",ColorSchema)