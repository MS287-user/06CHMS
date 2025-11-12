const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/dbConnection");
const staffUsers = require("./models/usermodel");
const room = require("./models/roomModel");
const booking = require("./models/bookingmodel");

app.use(express.json());
app.use(cors());

connectDB();

// Add Staff
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

// Get Staff
app.get("/getstaff", async (req, resp) => {
    try{
        const staffData = await staffUsers.find();
        resp.status(200).send(staffData);
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Update Staff
app.put("/updatestaff/:id", async (req, resp) => {
    try{
        const id = req.params.id;
        const { editName, editEmail, editStaffRole } = req.body;
        
        await staffUsers.updateOne({_id: id}, {$set: { name: editName, email: editEmail, role: editStaffRole }});
        resp.status(200).send({ message: "Updated Successfully" });
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Delete Staff
app.delete("/deletestaff/:id", async (req, resp) => {
    try{
        const id = req.params.id;
        await staffUsers.deleteOne({_id: id});
        resp.status(200).send({ message: "Deleted Successfully" });
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Add Room
app.post("/addroom", async (req, resp) => {
    try {
        const { roomNumber, roomType, roomPrice, roomStatus } = req.body;
        await room.insertOne({ roomNumber, roomType, roomPrice, roomStatus });
        resp.status(200).send({ message: "Room Added" })
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Get Room
app.get("/getroom", async (req, resp) => {
    try{
        const roomData = await room.find();
        resp.status(200).send(roomData);
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Update Room
app.put("/updateroom/:id", async (req, resp) => {
    try{
        const id = req.params.id;
        const { editRoomNumber, editRoomType, editRoomPrice, editRoomStatus } = req.body;
        
        await room.updateOne({_id: id}, {$set: { roomNumber: editRoomNumber, roomType: editRoomType, roomPrice: editRoomPrice, roomStatus: editRoomStatus }});
        resp.status(200).send({ message: "Room Updated" });
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Delete Room
app.delete("/deleteroom/:id", async (req, resp) => {
    try{
        const id = req.params.id;
        await room.deleteOne({_id: id});
        resp.status(200).send({ message: "Room Deleted" });
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Add Reservation
app.post("/addreservation", async (req, resp) => {
    try {
        const { guestName, guestEmail, guestPhone, roomNumber, checkInDate, checkOutDate, totalPrice } = req.body;
        await booking.insertOne({ guestName, guestEmail, guestPhone, roomNumber, checkInDate, checkOutDate, totalPrice });
        
        resp.status(200).send({ message: "Reservation Added" })
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Get Reservation
app.get("/getreservation", async (req, resp) => {
    try{
        const reservationData = await booking.find();
        resp.status(200).send(reservationData);
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Getting Reservation By Id
app.get("/getreservation/:id", async (req, resp) => {
    try{
        const id = req.params.id;
        const reservationData = await booking.findOne({_id: id});
        resp.status(200).send(reservationData);
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Update Reservation
app.put("/updatereservation/:id", async (req, resp) => {
    try{
        const id = req.params.id;
        const { editGuestName, editGuestEmail, editGuestPhone, editRoomNumber, editCheckInDate, editCheckOutDate, totalPrice, editBookingStatus } = req.body;
        
        await booking.updateOne({_id: id}, {$set: { guestName: editGuestName, guestEmail: editGuestEmail, guestPhone: editGuestPhone, roomNumber: editRoomNumber, checkInDate: editCheckInDate, checkOutDate: editCheckOutDate, totalPrice, status: editBookingStatus }});

        const selectedRoom = await room.findOne({roomNumber: editRoomNumber});
        
        if(selectedRoom){
            if(editBookingStatus == "Checked-In"){
                selectedRoom.roomStatus = "Occupied";
                await selectedRoom.save();
            }
            else if(editBookingStatus == "Checked-Out"){
                selectedRoom.roomStatus = "Cleaning";
                await selectedRoom.save();
            }
        } 

        resp.status(200).send({ message: "Reservation Updated" });
    }
    catch(err){
        resp.status(404).send({ message: err.message });
    }
})

// Delete Reservation
app.delete("/deletereservation/:id", async (req, resp) => {
    
    try{
        const id = req.params.id;
        
        const selectedBooking = await booking.findOne({_id: id});

        if(selectedBooking){
            const selectedBookingRoomNumber = selectedBooking.roomNumber;
            const selectedRoom = await room.findOne({roomNumber: selectedBookingRoomNumber});
            if(selectedRoom){
            selectedRoom.roomStatus = "Available";
            await selectedRoom.save();
        }
        }
        await booking.deleteOne({_id: id});

        resp.status(200).send({ message: "Reservation Deleted" });
    }
    catch(err){
        resp.status(404).send({ message: err.message });
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