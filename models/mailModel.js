const mongoose = require("mongoose")

const mailModel = new mongoose.Schema({
    name: String,
    email:String,
    subject: String,
    
    
});

const Mail = mongoose.model("Mail",mailModel);

module.exports = Mail;
