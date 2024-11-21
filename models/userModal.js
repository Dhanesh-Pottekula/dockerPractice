const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,  // Ensure username is unique
        trim: true, // Remove any extra spaces
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
});

// Hash password before saving user to the database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash password
    next();
});

// Compare input password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
