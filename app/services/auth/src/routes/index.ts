import {Router} from 'express';
import {login, register} from "../controllers/auth.controller";
import {refreshToken} from "../controllers/refresh.controller";

const router = Router();

router.get(`/test`, async (req, res) => {
    res.status(200).json({message: `Working`});
})

router.post(`/login`, login);
router.post(`/register`, register);
router.post(`/refresh`, refreshToken);

export default router;