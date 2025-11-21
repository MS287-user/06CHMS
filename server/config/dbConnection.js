const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://maazimran944_db_user:Emperor27@06c-maaz.dct9jjz.mongodb.net/");
        console.log("MongoDB Connected Successfully");
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports = connectDB;

