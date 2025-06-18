import { body } from 'express-validator';

//regole di validazione per la registrazione degli utenti 
export const registrationValidationRules = [

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('first_name')
        .notEmpty().withMessage('First name is required'),

    body('pass')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];