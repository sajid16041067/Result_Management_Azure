const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Students");

// view search result page
// Router.get("/view-result", (req, res) => {
// 	res.render("view-result");
// });

// search result
// student/search (GET)
Router.get(
  "/search",
  [check("rollNo").notEmpty(), check("dob").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    const user = req.session.user;
    const alerts = [];
    if (user) {
      if (!errors.isEmpty()) {
        alerts.push({ type: "danger", msg: "Please input all values!" });
        return res.render("student", {
          alerts,
          user,
        });
      }
      const { rollNo, dob } = req.query;
      const student = await Student.findOne({ where: { rollNo } });
      if (!student) {
        return res.render("student", { error: "Student not found!" });
      } else if (student.dob != dob) {
        return res.render("student", { error: "Incorrect date of birth!" });
      } else {
        return res.render("view-result", { student, user, alerts });
      }
    } else {
      alerts.push({
        type: "danger",
        msg: "Your session has expired! Please login.",
      });
      return res.render("index", { alerts });
    }
  }
);

module.exports = Router;
