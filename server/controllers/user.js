const User = require('../models/user');

module.exports = {
    create: async (req, res) => {
        try{
            console.log(req.body);
            await User.create(req.body);
            const response = 
            res.status(200).json({ "message": 'Data added' })
    } catch (error) {
        res.send(error);
        }
    },
    find: async (req, res) => {
        try{
            
            const user = await user.find({ userId: req.params.userId});
            console.log("get data",user);
        res.send(user);
    } catch (error) {
        res.send(error);
        }
    },
    findOne: async (req, res) => {
        try{
            console.log(req.params);
            const user = await user.findOne({userId: req.params.userId});
        res.send(user);
    } catch (error) {
        res.send(error);
        }
    },
    delete: async (req, res) => {
        try{
            console.log(req);
            await user.findOneAndDelete({userId: req.params.userId});
            res.status(200).json({ "message": 'Data deleted' })
        } catch (error) {
            res.send(error);
            }
    },
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ username: username });
    
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            console.log("session", req.session)
            // Set session variables for the logged-in user
            req.session.userId = user.userId;
            req.session.username = user.username;
            
            console.log("session", req.session)
            res.status(200).json({ message: 'Login successful', userId: user.userId, username: user.username });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error: error });
        }
    },
    profile: async (req, res) => {
console.log("get User", req.session)
        if (req.session.userId) {
            res.status(200).json({ userId: req.session.userId, username: req.session.username });
        } else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    },
    logout: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging out' });
            }
         console.log("logout", req.session)
            res.status(200).json({ message: 'Logout successful' });
        });
    }
}