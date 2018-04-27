const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    cities: [
        {
            type: Schema.Types.ObjectId,
            ref: "City"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
