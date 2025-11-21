const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoice(reservation, filePath) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(filePath));

            doc.fontSize(20).text("Hotel Invoice", { align: "center" });
            doc.moveDown();

            doc.fontSize(12).text(`Guest Name: ${reservation.guestName}`);
            doc.text(`Room Number: ${reservation.roomNumber}`);
            doc.text(`Check-In: ${reservation.checkInDate}`);
            doc.text(`Check-Out: ${reservation.checkOutDate}`);
            doc.text(`Days Stayed: ${reservation.days}`);
            doc.text(`Room Price (per day): ${reservation.roomPrice}`);
            doc.text(`Additional Services: ${reservation.extraServicesPrice || 0}`);
            doc.text(`Total Price: ${reservation.totalPrice}`);

            doc.end();
            resolve(filePath);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = generateInvoice;
