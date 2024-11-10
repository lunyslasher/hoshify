import {Request, Response} from 'express';
import User from "../models/User";
import bcryptjs from 'bcryptjs';
import {IUser} from "../interfaces/IUser";

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

        res.status(201).json({message: `Регистрация успешна`, user: {username: user.username, id: user._id}});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: `Ошибка сервера`})
    }
}