import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator'; 

export function validationHandler(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map((err: ValidationError) => {
            if ('path' in err) {
                return { [err.path]: err.msg };
            } else {
                return { error: err.msg };
            }
        });

        res.status(400).json({ errors: extractedErrors });
        return; 
    }

    next(); 
}
