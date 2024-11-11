import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || `1h`;
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || `14d`;

if(!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT токены не указаны в переменных окружения");
}

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({userId}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRE});
}

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({userId}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRE});
}
