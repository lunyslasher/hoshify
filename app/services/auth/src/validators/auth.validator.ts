import {body} from 'express-validator';

export const registerValidator = [
    body('email')
        .trim()
        .isEmail().withMessage('Неверный формат электронной почты')
        .normalizeEmail(),
    body('username')
        .trim()
        .isLength({min: 3, max: 18}).withMessage(`Имя пользователя должно содержать от 3 до 18 символов`),
    body('password')
        .isLength({min: 6})
        .withMessage(`Пароль не должен быть меньше 6 символов`)
]

export const loginValidator = [
    body('email').isEmail().withMessage(`Необходимо указать электронную почту`),
    body('password').notEmpty().withMessage(`Необходимо указать пароль`)
]