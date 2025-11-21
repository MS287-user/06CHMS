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
const guest = require("./models/guestmodel");
const maintenance = require("./models/maintenance");

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

        await staffUsers.insertOne({ name, email, address, password: hashPassword, role: staffRole || 'Admin' });

        resp.status(200).send({ message: "Registered Successfully" });
    }
    catch (error) {
        resp.status(500).send({ message: error.message });
    }
})

// Get Staff
app.get("/getstaff", async (req, resp) => {
    try {
        const staffData = await staffUsers.find();
        resp.status(200).send(staffData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Update Staff
app.put("/updatestaff/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { editName, editEmail, editAddress, editStaffRole, editStaffStatus } = req.body;

        await staffUsers.updateOne({ _id: id }, { $set: { name: editName, email: editEmail, address: editAddress, role: editStaffRole, status: editStaffStatus } });
        resp.status(200).send({ message: "Updated Successfully" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Delete Staff
app.delete("/deletestaff/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await staffUsers.deleteOne({ _id: id });
        resp.status(200).send({ message: "Deleted Successfully" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Add Guest
app.post("/addguest", async (req, resp) => {
    try {
        const { name, email, phone, address, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await guest.insertOne({ name, email, phone, address, password: hashPassword, role: "Guest" });
        resp.status(200).send({ message: "Registered Successfully" })
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Get Guest
app.get("/getguest", async (req, resp) => {
    try {
        const guestData = await guest.find();
        resp.status(200).send(guestData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Update Guest
app.put("/updateguest/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { editName, editEmail, editPhone, editAddress } = req.body;

        await guest.updateOne({ _id: id }, { $set: { name: editName, email: editEmail, phone: editPhone, address: editAddress } });
        resp.status(200).send({ message: "Updated Successfully" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Delete Guest
app.delete("/deleteguest/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await guest.deleteOne({ _id: id });
        resp.status(200).send({ message: "Guest Deleted" });
    }
    catch (err) {
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
    try {
        const roomData = await room.find();
        resp.status(200).send(roomData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Update Room
app.put("/updateroom/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { editRoomNumber, editRoomType, editRoomPrice, editRoomStatus } = req.body;

        await room.updateOne({ _id: id }, { $set: { roomNumber: editRoomNumber, roomType: editRoomType, roomPrice: editRoomPrice, roomStatus: editRoomStatus } });
        resp.status(200).send({ message: "Room Updated" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Delete Room
app.delete("/deleteroom/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await room.deleteOne({ _id: id });
        resp.status(200).send({ message: "Room Deleted" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Add Reservation
app.post("/addreservation", async (req, resp) => {
    try {
        const { guestId, roomId, checkInDate, checkOutDate, totalPrice } = req.body;
        await booking.insertOne({ guestId, roomId, checkInDate, checkOutDate, totalPrice });
        const selectedRoom = await room.findOne({ _id: roomId });
        if (selectedRoom) {
            selectedRoom.roomStatus = "Reserved";
            await selectedRoom.save();
        }
        resp.status(200).send({ message: "Reservation Added" })
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Get Reservation
app.get("/getreservation", async (req, resp) => {
    try {
        const reservationData = await booking.find().populate('guestId').populate('roomId');
        resp.status(200).send(reservationData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Getting Reservation By Id
app.get("/getreservation/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const reservationData = await booking.findOne({ _id: id }).populate('guestId').populate('roomId');
        resp.status(200).send(reservationData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Getting Reservation By Guest Id
app.get("/getreservationbyguest/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const reservationData = await booking.find({ guestId: id }).populate('guestId').populate('roomId');
        resp.status(200).send(reservationData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Update Reservation
app.put("/updatereservation/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { updateRoomId, editCheckInDate, editCheckOutDate, totalPrice } = req.body;

        await booking.updateOne({ _id: id }, { $set: { roomId: updateRoomId, checkInDate: editCheckInDate, checkOutDate: editCheckOutDate, totalPrice } });

        resp.status(200).send({ message: "Reservation Updated" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Delete Reservation
app.delete("/deletereservation/:id", async (req, resp) => {

    try {
        const id = req.params.id;

        const selectedBooking = await booking.findOne({ _id: id });

        if (selectedBooking) {
            const selectedBookingRoomNumber = selectedBooking.roomNumber;
            const selectedRoom = await room.findOne({ roomNumber: selectedBookingRoomNumber });
            if (selectedRoom) {
                selectedRoom.roomStatus = "Available";
                await selectedRoom.save();
            }
        }
        await booking.deleteOne({ _id: id });

        resp.status(200).send({ message: "Reservation Deleted" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Reservation Status Checked In
app.put("/reservationstatuscheckedin/:id", async (req, resp) => {
    try {
        const id = req.params.id;

        await booking.updateOne({ _id: id }, { $set: { status: "Checked-In" } });

        const selectedBooking = await booking.findOne({ _id: id });

        const selectedRoomId = selectedBooking.roomId;

        if (selectedRoomId) {
            const selectedRoom = await room.findOne({ _id: selectedRoomId });
            selectedRoom.roomStatus = "Occupied";
            await selectedRoom.save();
        }

        resp.status(200).send({ message: "Guest Checked-In" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Reservation Status Checked Out
app.put("/reservationstatuscheckedout/:id", async (req, resp) => {
    try {
        const id = req.params.id;

        await booking.updateOne({ _id: id }, { $set: { status: "Checked-Out" } });

        const selectedBooking = await booking.findOne({ _id: id });

        const selectedRoomId = selectedBooking.roomId;

        if (selectedRoomId) {
            const selectedRoom = await room.findOne({ _id: selectedRoomId });
            selectedRoom.roomStatus = "Available";
            await selectedRoom.save();
        }

        resp.status(200).send({ message: "Guest Checked-Out" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Add Maintenance
app.post("/addmaintenance", async (req, resp) => {
    try {
        const { guestId, roomId, issue, resolveStatus, reportedDate } = req.body;
        await maintenance.insertOne({ guestId, roomId, issue, resolveStatus, reportedDate });
        const selectedRoom = await room.findOne({ _id: roomId });
        if (selectedRoom) {
            selectedRoom.roomStatus = "Maintenance";
            await selectedRoom.save();
        }
        resp.status(200).send({ message: "Maintenance Request Added" })
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Get Maintenance
app.get("/getmaintenance", async (req, resp) => {
    try {
        const maintenanceData = await maintenance.find().populate('guestId').populate('roomId');
        resp.status(200).send(maintenanceData);
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Update Maintenance
app.put("/updatemaintenance/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { editResolveStatus } = req.body;

        await maintenance.updateOne({ _id: id }, { $set: { resolveStatus: editResolveStatus } });
        const selectedMaintenance = await maintenance.findOne({ _id: id });

        if (selectedMaintenance) {
            const selectedMaintenanceRoomId = selectedMaintenance.roomId;
            if (selectedMaintenance.resolveStatus == "Pending") {
                const selectedRoom = await room.findOne({ _id: selectedMaintenanceRoomId });
                if (selectedRoom) {
                    selectedRoom.roomStatus = "Maintenance";
                    await selectedRoom.save();
                }
            }
            if (selectedMaintenance.resolveStatus == "In Progress") {
                const selectedRoom = await room.findOne({ _id: selectedMaintenanceRoomId });
                if (selectedRoom) {
                    selectedRoom.roomStatus = "Maintenance";
                    await selectedRoom.save();
                }
            }
            else if (selectedMaintenance.resolveStatus == "Resolved") {
                const selectedBooking = await booking.findOne({ roomId: selectedMaintenanceRoomId });
                if (selectedBooking.status == "Checked-In") {
                    const selectedRoom = await room.findOne({ _id: selectedMaintenanceRoomId });
                    if (selectedRoom) {
                        selectedRoom.roomStatus = "Occupied";
                        await selectedRoom.save();
                    }
                }
                else{
                    const selectedRoom = await room.findOne({ _id: selectedMaintenanceRoomId });
                    if (selectedRoom) {
                        selectedRoom.roomStatus = "Available";
                        await selectedRoom.save();
                    }
                }

            }

        }



        resp.status(200).send({ message: "Maintenance Status Updated" });
    }
    catch (err) {
        resp.status(404).send({ message: err.message });
    }
})

// Delete Maintenance
app.delete("/deletemaintenance/:id", async (req, resp) => {

    try {
        const id = req.params.id;

        // const selectedMaintenance = await maintenance.findOne({ _id: id });

        // if (selectedMaintenance) {
        //     const selectedMaintenanceRoomId = selectedMaintenance.roomId;
        //     const selectedRoom = await room.findOne({ _id: selectedMaintenanceRoomId });
        //     if (selectedRoom) {
        //         selectedRoom.roomStatus = "Available";
        //         await selectedRoom.save();
        //     }
        // }
        await maintenance.deleteOne({ _id: id });

        resp.status(200).send({ message: "Maintenance Request Deleted" });
    }
    catch (err) {
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
        if (registeredUser) {

            if (registeredUser.status == "Deactive") {
                return resp.status(403).send({ message: "Your account has been deactivated" })
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
        else {
            const registeredUser = await guest.findOne({ email: email });
            if (!registeredUser) {
                return resp.status(404).send({ message: "User not found" });
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

    }
    catch (error) {
        resp.status(500).send({ message: error.message });
    }
})

app.listen(3000, () => {
    console.log("Server Started");
})