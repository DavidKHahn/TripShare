const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
});

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;