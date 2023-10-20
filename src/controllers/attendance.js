const express = require("express");
const route = express.Router();
const Attend = require("../models/Attendance");
const mongoose = require("mongoose");

const moment = require("moment");

exports.getattndace = async (req, res, next) => {
  const user_id = req.params.user_id;

  Attend.find({ user_id })
    .exec()
    .then((attendance) => {
      res.status(200).json({
        user_id,
        history: attendance,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.attendance = async (req, res, next) => {
  const current_time = new Date().toLocaleTimeString(); // Get the current time
  const today_date = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  });

  const formatted_date = today_date.replace(/\//g, ".");
  if (req.body.type == "checkin") {
    const attend = new Attend({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.body.user_id,
      checkin: current_time,
      checkin_loc: {
        lat: req.body.checkin_loc.lat,
        lang: req.body.checkin_loc.lang,
      },
      checkin_address: req.body.checkin_address,

      checkin_date: formatted_date,
      type: req.body.type,
    });
    attend
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    Attend.findOne({ user_id: req.body.user_id, checkout: null }) // Find the attendance record with no checkout time
      .exec()
      .then((attendance) => {
        if (!attendance) {
          return res.status(404).json({
            message: "No checkin record found for the user.",
          });
        }

        attendance.checkout = current_time; // Set the checkout time
        attendance.checkout_date = formatted_date;
        attendance.checkout_loc = {
          lat: req.body.checkout_loc.lat,
          lang: req.body.checkout_loc.lang,
        };
        attendance.checkout_address = req.body.checkout_address;
        const checkinTime = moment(attendance.checkin, "hh:mm:ss A").toDate(); // Convert checkin time to Date object
        const checkoutTime = moment(attendance.checkout, "hh:mm:ss A").toDate(); // Convert checkout time to Date object
        console.log("checkinTime", attendance.checkout);
        const timeDifference = checkoutTime - checkinTime; // Calculate the time difference in milliseconds
        const totalMinutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
        console.log(timeDifference, "totalMinutes", totalMinutes);
        const hours = Math.floor(totalMinutes / 60); // Calculate the total hours
        const minutes = totalMinutes % 60; // Calculate the remaining minutes

        attendance.total_time = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`; // Format the total time as hh:mm

        attendance
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
};

// route.delete("/:id", (req, res, next) => {
//   User.findByIdAndRemove({ _id: req.params.id })
//     .then((result) => {
//       res.status(200).json({
//         message: "data deleted",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// route.put("/:id", (req, res, next) => {
//   User.findByIdAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         name: req.body.name,
//       },
//     }
//   )
//     .then((result) => {
//       res.status(200).json({
//         message: "data updated",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });
