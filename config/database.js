require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URL;

mongoose.connect(uri).then(()=> {
    console.log("Database on uri", uri);
}).catch(err => {
    console.log(err);
});