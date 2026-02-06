const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to Db Successfully");
        
    }).catch(()=>{
        console.log("something went wrong while connecting to db");
        
    })
}
module.exports = ConnectToDb;