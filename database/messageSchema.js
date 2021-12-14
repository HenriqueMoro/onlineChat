const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    author: String,
    message:String,
    color: String
   
})


module.exports = mongoose.model("Message",MessageSchema)