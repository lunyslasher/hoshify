import {body} from 'express-validator';

export const registerValidator = [
    body('email')
        .trim()
        .isEmail().withMessage('Неверный формат электронной почты')
        .normalizeEmail(),
    body('password')
        .isLength({min: 6})
        .withMessage(`Пароль не должен быть меньше 6 символов`)
]

export const loginValidator = [
    body('email').isEmail().withMessage(`Необходимо указать электронную почту`),
    body('password').notEmpty().withMessage(`Необходимо указать пароль`)
]