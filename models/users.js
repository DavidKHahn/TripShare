const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    cities: [
        {
            location: { type: String, sparse: true },
            coordinates: { type: Array },
            username: { type: String },
            details: [
                {
                    name: { type: String },
                    description: { type: String },
                    image: { type: String }
                }
            ]
        }
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
