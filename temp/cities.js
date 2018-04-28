const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
    location: { type: String, required: true },
    coordinates: { type: Array, required: true },
    details: [
        {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Detail"
        }
    ]
});

const City = mongoose.model("City", citySchema);

module.exports = City;
