const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // If user is not found, send an error message
        if (!user) return res.status(401).json({ message: 'User not found' });

        // If user is found, compare passwords
        const validPassword = await bcrypt.compare(password, user.password);

        // If passwords don't match, send an error message
        if (!validPassword) return res.status(401).json({ message: 'Incorrect password' });

        // If passwords do match, create and send a token
        const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });;
        res.cookie("token", token, {
            httpOnly: true,
        })
        return res.redirect("/"); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}