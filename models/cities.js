const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
    location: { type: String, required: true },
    coordinates: { type: Array, required: true },
    userID: { type: String }
});

const City = mongoose.model("City", citySchema);

module.exports = City;
