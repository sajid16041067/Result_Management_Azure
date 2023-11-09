const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Students");
const User = require("../models/Users");

// logout user
// -> /auth/logout (GET)
Router.get("/logout", (req,res)=>{
	req.session.destroy();
	const alerts = [];
	alerts.push({type:"success", msg: "You are logged out successfully!"})
	return res.render("index", {alerts});
})

// view login page based on user role
// -> /auth/:role (GET)
Router.get("/:role", (req, res) => {
	const role = req.params.role;
	res.render("login", { role });
});

// authenticate user
// -> /auth/login (POST)
Router.post(
	"/login",
	[
		check("role").notEmpty(),
		check("email").notEmpty().withMessage("Please enter email!"),
		check("password").notEmpty().withMessage("Please enter password!"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		const { email, password, role } = req.body;
		const alerts = [];
		if (!errors.isEmpty()) {
			return res.render("login", {
				errors: errors.errors,
				role,
			});
			// res.send(errors);
		}
		if (role == "student") {
			// fetching user from database
			const user = await User.findOne({ where: { email } });
			if (!user) {
				alerts.push({type: "danger", msg:"User not found!" })
				res.render("login", { role, alerts });
			} else if (user.password !== password) {
				alerts.push({type: "danger", msg:"Invalid password"})
				res.render("login", { role, alerts });
			} else if (user.role !== "student") {
				alerts.push({type: "danger", msg:"Invalid role!" })
				res.render("login", { role, alerts });
			} else {
				req.session.user = user;
				req.session.save();
				alerts.push({type:"success", msg: "You are logged in successfully!"});
				return res.render("student", {user, alerts});
			}
		} else if (role == "teacher") {
			// fetching user from database
			const user = await User.findOne({ where: { email } });
			if (!user) {
				res.render("login", { error: "User not found!", role });
			} else if (user.password !== password) {
				res.render("login", { error: "Invalid password", role });
			} else if (user.role !== "teacher") {
				res.render("login", { error: "Invalid role!", role });
			} else {
				//fetching students from database
				let students = await Student.findAll();
                req.session.user = user;
				req.session.save();
				alerts.push({type:"success", msg: "You are logged in successfully!"});
				return res.render("teacher", { students, user, alerts });
			}
		}
	}
);

module.exports = Router;