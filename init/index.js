const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_Url = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
    console.log("Connected to  DB");
}).catch((err) => {console.log("Error");});

async function main(){
    await mongoose.connect(Mongo_Url);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6851192e24de4f5f07057282"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();