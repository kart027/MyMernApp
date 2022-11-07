const mongoose = require("mongoose");

const mongoconnect = ()=>{
    mongoose.connect("mongodb://localhost:27017/notebook").then(()=>{
        console.log("database connected");
        
    }).catch((Error)=>{
        console.log(Error);
    })
}

module.exports = mongoconnect;