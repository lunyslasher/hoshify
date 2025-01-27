import {Request, Response} from 'express';
import User from "../models/User";
import bcryptjs from 'bcryptjs';
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken";
import {Op} from "sequelize";

const SALT = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: `Необходимо заполнить все поля для регистрации`});
            return;
        }

        const isUserExists = await User.findOne({
            where: {
                [Op.or]: {
                    email
                },
            },
        });

        if (isUserExists) {
            res.status(400).json({message: isUserExists.email === email ? `Данный адрес электронной почты уже занят` : `Данное имя пользователя уже занято`});
            return;
        }

        const hashedPassword = await bcryptjs.hash(password, SALT);

        const user: User = await User.create({
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({message: `Регистрация прошла успешно`, user: {email: user.email, id: user.id}});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: `Ошибка сервера`})
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: `Необходимо указать электронную почту и пароль для входа`});
            return;
        }

        const user = await User.findOne({where: {email}});
        if (!user) {
            res.status(400).json({message: `Неверный адрес электронной почты или пароль`});
            return;
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({message: `Неверный адрес электронной почты или пароль`});
            return;
        }

        const [accessToken, refreshToken] = [generateAccessToken(user.id), generateRefreshToken(user.id)];

        res.cookie(`refreshToken`, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === `production`,
            sameSite: `strict`
        });
        res.status(200).json({accessToken, userId: user.id});
        return;
    } catch (e) {
        console.error(e);
        res.status(500).json({message: `Ошибка сервера`});
    }
}