const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://ashish:ashish744542@cluster0.f4zrj7c.mongodb.net/eternal?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;