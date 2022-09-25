const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    confirmPassword: {
        type: String,
        required: false,
    },
    firstname: {
        type: String,
        required: [true, "Please enter your firstname"],
    },
    lastname: { type: String, required: [true, "Please enter your lastname"] },
});

usersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

usersSchema.methods.correctPassword = async function (
    enteredPassword,
    userPassword
) {
    return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("User", usersSchema);
module.exports = User;
