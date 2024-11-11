import {Router} from 'express';
import {login, register} from "../controllers/auth.controller";
import {refreshToken} from "../controllers/refresh.controller";
import {validateRequest} from "../middlewares/validator.middleware";
import {loginValidator, registerValidator} from "../validators/auth.validator";

const router = Router();

router.get(`/test`, async (req, res) => {
    res.status(200).json({message: `Working`});
})

router.post(`/login`, loginValidator, validateRequest, login);
router.post(`/register`, registerValidator, validateRequest, register);
router.post(`/refresh`, refreshToken);

export default router;