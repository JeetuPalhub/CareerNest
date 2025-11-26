import { body } from "express-validator";

// Validation for registration
export const validateRegister = [
  body("fullname")
    .notEmpty()
    .withMessage("Fullname is required")
    .isLength({ min: 3 })
    .withMessage("Fullname must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "recruiter", "admin"])
    .withMessage("Invalid role"),
];

// Validation for login
export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
