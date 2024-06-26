import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").notEmpty().trim().isEmail().withMessage("email is required"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 15 })
    .withMessage("password should contain at least 5 characters"),
];



export const registerValidator = [
  body("name").notEmpty().withMessage("name is required"),
    ...loginValidator
];

export const chatValidator = [
  body("message").notEmpty().withMessage("message is required"),
];
