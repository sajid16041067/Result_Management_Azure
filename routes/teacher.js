const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Students");

// view add result page
// -> teacher/add-result (GET)
Router.get("/add-result", (req, res) => {
  const user = req.session.user;
  if (user) {
    res.render("add-result", { user });
  } else {
    return res.render("index");
  }
});

// add result to the database
// -> teacher/add-result (POST)
Router.post("/add-result", async (req, res) => {
  const { rollNo, name, dob, score } = req.body;
  const user = req.session.user;
  const alerts = [];
  if (user) {
    if (rollNo == "" || name == "" || dob == "" || score == "") {
      alerts.push({ type: "danger", msg: "Please input all values!" });
      return res.render("add-result", {
        alerts,
        user,
      });
    } else {
      try {
        const newStudent = { rollNo, name, dob, score };
        await Student.create(newStudent);
        const students = await Student.findAll();
        alerts.push({ type: "success", msg: "Student added successfully!" });
        res.render("teacher", { students, user, alerts });
      } catch (err) {
        const students = await Student.findAll();
        alerts.push({
          type: "danger",
          msg: "Something went wrong! Please try again.",
        });
        res.render("teacher", {
          students,
          alerts,
          user,
        });
      }
    }
  } else {
    alerts.push({
      type: "danger",
      msg: "Your session has expired! Please login.",
    });
    return res.render("index", { alerts });
  }
});

// view edit result page
// -> teacher/edit-result (GET)
Router.get("/edit-result", async (req, res) => {
  const { rollNo } = req.query;
  const user = req.session.user;
  if (user) {
    const student = await Student.findOne({ where: { rollNo } });
    return res.render("edit-result", { student, user });
  } else {
    alerts.push({
      type: "danger",
      msg: "Your session has expired! Please login.",
    });
    return res.render("index", { alerts });
  }
});

// update result
// -> teacher/update-result (POST)
Router.post("/update-result", async (req, res) => {
  const { rollNo, name, dob, score } = req.body;
  const user = req.session.user;
  const alerts = [];
  if (user) {
    const student = await Student.findOne({ where: { rollNo } });
    const updatedStudent = { rollNo };
    if (!student) {
      const students = await Student.findAll();
      alerts.push({ type: "danger", msg: "Student not found!" });
      return res.render("teacher", { students, user, alerts });
    }
    if (name !== "") {
      updatedStudent.name = name;
    }
    if (dob !== "") {
      updatedStudent.dob = dob;
    }
    if (score !== "") {
      updatedStudent.score = score;
    }
    try {
      await Student.update(updatedStudent, {
        where: { rollNo: student.rollNo },
      });
      const students = await Student.findAll();
      alerts.push({ type: "success", msg: "Student updated successfully!" });
      res.render("teacher", { students, user, alerts });
    } catch (error) {
      console.log(error);
      const students = await Student.findAll();
      alerts.push({
        type: "danger",
        msg: "Something went wrong, Please try again!",
      });
      res.render("teacher", { students, user, alerts });
    }
  } else {
    alerts.push({
      type: "danger",
      msg: "Your session has expired! Please login.",
    });
    return res.render("index", { alerts });
  }
});

// delete result
// -> teacher/delete-result (GET)
Router.get("/delete-result", async (req, res) => {
  const { rollNo } = req.query;
  const user = req.session.user;
  const alerts = [];
  if (user) {
    await Student.destroy({ where: { rollNo } });
    const students = await Student.findAll();
    alerts.push({ type: "success", msg: "Student deleted successfully!" });
    res.render("teacher", { students, user, alerts });
  } else {
    alerts.push({
      type: "danger",
      msg: "Your session has expired! Please login.",
    });
    return res.render("index", { alerts });
  }
});

module.exports = Router;
