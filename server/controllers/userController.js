const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const Guest = require('../models/guestmodel'); 
const express = require('express');
const app = express();
const path = require("path");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//upload image code here
const storage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, './uploads');
    },
    filename: function(request, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }); 
//registration here
const registeredUser = async (request, response) => {
    try {
        const { name, email, password, role, address, state, city, contactNo } = request.body; 
        
        
        if (!name || !email || !password) {
            return response.status(400).send({ message: "Name, email and password are required" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        
        let user = await User.findOne({ email });
        if (user) {
            return response.status(400).send({ message: "User already exists" });
        }

        
        await User.insertOne({
            name,
            email,
            password: hashPassword,
            profileImage: profileImage,
            role: role || 'Admin', 
            contactNo,
            address,
            city,
            state
        });
        
        response.status(200).send({ message: "Registered Successfully" });
    } 
    catch (error) {
        response.status(500).send({ message: error.message }); 
    }
};
//login code here
const login = async (request, response) => { 
    try {
        const { email, password } = request.body;
        
       
        if (!email || !password) {
            return response.status(400).send({ message: "Email and password are required" });
        }

        const registered = await User.findOne({ email });
        if (!registered) {
            return response.status(400).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, registered.password);
        if (isMatch) {
            response.status(200).send({ 
                message: "Logged in successfully", 
                user: {
                    id: registered._id,
                    name: registered.name,
                    email: registered.email,
                    role: registered.role
                }
            });
        } else {
            response.status(400).send({ message: "Incorrect password" });
        }
    } catch (error) {
        response.status(500).send({ message: error.message }); 
};
}
//logout code here
const logoutuser = async (request, response) => {
    response.status(200).send({ message: "Logged out successfully" });
};


module.exports = { registeredUser, login, logoutuser, upload }; 