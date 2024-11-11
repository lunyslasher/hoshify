import {Router} from 'express';
import {login, register} from "../controllers/auth.controller";

const router = Router();

router.get(`/test`, async (req, res) => {
    res.status(200).json({message: `Working`});
})

router.post(`/login`, login);
router.post(`/register`, register);

export default router;