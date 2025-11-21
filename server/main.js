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
const billing = require("./models/billingModel");
const cleaning  = require("./models/cleaningModel");
const { ObjectId } = require("mongodb");

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
                else {
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

// maaz code 

app.get("/getreservationbyroom/:roomNumber", async (req, resp) => {
  try {
    const { roomNumber } = req.params;

    // Room find by roomNumber
    const selectedRoom = await room.findOne({ roomNumber: roomNumber });

    if (!selectedRoom)
      return resp.status(404).send({ message: "Room not found" });

    const reservation = await booking
      .findOne({ roomId: selectedRoom._id })
      .populate("guestId")
      .populate("roomId");

    if (!reservation)
      return resp.status(404).send({ message: "No reservation found for this room" });

    const checkIn = new Date(reservation.checkInDate);
    const checkOut = new Date(reservation.checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days === 0) days = 1;

    const roomPrice = reservation.totalPrice / days;

    resp.status(200).send({
      guestName: reservation.guestId ? reservation.guestId.name : "Unknown",
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      totalDays: days,
      roomPrice,
    });

  } catch (err) {
    resp.status(500).send({ message: err.message });
  }
});

app.get("/getcheckoutroomsfrombooking", async (req, resp) => {
  try {
    const checkoutBookings = await booking.find({ status: "Checked-Out" }).populate("roomId");

    if (checkoutBookings.length === 0)
      return resp.status(404).send({ message: "No checkout rooms found" });

    const rooms = checkoutBookings.map(b => ({
      _id: b._id,
      roomNumber: b.roomId ? b.roomId.roomNumber : "Unknown",
      guestName: b.guestId ? b.guestId.name : b.guestName
    }));

    resp.status(200).send(rooms);
  } catch (err) {
    resp.status(500).send({ message: err.message });
  }
});


app.get("/getcheckoutrooms", async (req, res) => {
    try {
        const rooms = await room.find({ roomStatus: "Occupied" });
        res.status(200).send(rooms);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post("/addbilling", async (req, resp) => {
    try {
        const { guestName, roomNumber, checkInDate, checkOutDate, totalDays, roomPrice, additionalCharges, totalAmount, paymentStatus } = req.body;
        await billing.insertOne({ guestName, roomNumber, checkInDate, checkOutDate, totalDays, roomPrice, additionalCharges, totalAmount, paymentStatus });
        resp.status(200).send({ message: "Billing record added successfully" });
    } catch (err) {
        resp.status(404).send({ message: err.message });
    }
});

app.get("/getbilling", async (req, resp) => {
    try {
        const billingData = await billing.find();
        resp.status(200).send(billingData);
    } catch (err) {
        resp.status(404).send({ message: err.message });
    }
});

app.put("/updatebilling/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { editGuestName, editRoomNumber, editCheckInDate, editCheckOutDate, editTotalDays, editRoomPrice, editAdditionalCharges, editTotalAmount, editPaymentStatus } = req.body;
        await billing.updateOne({ _id: new ObjectId(id) }, { $set: { guestName: editGuestName, roomNumber: editRoomNumber, checkInDate: editCheckInDate, checkOutDate: editCheckOutDate, totalDays: editTotalDays, roomPrice: editRoomPrice, additionalCharges: editAdditionalCharges, totalAmount: editTotalAmount, paymentStatus: editPaymentStatus } });
        resp.status(200).send({ message: "Billing record updated successfully" });
    } catch (err) {
        resp.status(404).send({ message: err.message });
    }
});

app.delete("/deletebilling/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await billing.deleteOne({ _id: new ObjectId(id) });
        resp.status(200).send({ message: "Billing record deleted successfully" });
    } catch (err) {
        resp.status(404).send({ message: err.message });
    }
});

app.get("/downloadinvoice/:roomNumber", async (req, resp) => {
    try {
        const { roomNumber } = req.params;

        const reservation = await booking.findOne({ roomNumber: roomNumber });

        if (!reservation)
            return resp.status(404).send({ message: "No reservation found!" });

        const checkIn = new Date(reservation.checkInDate);
        const checkOut = new Date(reservation.checkOutDate);
        const diff = Math.abs(checkOut - checkIn);
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        const roomPrice = reservation.totalPrice / days;

        const data = {
            guestName: reservation.guestName,
            roomNumber,
            checkInDate: reservation.checkInDate,
            checkOutDate: reservation.checkOutDate,
            days,
            roomPrice,
            extraServicesPrice: reservation.extraServices || 0,
            totalPrice: reservation.totalPrice
        };

        const filePath = `./invoices/invoice-${roomNumber}.pdf`;

        await generateInvoice(data, filePath);

        resp.download(filePath);

    } catch (err) {
        resp.status(500).send({ message: err.message });
    }
});

//cleaning 

// Add
app.post("/addcleaning", async (req, resp) => {
    try {
        const { roomId, cleaningStatus, reportedDate } = req.body;

        const newcleaning = new cleaning({
            roomId,
            cleaningStatus: cleaningStatus || "Pending",
            reportedDate: reportedDate || new Date()
        });

        await newcleaning.save();

        const selectedRoom = await room.findById(roomId);
        if (selectedRoom) {
            selectedRoom.roomStatus = "cleaning";
            await selectedRoom.save();
        }

        resp.status(200).send({ message: "cleaning Request Added" });
    } catch (err) {
        resp.status(500).send({ message: err.message });
    }
});

// Get
app.get("/getcleaning", async (req, resp) => {
    try {
        const cleaningData = await cleaning.find().populate('roomId');
        resp.status(200).send(cleaningData);
    } catch (err) {
        resp.status(500).send({ message: err.message });
    }
});

// Update
app.put("/updatecleaning/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const { cleaningStatus } = req.body;

        if (!ObjectId.isValid(id)) {
            return resp.status(400).send({ message: "Invalid cleaning ID" });
        }

        const updatedCleaning = await cleaning.findByIdAndUpdate(
            id,
            { cleaningStatus },
            { new: true } 
        );

        if (!updatedCleaning) {
            return resp.status(404).send({ message: "Cleaning task not found" });
        }

        if (updatedCleaning.roomId) {
            const selectedRoom = await room.findById(updatedCleaning.roomId);
            if (selectedRoom) {
                if (cleaningStatus === "Pending" || cleaningStatus === "In Progress") {
                    selectedRoom.roomStatus = "cleaning";
                } else if (cleaningStatus === "Completed") {
                    const activeBooking = await booking.findOne({ roomId: selectedRoom._id, status: "Checked-In" });
                    selectedRoom.roomStatus = activeBooking ? "Occupied" : "Available";
                }
                await selectedRoom.save();
            }
        }

        resp.status(200).send({ message: "Cleaning status updated successfully" });
    } catch (err) {
        console.error(err);
        resp.status(500).send({ message: err.message });
    }
});


// Delete
app.delete("/deletecleaning/:id", async (req, resp) => {
    try {
        const id = req.params.id;

        // Cleaning record find
        const cleaningRecord = await cleaning.findById(id);
        if (!cleaningRecord) {
            return resp.status(404).send({ message: "Cleaning task not found" });
        }

        // Room status update
        if (cleaningRecord.roomId) {
            const selectedRoom = await room.findById(cleaningRecord.roomId);
            if (selectedRoom) {
                const activeBooking = await booking.findOne({ roomId: selectedRoom._id, status: "Checked-In" });
                selectedRoom.roomStatus = activeBooking ? "Occupied" : "Available";
                await selectedRoom.save();
            }
        }

        // Delete cleaning record
        await cleaning.deleteOne({ _id: id });
        resp.status(200).send({ message: "Cleaning task deleted successfully" });

    } catch (err) {
        console.error(err);
        resp.status(500).send({ message: err.message });
    }
});




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