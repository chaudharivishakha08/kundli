const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Include role in JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        return res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ message: "Logged in successfully" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

exports.logoutUser = async (req, res) => {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
}

exports.checkAuth = async (req, res) => {
    try {
        // The authorization middleware will handle the token verification
        // If we reach here, the user is authenticated
        res.status(200).json({ 
            message: "Authenticated", 
            user: req.user 
        });
    } catch (error) {
        res.status(401).json({ error: "Not authenticated" });
    }
}

