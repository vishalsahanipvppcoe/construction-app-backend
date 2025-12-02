const { body } = require("express-validator");

exports.register = [
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6"),
];

exports.createProject = [
  body("name").notEmpty().withMessage("Project name required")
];

exports.createDpr = [
  body("projectId").notEmpty().withMessage("projectId required"),
  body("date").notEmpty().withMessage("date required")
];
