const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/dbConnection");
const staffUsers = require("./models/usermodel");



app.use(express.json());
app.use(cors());

connectDB();

// Staff Registration here
app.post("/register", async (req, resp) => {
    try {
        const { name, email, address, password, staffRole } = req.body;

        if (!name || !email || !password) {
            return resp.status(400).send({ message: "Name, email and password are required" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        let user = await staffUsers.findOne({ email: email });
        if (user) {
            return resp.status(400).send({ message: "User with this email address already exists" });
        }

        await staffUsers.insertOne({ name, email, address, password: hashPassword, role: staffRole || "Admin" });

        resp.status(200).send({ message: "Registered Successfully" });
    }
    catch (error) {
        resp.status(500).send({ message: error.message });
    }
})

// Login
app.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.status(400).send({ message: "Email and password are required" });
        }

        const registeredUser = await staffUsers.findOne({ email: email });
        if (!registeredUser) {
            return resp.status(400).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, registeredUser.password);
        if (isMatch) {
            resp.status(200).send({
                message: "Logged in successfully",
                registeredUser
            });
        } else {
            resp.status(400).send({ message: "Incorrect password" });
        }
    }
    catch (error) {
        resp.status(500).send({ message: error.message });
    }
})




app.listen(3000, () => {
    console.log("Server Started");
})