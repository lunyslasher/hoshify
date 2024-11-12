import {Router} from 'express';
import {createProxyMiddleware} from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const authRoutes = Router();

const AUTH_API_URL = process.env.AUTH_API_URL;

authRoutes.use(
    `/api/auth`,
    createProxyMiddleware({
        target: AUTH_API_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/api/auth': ''
        }
    })
);

export default authRoutes;