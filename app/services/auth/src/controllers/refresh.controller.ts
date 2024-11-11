import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT токены не указаны в переменных окружения");
}

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            res.status(401).json({message: `Истёк срок действия refresh-токена`});
            return;
        }

        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
        const userId = decoded.userId;

        const newAccessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);

        res.cookie(`refreshToken`, newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === `production`,
            sameSite: `strict`
        });

        res.status(200).json({accessToken: newAccessToken});
        return;
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({message: `Истёк срок действия refresh-токена`});
            return;
        } else {
            res.status(401).json({message: `Ошибка сервера`});
        }
    }
}