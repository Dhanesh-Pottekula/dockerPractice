const userModal = require("../models/userModal");


// Controller for registering a new user
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await userModal.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = await userModal.create({
            username,
            email,
            password
        });
        if(user){
            req.session.user=user;
        }
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Controller for validating username and password
const validateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModal.findOne({ username });
        if (!user) {
            return res.status(400).clearCookie("connect.sid").json({ message: "Invalid username" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        req.session.user=user;
        return res.status(200).json({ message: "User validated successfully" });
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createUser, validateUser };
