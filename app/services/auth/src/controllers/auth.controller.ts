import {Request, Response} from 'express';
import User from "../models/User";
import bcryptjs from 'bcryptjs';
import {IUser} from "../interfaces/IUser";
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken";

const SALT = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, username, password} = req.body;
        if (!email || !password || !username) {
            res.status(400).json({message: `Необходимо заполнить все поля для регистрации`});
            return;
        }

        const isUserExists = await User.findOne({
            $or: [{email}, {username}]
        });
        if (isUserExists) {
            res.status(400).json({message: isUserExists.email === email ? `Данный адрес электронной почты уже занят` : `Данное имя пользователя уже занято`});
            return;
        }

        const hashedPassword = await bcryptjs.hash(password, SALT);

        const user: IUser = await User.create({
            email: email,
            username: username,
            password: hashedPassword,
        });

        res.status(201).json({message: `Регистрация прошла успешно`, user: {username: user.username, id: user._id}});
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

        const user = await User.findOne({email: email}) as IUser;
        if (!user) {
            res.status(400).json({message: `Неверный адрес электронной почты или пароль`});
            return;
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({message: `Неверный адрес электронной почты или пароль`});
            return;
        }

        const [accessToken, refreshToken] = [generateAccessToken(user._id), generateRefreshToken(user._id)];

        res.cookie(`refreshToken`, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === `production`,
            sameSite: `strict`
        });
        res.status(200).json({accessToken, userId: user._id});
        return ;
    } catch (e) {
        console.error(e);
        res.status(500).json({message: `Ошибка сервера`});
    }
}